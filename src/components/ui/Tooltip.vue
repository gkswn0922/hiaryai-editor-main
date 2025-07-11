<template>
  <tippy v-if="enabled" :delay="500" :offset="[0, 8]" :touch="false" :z-index="99999" :append-to="document.body" v-bind="tippyOptions">
    <slot />
    <template #content>
      <span class="flex items-center gap-2 px-2.5 py-1 bg-white border border-neutral-100 rounded-lg shadow-sm z-[999]">
        <span v-if="title" class="text-xs font-medium text-neutral-500">{{ title }}</span>
        <span v-if="shortcut" class="flex items-center gap-0.5">
          <ShortcutKey v-for="(key, index) in shortcut" :key="index">{{ key }}</ShortcutKey>
        </span>
      </span>
    </template>
  </tippy>
  <slot v-else />
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { Tippy } from 'vue-tippy'

export interface TooltipProps {
  enabled?: boolean
  title?: string
  shortcut?: string[]
  tippyOptions?: any
}

withDefaults(defineProps<TooltipProps>(), {
  enabled: true,
  tippyOptions: () => ({}),
})

const isMac = typeof window !== 'undefined' ? navigator.platform.toUpperCase().indexOf('MAC') >= 0 : false

const ShortcutKey = defineComponent({
  setup(_, { slots }) {
    const className =
      'inline-flex items-center justify-center w-5 h-5 p-1 text-[0.625rem] rounded font-semibold leading-none border border-neutral-200 text-neutral-500 border-b-2'

    const keyContent = slots.default ? (slots.default()[0].children as string) : ''

    let displayKey = ''

    if (keyContent === 'Mod') {
      displayKey = isMac ? '⌘' : 'Ctrl'
    } else if (keyContent === 'Shift') {
      displayKey = '⇧'
    } else if (keyContent === 'Alt') {
      displayKey = isMac ? '⌥' : 'Alt'
    } else {
      displayKey = keyContent
    }

    return () => h('kbd', { class: className }, displayKey)
  },
})

const document = window.document
</script> 