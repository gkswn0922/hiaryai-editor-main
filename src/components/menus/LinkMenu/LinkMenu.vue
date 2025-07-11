<template>
  <BubbleMenu
    :editor="editor"
    plugin-key="textMenu"
    :should-show="shouldShow"
    :update-delay="0"
    :tippy-options="{
      popperOptions: {
        modifiers: [{ name: 'flip', enabled: false }],
      },
      appendTo: () => appendTo,
      onHidden: onBubbleMenuHidden,
    }"
  >
    <LinkEditorPanel
      v-if="isEditing"
      :initial-url="linkUrl"
      :initial-open-in-new-tab="linkTarget === '_blank'"
      @set-link="onSetLink"
    />
    <LinkPreviewPanel v-else-if="linkUrl" :url="linkUrl" @clear="onUnsetLink" @edit="handleEdit" />
  </BubbleMenu>
</template>

<script setup lang="ts">
import { ref, computed, Ref } from 'vue'
import { BubbleMenu, Editor } from '@tiptap/vue-3'
import LinkPreviewPanel from '@/components/panels/LinkPreviewPanel.vue'
import LinkEditorPanel from '@/components/panels/LinkEditorPanel.vue'

type MenuProps = {
  editor: Editor
  appendTo: HTMLElement
}

const props = defineProps<MenuProps>()

const isEditing: Ref<boolean> = ref(false)

const onBubbleMenuHidden = () => {
  isEditing.value = false
}

const shouldShow = () => {
  return props.editor.isActive('link')
}

const linkUrl = computed(() => props.editor.getAttributes('link').href)
const linkTarget = computed(() => props.editor.getAttributes('link').target)

const handleEdit = () => {
  isEditing.value = true
}

const onSetLink = (url: string, openInNewTab?: boolean) => {
  props.editor
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: url, target: openInNewTab ? '_blank' : '' })
    .run()
  isEditing.value = false
}

const onUnsetLink = () => {
  props.editor.chain().focus().extendMarkRange('link').unsetLink().run()
  isEditing.value = false
}
</script> 