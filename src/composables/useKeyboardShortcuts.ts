import { onMounted, onUnmounted } from 'vue'
import type { Editor } from '@tiptap/core'

export function useKeyboardShortcuts(editor: Editor | null) {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!editor) return

    // Ctrl+Z (Windows/Linux) 또는 Cmd+Z (Mac) - Undo
    if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
      event.preventDefault()
      editor.chain().focus().undo().run()
      return
    }

    // Ctrl+Y (Windows/Linux) 또는 Cmd+Shift+Z (Mac) - Redo
    if (
      ((event.ctrlKey || event.metaKey) && event.key === 'y') ||
      ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'z')
    ) {
      event.preventDefault()
      editor.chain().focus().redo().run()
      return
    }

    // Ctrl+S (Windows/Linux) 또는 Cmd+S (Mac) - Save (prevent default)
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault()
      // 여기에 저장 로직을 추가할 수 있습니다
      console.log('Save shortcut pressed')
      return
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
  })

  return {
    handleKeyDown,
  }
}
