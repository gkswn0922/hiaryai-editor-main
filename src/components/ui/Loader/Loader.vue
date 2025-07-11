<script setup lang="ts">
import { Teleport } from 'vue'

export type LoaderProps = {
  hasOverlay?: boolean
  label?: string
}

const props = withDefaults(defineProps<LoaderProps>(), {
  hasOverlay: true,
})
</script>

<template>
  <template v-if="hasOverlay">
    <Teleport to="body">
      <div
        class="items-center justify-center bg-black/60 flex h-full w-full fixed top-0 left-0 select-none z-[9999]"
      >
        <div
          class="flex flex-col items-center justify-center gap-2 p-4 text-white bg-black rounded-lg shadow-2xl dark:text-black dark:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-8 h-8 animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          <p v-if="label" class="text-sm font-semibold leading-tight text-white dark:text-black">
            {{ label }}
          </p>
        </div>
      </div>
    </Teleport>
  </template>
  <template v-else>
    <div
      class="flex flex-col items-center justify-center gap-2 p-4 text-white bg-black rounded-lg shadow-2xl dark:text-black dark:bg-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-8 h-8 animate-spin"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <p v-if="label" class="text-sm font-semibold leading-tight text-white dark:text-black">
        {{ label }}
      </p>
    </div>
  </template>
</template> 