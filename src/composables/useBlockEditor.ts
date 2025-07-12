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

  // API에서 content 가져오는 함수
  const loadContentFromAPI = async () => {
    try {
      // 백엔드 에디터 JSON API 호출
      const response = await fetch('http://localhost:3000/api/')
      const data = await response.json()

      if (editor.value && data.content) {
        // JSON 형태의 content 설정
        editor.value.commands.setContent(data.content)
        console.log('JSON GET SUCCESS:', data.content)
      }
    } catch (error) {
      console.error('JSON GET FAILED:', error)
      // 실패 시 기본 content 유지
      if (editor.value) {
        editor.value.commands.setContent(initialContent)
      }
    }
  }

  // 저장 임시구현
  const saveContent = async () => {
    try {
      if (!editor.value) return { success: false, error: '에디터가 준비되지 않았습니다' }

      const currentContent = editor.value.getJSON()

      console.log('currentContent:', currentContent)

      const response = await fetch('http://localhost:3000/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: currentContent,
          // created_at: new Date().toISOString()
        })
      })

      if (response.ok) {
        console.log('JSON POST SUCCESS')
        return { success: true }
      } else {
        console.error('JSON POST FAILED:', response.status)
        return { success: false, error: `HTTP ${response.status}` }
      }
    } catch (error) {
      console.error('JSON POST FAILED:', error)
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  onMounted(() => {
    provider?.on('synced', () => {
      if (editor.value && editor.value.isEmpty) {
        // 마운트 된 뒤 백엔드에서 content 로드
        loadContentFromAPI()
      }
    })

    // 만약 provider가 없다면 바로 로드
    if (!provider && editor.value) {
      loadContentFromAPI()
    }

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



  return { editor, users, characterCount, collabState, leftSidebar, saveContent }
}
