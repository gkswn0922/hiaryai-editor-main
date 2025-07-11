import { computed, onMounted, ref } from 'vue'

import { TiptapCollabProvider, WebSocketStatus } from '@hocuspocus/provider'
import { Editor, useEditor } from '@tiptap/vue-3'
import type { Doc as YDoc } from 'yjs'

import { ExtensionKit } from '@/extensions/extension-kit'
import { initialContent } from '@/lib/data/initialContent'
import { EditorUser } from '../components/BlockEditor/types'
import { useSidebar } from './useSidebar'

declare global {
  interface Window {
    editor: Editor | null
  }
}

export const useBlockEditor = ({
  ydoc,
  provider,
}: {
  ydoc: YDoc
  provider?: TiptapCollabProvider | null | undefined
}) => {
  const leftSidebar = useSidebar()
  const collabState = ref<WebSocketStatus>(WebSocketStatus.Connecting)

  const editor = useEditor({
    autofocus: true,
    extensions: [
      ...ExtensionKit({
        provider,
        ydoc,
      }),
    ],
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        class: 'min-h-full',
      },
    },
    content: initialContent,
  })

  onMounted(() => {
    provider?.on('synced', () => {
      if (editor.value && editor.value.isEmpty) {
        editor.value.commands.setContent(initialContent)
      }
    })

    provider?.on('status', (event: { status: WebSocketStatus }) => {
      collabState.value = event.status
    })

    window.editor = editor.value || null
  })

  const users = computed(() => {
    if (!editor.value?.storage.collaborationCursor?.users) {
      return []
    }

    return editor.value.storage.collaborationCursor?.users.map((user: EditorUser) => {
      const names = user.name?.split(' ')
      const firstName = names?.[0]
      const lastName = names?.[names.length - 1]
      const initials = `${firstName?.[0] || '?'}${lastName?.[0] || '?'}`

      return { ...user, initials: initials.length ? initials : '?' }
    })
  })

  const characterCount = computed(() => editor.value?.storage.characterCount || { characters: () => 0, words: () => 0 })



  return { editor, users, characterCount, collabState, leftSidebar }
}
