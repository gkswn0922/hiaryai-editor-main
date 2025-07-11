<template>
  <node-view-wrapper>
    <div :class="wrapperClassName" :style="{ width: node.attrs.width }">
      <div contenteditable="false" ref="imageWrapperRef">
        <img class="block" :src="src" alt="" @click="onClick" />
      </div>
    </div>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { NodeViewWrapper, type NodeViewProps } from '@tiptap/vue-3'
import { cn } from '@/lib/utils'

const props = defineProps<NodeViewProps>()

const imageWrapperRef = ref<HTMLDivElement | null>(null)
const src = computed(() => props.node.attrs.src)

const wrapperClassName = computed(() =>
  cn(
    props.node.attrs.align === 'left' ? 'ml-0' : 'ml-auto',
    props.node.attrs.align === 'right' ? 'mr-0' : 'mr-auto',
    props.node.attrs.align === 'center' && 'mx-auto',
  ),
)

const onClick = () => {
  if (typeof props.getPos === 'function') {
    props.editor.commands.setNodeSelection(props.getPos())
  }
}
</script> 