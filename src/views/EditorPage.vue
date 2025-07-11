<script setup lang="ts">
import { TiptapCollabProvider } from '@hocuspocus/provider'
import { Doc as YDoc } from 'yjs'
import { useRoute } from 'vue-router'
import { Editor } from '@tiptap/core'
import { ref, watch } from 'vue'

import BlockEditor from '@/components/BlockEditor/BlockEditor.vue'

interface Props {
  getPos: () => number
  editor: Editor
}

const route = useRoute()
const ydoc = new YDoc()

const room = (route.params.room as string) || 'default-room'
// For the demo, we disable collaboration by default
const hasCollab = false // route.query.noCollab !== '1'
const blockEditorRef = ref()

const provider = hasCollab
  ? new TiptapCollabProvider({
      // Hocuspocus App ID를 여기에 추가하여 협업 기능 활성화
      appId: '8mz06o19',
      name: room,
      document: ydoc,
    })
  : null

// 에디터 내용을 console.log로 출력하는 함수
const logEditorContent = () => {
  if (blockEditorRef.value?.editor) {
    const JSONContent = blockEditorRef.value.editor.getJSON()

    console.log('JSON:', JSONContent)
  }
}

// 에디터가 마운트된 후 내용 변경을 감지
watch(() => blockEditorRef.value?.editor, (newEditor) => {
  if (newEditor) {
    // 에디터 내용 변경을 감지하는 이벤트 리스너 추가
    newEditor.on('update', () => {
      logEditorContent()
    })
    
    // 초기 내용 출력
    logEditorContent()
  }
}, { immediate: true })

</script>

<template>
  <BlockEditor 
    ref="blockEditorRef"
    :ydoc="ydoc" 
    :provider="provider" 
    :has-collab="hasCollab" 
    ai-token="" 
  />
</template> 