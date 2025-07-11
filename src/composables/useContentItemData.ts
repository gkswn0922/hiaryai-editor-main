import { ref } from 'vue'
import type { Node } from '@tiptap/pm/model'
import type { Editor } from '@tiptap/core'

export const useContentItemData = () => {
  const currentNode = ref<Node | null>(null)
  const currentNodePos = ref<number>(-1)

  const handleNodeChange = (data: { node: Node | null; editor: Editor; pos: number }) => {
    if (data.node) {
      currentNode.value = data.node
    }

    currentNodePos.value = data.pos
  }

  const setCurrentNode = (node: Node | null) => {
    currentNode.value = node
  }

  const setCurrentNodePos = (pos: number) => {
    currentNodePos.value = pos
  }

  return {
    currentNode,
    currentNodePos,
    setCurrentNode,
    setCurrentNodePos,
    handleNodeChange,
  }
} 