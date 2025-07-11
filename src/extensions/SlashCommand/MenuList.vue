<template>
  <Surface
    ref="scrollContainer"
    class="text-black max-h-[min(80vh,24rem)] overflow-auto flex-wrap mb-8 p-1 min-w-[400px]"
  >
    <div v-if="items.length > 0">
      <template v-for="(group, groupIndex) in items" :key="group.title">
        <div
          v-if="group.title"
          class="text-neutral-500 text-xs col-[1/-1] mx-2 mt-2 font-semibold tracking-wider select-none uppercase first:mt-0.5"
        >
          {{ group.title }}
        </div>
        <CommandButton
          v-for="(command, commandIndex) in group.commands"
          :key="command.label"
          :ref="
            (el) =>
              selectedGroupIndex === groupIndex &&
              selectedCommandIndex === commandIndex &&
              (activeItem = el as any)
          "
          :is-active="
            selectedGroupIndex === groupIndex &&
            selectedCommandIndex === commandIndex
          "
          :title="command.label"
          :description="command.description"
          :icon="command.iconName"
          @click="console.log('Button clicked!', groupIndex, commandIndex); selectItem(groupIndex, commandIndex)"
        />
      </template>
    </div>
  </Surface>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onUpdated } from 'vue'
import type { MenuListProps } from './types'
import CommandButton from './CommandButton.vue'
import Surface from '@/components/ui/Surface.vue'

const props = defineProps<MenuListProps>()
const emit = defineEmits(['command'])

const scrollContainer = ref<HTMLDivElement | null>(null)
const activeItem = ref<HTMLButtonElement | null>(null)
const selectedGroupIndex = ref(0)
const selectedCommandIndex = ref(0)

watch(() => props.items, () => {
  selectedGroupIndex.value = 0
  selectedCommandIndex.value = 0
}, { deep: true })

const selectItem = (groupIndex: number, commandIndex: number) => {
  const command = props.items[groupIndex].commands[commandIndex]
  console.log('Selected command:', command);
  console.log('Command action:', command.action);

  // props.command 함수 호출 (Suggestion 시스템에서 전달받은 함수)
  if (props.command) {
    console.log('Calling props.command with:', command);
    props.command(command)
  } else {
    console.log('props.command is not available, using emit');
    emit('command', command)
  }
}

const onKeyDown = ({ event }: { event: KeyboardEvent }) => {
  if (event.key === 'ArrowDown') {
    if (!props.items.length) {
      return false
    }

    const commands = props.items[selectedGroupIndex.value].commands
    let newCommandIndex = selectedCommandIndex.value + 1
    let newGroupIndex = selectedGroupIndex.value

    if (commands.length - 1 < newCommandIndex) {
      newCommandIndex = 0
      newGroupIndex = selectedGroupIndex.value + 1
    }

    if (props.items.length - 1 < newGroupIndex) {
      newGroupIndex = 0
    }

    selectedCommandIndex.value = newCommandIndex
    selectedGroupIndex.value = newGroupIndex

    return true
  }

  if (event.key === 'ArrowUp') {
    if (!props.items.length) {
      return false
    }

    let newCommandIndex = selectedCommandIndex.value - 1
    let newGroupIndex = selectedGroupIndex.value

    if (newCommandIndex < 0) {
      newGroupIndex = selectedGroupIndex.value - 1
      newCommandIndex = props.items[newGroupIndex]?.commands.length - 1 || 0
    }

    if (newGroupIndex < 0) {
      newGroupIndex = props.items.length - 1
      newCommandIndex = props.items[newGroupIndex].commands.length - 1
    }

    selectedCommandIndex.value = newCommandIndex
    selectedGroupIndex.value = newGroupIndex

    return true
  }

  if (event.key === 'Enter') {
    if (!props.items.length || selectedGroupIndex.value === -1 || selectedCommandIndex.value === -1) {
      return false
    }

    selectItem(selectedGroupIndex.value, selectedCommandIndex.value)

    return true
  }

  return false
}

const scrollToActiveItem = () => {
  if (activeItem.value && scrollContainer.value) {
    const offsetTop = activeItem.value.offsetTop
    const offsetHeight = activeItem.value.offsetHeight
    scrollContainer.value.scrollTop = offsetTop - offsetHeight
  }
}

watch([selectedCommandIndex, selectedGroupIndex], () => {
  nextTick(() => {
    scrollToActiveItem()
  })
})

onUpdated(() => {
    // Also scroll on general updates, e.g. when filtering
    scrollToActiveItem()
})



defineExpose({
  onKeyDown,
})
</script>
