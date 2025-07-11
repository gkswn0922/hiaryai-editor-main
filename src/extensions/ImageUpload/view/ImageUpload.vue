<script setup lang="ts">
import { NodeViewWrapper } from '@tiptap/vue-3'
import { Editor } from '@tiptap/core'
import ImageUploader from './ImageUploader.vue'

interface Props {
  getPos: () => number
  editor: Editor
}

const props = defineProps<Props>()

const onUpload = (url: string) => {
  if (url) {
    const pos = props.getPos()
    props.editor
      .chain()
      .deleteRange({ from: pos, to: pos + 1 })
      .insertContentAt(pos, {
        type: 'imageBlock',
        attrs: { src: url }
      })
      .focus()
      .run()
  }
}
</script>

<template>
  <NodeViewWrapper>
    <div class="p-0 m-0" data-drag-handle>
      <ImageUploader :on-upload="onUpload" />
    </div>
  </NodeViewWrapper>
</template>
