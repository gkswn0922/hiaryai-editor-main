<template>
  <div class="flex items-center gap-0.5">
    <ToolbarButton tooltip="Add a new block" @click="actions.handleAdd">
      <Icon name="Plus" />
    </ToolbarButton>
    <PopoverRoot :open="menuOpen" @update:open="onOpenChange">
      <PopoverTrigger as-child>
        <ToolbarButton tooltip="Drag to move or open menu">
          <Icon name="GripVertical" />
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" :side-offset="8">
        <Surface class="p-2 flex flex-col min-w-[16rem]">
          <PopoverClose>
            <Button variant="ghost" class="w-full justify-start" @click="actions.resetTextFormatting">
              <Icon name="RemoveFormatting" />
              Clear formatting
            </Button>
          </PopoverClose>
          <PopoverClose>
            <Button variant="ghost" class="w-full justify-start" @click="actions.copyNodeToClipboard">
              <Icon name="Clipboard" />
              Copy to clipboard
            </Button>
          </PopoverClose>
          <PopoverClose>
            <Button variant="ghost" class="w-full justify-start" @click="actions.duplicateNode">
              <Icon name="Copy" />
              Duplicate
            </Button>
          </PopoverClose>
          <ToolbarDivider />
          <PopoverClose>
            <Button
              variant="ghost"
              class="w-full justify-start text-red-500 bg-red-500 dark:text-red-500 hover:bg-red-500 dark:hover:text-red-500 dark:hover:bg-red-500 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-20"
              @click="actions.deleteNode"
            >
              <Icon name="Trash2" />
              Delete
            </Button>
          </PopoverClose>
        </Surface>
      </PopoverContent>
    </PopoverRoot>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Editor } from '@tiptap/vue-3'
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from 'radix-vue'
import { useContentItemData } from '@/composables/useContentItemData'
import { useContentItemActions } from '@/composables/useContentItemActions'
import Icon from '@/components/ui/Icon.vue'
import ToolbarButton from '@/components/ui/ToolbarButton.vue'
import ToolbarDivider from '@/components/ui/ToolbarDivider.vue'
import Surface from '@/components/ui/Surface.vue'
import Button from '@/components/ui/Button/Button.vue'

type ContentItemMenuProps = {
  editor: Editor
}

const props = defineProps<ContentItemMenuProps>()

const menuOpen = ref(false)

const { currentNode, currentNodePos } = useContentItemData()
const actions = useContentItemActions(props.editor, currentNode, currentNodePos)

watch(menuOpen, (isOpen) => {
  if (isOpen) {
    props.editor.commands.setMeta('lockDragHandle', true)
  } else {
    props.editor.commands.setMeta('lockDragHandle', false)
  }
})

const onOpenChange = (isOpen: boolean) => {
  menuOpen.value = isOpen
}

// TODO: Implement DragHandle functionality when the dependency is available.
// The onNodeChange logic from useData needs to be connected to the DragHandle.
</script>
