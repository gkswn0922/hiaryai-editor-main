<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
// @ts-ignore
// import { EmojiItem } from '@tiptap-pro/extension-emoji'
import Button from '@/components/ui/Button/Button.vue'
import Panel from '@/components/ui/Panel/Panel.vue'
import { EmojiListProps } from '../types'

const props = defineProps<EmojiListProps>()

const selectedIndex = ref(0)

watch(() => props.items, () => {
  selectedIndex.value = 0
}, { deep: true })

const selectItem = (index: number) => {
  const item = props.items[index]

  if (item) {
    console.log('Selecting emoji:', item)
    try {
      props.command(item)
    } catch (error) {
      console.error('Error inserting emoji:', error)
      // 대안적인 방법으로 이모지 텍스트 삽입
      if (item.emoji) {
        props.command(item)
      }
    }
  }
}

const scrollIntoView = (index: number) => {
  const item = props.items[index]

  if (item) {
    nextTick(() => {
      const node = document.querySelector(`[data-emoji-name="${item.name}"]`)
      if (node) {
        node.scrollIntoView({ block: 'nearest' })
      }
    })
  }
}

const upHandler = () => {
  const newIndex = (selectedIndex.value + props.items.length - 1) % props.items.length
  selectedIndex.value = newIndex
  scrollIntoView(newIndex)
}

const downHandler = () => {
  const newIndex = (selectedIndex.value + 1) % props.items.length
  selectedIndex.value = newIndex
  scrollIntoView(newIndex)
}

const enterHandler = () => {
  selectItem(selectedIndex.value)
}

defineExpose({
  onKeyDown: ({ event }: { event: KeyboardEvent }) => {
    if (event.key === 'ArrowUp') {
      upHandler()
      return true
    }

    if (event.key === 'ArrowDown') {
      downHandler()
      return true
    }

    if (event.key === 'Enter') {
      enterHandler()
      return true
    }

    return false
  },
})

const createClickHandler = (index: number) => {
  console.log('Button clicked! Index:', index)
  selectItem(index)
}

const handleDirectClick = (index: number) => {
  console.log('Direct click handler called with index:', index)
  selectItem(index)
}

onMounted(() => {
  console.log('EmojiList mounted with items:', props.items.length)
  console.log('First few items:', props.items.slice(0, 3))
})

</script>

<template>
  <Panel v-if="items && items.length" class="overflow-y-auto max-w-[18rem] max-h-[18rem]">
    <div v-for="(item, index) in items" :key="item.name">
      <Button
        :active="index === selectedIndex"
        variant="ghost"
        class="justify-start w-full"
        button-size="small"
        @click.stop="handleDirectClick(index)"
        @mousedown.stop="handleDirectClick(index)"
        :data-emoji-name="item.name"
      >
        <img v-if="item.fallbackImage" :src="item.fallbackImage" class="w-5 h-5" alt="emoji" />
        <template v-else>{{ item.emoji }}</template>
        <span class="truncate text-ellipsis ml-2">:{{ item.name }}:</span>
      </Button>
    </div>
  </Panel>
</template>
