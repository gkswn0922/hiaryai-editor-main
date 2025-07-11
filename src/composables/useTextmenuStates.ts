import { computed } from 'vue'
import type { Editor } from '@tiptap/vue-3'
// import type { BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu'
import { isCustomNodeSelected, isTextSelected } from '@/lib/utils'

export const useTextmenuStates = (editor: Editor) => {
  const shouldShow = (props: any) => {
    const { view, from } = props
    if (!view) {
      return false
    }

    const domAtPos = view.domAtPos(from || 0).node as HTMLElement
    const nodeDOM = view.nodeDOM(from || 0) as HTMLElement
    const node = nodeDOM || domAtPos

    if (isCustomNodeSelected(editor, node)) {
      return false
    }

    return isTextSelected({ editor })
  }

  const isBold = computed(() => editor.isActive('bold'))
  const isItalic = computed(() => editor.isActive('italic'))
  const isStrike = computed(() => editor.isActive('strike'))
  const isUnderline = computed(() => editor.isActive('underline'))
  const isCode = computed(() => editor.isActive('code'))
  const isSubscript = computed(() => editor.isActive('subscript'))
  const isSuperscript = computed(() => editor.isActive('superscript'))
  const isAlignLeft = computed(() => editor.isActive({ textAlign: 'left' }))
  const isAlignCenter = computed(() => editor.isActive({ textAlign: 'center' }))
  const isAlignRight = computed(() => editor.isActive({ textAlign: 'right' }))
  const isAlignJustify = computed(() => editor.isActive({ textAlign: 'justify' }))
  const currentColor = computed(() => editor.getAttributes('textStyle')?.color || undefined)
  const currentHighlight = computed(() => editor.getAttributes('highlight')?.color || undefined)
  const currentFont = computed(() => editor.getAttributes('textStyle')?.fontFamily || undefined)
  const currentSize = computed(() => editor.getAttributes('textStyle')?.fontSize || undefined)

  return {
    isBold,
    isItalic,
    isStrike,
    isUnderline,
    isCode,
    isSubscript,
    isSuperscript,
    isAlignLeft,
    isAlignCenter,
    isAlignRight,
    isAlignJustify,
    currentColor,
    currentHighlight,
    currentFont,
    currentSize,
    shouldShow,
  }
} 