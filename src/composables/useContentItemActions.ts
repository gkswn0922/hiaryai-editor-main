import type { Node } from '@tiptap/pm/model'
import { NodeSelection } from '@tiptap/pm/state'
import type { Editor } from '@tiptap/vue-3'
import type { Ref } from 'vue'

export const useContentItemActions = (
  editor: Editor,
  currentNode: Ref<Node | null>,
  currentNodePos: Ref<number>,
) => {
  const resetTextFormatting = () => {
    const chain = editor.chain()

    chain.setNodeSelection(currentNodePos.value).unsetAllMarks()

    if (currentNode.value?.type.name !== 'paragraph') {
      chain.setParagraph()
    }

    chain.run()
  }

  const duplicateNode = () => {
    editor.commands.setNodeSelection(currentNodePos.value)

    const { $anchor } = editor.state.selection
    const selectedNode = $anchor.node(1) || (editor.state.selection as NodeSelection).node

    editor
      .chain()
      .setMeta('hideDragHandle', true)
      .insertContentAt(currentNodePos.value + (currentNode.value?.nodeSize || 0), selectedNode.toJSON())
      .run()
  }

  const copyNodeToClipboard = async () => {
    editor.chain().setMeta('hideDragHandle', true).setNodeSelection(currentNodePos.value).run()
    try {
      await navigator.clipboard.writeText(editor.view.dom.innerText)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = editor.view.dom.innerText
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
  }

  const deleteNode = () => {
    editor.chain().setMeta('hideDragHandle', true).setNodeSelection(currentNodePos.value).deleteSelection().run()
  }

  const handleAdd = () => {
    // 에디터의 모든 내용을 지우기 전에 확인
    const confirmed = window.confirm('정말로 모든 내용을 지우시겠습니까? 이 작업은 되돌릴 수 없습니다.')

    if (confirmed) {
      editor.chain().clearContent().focus().run()
    }
  }

  return {
    resetTextFormatting,
    duplicateNode,
    copyNodeToClipboard,
    deleteNode,
    handleAdd,
  }
}
