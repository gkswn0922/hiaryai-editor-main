<template>
  <div class="flex items-center relative z-50">
    <button
      @click="onLinkInputToggle"
      class="p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200 dark:text-white dark:hover:bg-stone-800"
      type="button"
    >
      <Link class="w-4 h-4" />
    </button>
    <div v-if="isLinkInputVisible" class="absolute top-full left-0 mt-2 bg-white dark:bg-black border border-stone-200 dark:border-stone-700 rounded-lg shadow-lg p-3 z-50">
      <div class="flex items-center gap-2">
        <input
          ref="linkInput"
          v-model="linkUrl"
          @keydown.enter="onLinkSet"
          @keydown.esc="onLinkInputToggle"
          class="w-48 px-2 py-1 text-sm bg-white dark:bg-black border rounded outline-none text-stone-600 dark:text-white border-stone-200 dark:border-stone-700 focus:border-stone-400 dark:focus:border-stone-500"
          placeholder="https://example.com"
          type="url"
        />
        <button
          @click="onLinkSet"
          class="px-3 py-1 text-sm text-white bg-black dark:bg-white dark:text-black rounded hover:bg-stone-800 dark:hover:bg-stone-200"
          type="button"
        >
          Set
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, PropType } from 'vue';
import { Editor } from '@tiptap/core';
import { Link } from 'lucide-vue-next';

const props = defineProps({
  editor: {
    type: Object as PropType<Editor>,
    required: true,
  },
});

const isLinkInputVisible = ref(false);
const linkUrl = ref('');
const linkInput = ref<HTMLInputElement | null>(null);

const onLinkInputToggle = () => {
  isLinkInputVisible.value = !isLinkInputVisible.value;
  linkUrl.value = props.editor.getAttributes('link').href || '';
  if (isLinkInputVisible.value) {
    nextTick(() => {
      linkInput.value?.focus();
    });
  }
};

const onLinkSet = () => {
  if (linkUrl.value) {
    props.editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: linkUrl.value, target: '_blank' })
      .run();
  } else {
    props.editor.chain().focus().extendMarkRange('link').unsetLink().run();
  }
  onLinkInputToggle();
};
</script> 