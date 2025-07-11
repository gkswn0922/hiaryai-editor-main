<template>
  <node-view-wrapper>
    <div class="p-2 -m-2 rounded-lg" contenteditable="false">
      <TableOfContents :editor="editor" />
    </div>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewWrapper, type NodeViewProps } from '@tiptap/vue-3'
import TableOfContents from '@/components/TableOfContents/TableOfContents.vue'

defineProps<NodeViewProps>()
</script> 