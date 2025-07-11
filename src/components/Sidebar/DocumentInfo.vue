<template>
  <div class="mb-6">
    <div class="mb-2 text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
      문서 정보
    </div>
    <div class="space-y-3">
      <div class="flex items-center gap-2">
        <Icon name="User" class="w-4 h-4 text-neutral-400" />
        <span class="text-sm text-neutral-600 dark:text-neutral-300">작성자</span>
      </div>

      <div class="flex items-center gap-2">
        <Icon name="Calendar" class="w-4 h-4 text-neutral-400" />
        <span class="text-sm text-neutral-600 dark:text-neutral-300">{{ formatDate(createdAt) }}</span>
      </div>

      <div class="flex items-center gap-2">
        <Icon name="Clock" class="w-4 h-4 text-neutral-400" />
        <span class="text-sm text-neutral-600 dark:text-neutral-300">{{ formatDate(updatedAt) }}</span>
      </div>

      <div class="pt-2 border-t border-neutral-200 dark:border-neutral-700">
        <div class="flex gap-2">
          <button
            @click="exportDocument"
            class="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <Icon name="Download" class="w-4 h-4" />
            내보내기
          </button>

          <button
            @click="shareDocument"
            class="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <Icon name="Share" class="w-4 h-4" />
            공유
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from '@/components/ui/Icon.vue'
import { toast } from 'vue-sonner'

const createdAt = ref(new Date())
const updatedAt = ref(new Date())

const formatDate = (date: Date) => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const exportDocument = () => {
  toast.success('문서 내보내기 기능이 곧 제공됩니다!')
}

const shareDocument = () => {
  toast.success('문서 공유 기능이 곧 제공됩니다!')
}
</script>
