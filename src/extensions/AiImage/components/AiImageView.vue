<template>
  <NodeViewWrapper data-drag-handle>
    <Panel :no-shadow="true" class="w-full">
      <div class="flex flex-col p-1">
        <Loader v-if="isFetching" label="AI is now doing its job!" />
        <template v-if="previewImage">
          <PanelHeadline>Preview</PanelHeadline>
          <div
            class="w-full mb-4 bg-white bg-center bg-no-repeat bg-contain border border-black rounded dark:border-neutral-700 aspect-square"
            :style="{ backgroundImage: `url(${previewImage})` }"
          ></div>
        </template>
        <div class="flex items-center justify-between gap-2 row">
          <PanelHeadline :as-child="true">
            <label :for="textareaId">Prompt</label>
          </PanelHeadline>
        </div>
        <textarea
          :id="textareaId"
          v-model="data.text"
          placeholder="Describe the image that you want me to generate."
          required
          class="mb-2"
        ></textarea>
        <div class="flex flex-row items-center justify-between gap-1">
          <div class="flex justify-between w-auto gap-1">
            <DropdownMenuRoot>
              <DropdownMenuTrigger as-child>
                <Button variant="tertiary">
                  <Icon name="Image" />
                  {{ currentImageStyle?.label || 'Image style' }}
                  <Icon name="ChevronDown" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="start" class="p-2 min-w-[12rem]">
                <DropdownMenuItem v-if="data.imageStyle" @click="onUndoClick">
                  <Icon name="Undo2" />
                  Reset
                </DropdownMenuItem>
                <DropdownMenuSeparator v-if="data.imageStyle" />
                <DropdownMenuItem v-for="style in imageStyles" :key="style.value" @click="() => createItemClickHandler(style)">
                  {{ style.label }}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuRoot>
          </div>
          <div class="flex flex-row items-center justify-between gap-1">
            <Button
              v-if="previewImage"
              variant="ghost"
              class="text-red-500 hover:bg-red-500/10 hover:text-red-500"
              @click="discard"
            >
              <Icon name="Trash" />
              Discard
            </Button>
            <Button v-if="previewImage" variant="ghost" @click="insert">
              <Icon name="Check" />
              Insert
            </Button>
            <Button variant="primary" @click="generateImage">
              <Icon :name="previewImage ? 'Repeat' : 'Sparkles'" />
              {{ previewImage ? 'Regenerate' : 'Generate image' }}
            </Button>
          </div>
        </div>
      </div>
    </Panel>
  </NodeViewWrapper>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NodeViewWrapper, NodeViewProps } from '@tiptap/vue-3'
import { v4 as uuid } from 'uuid'
import { toast } from 'vue-sonner'
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'radix-vue'

import Button from '@/components/ui/Button/Button.vue'
import Loader from '@/components/ui/Loader/Loader.vue'
import Panel from '@/components/ui/Panel/Panel.vue'
import PanelHeadline from '@/components/ui/Panel/PanelHeadline.vue'
import Icon from '@/components/ui/Icon.vue'

const imageStyles = [
  { name: 'photorealistic', label: 'Photorealistic', value: 'photorealistic' },
  { name: 'digital-art', label: 'Digital art', value: 'digital_art' },
  { name: 'comic-book', label: 'Comic book', value: 'comic_book' },
  { name: 'neon-punk', label: 'Neon punk', value: 'neon_punk' },
  { name: 'isometric', label: 'Isometric', value: 'isometric' },
  { name: 'line-art', label: 'Line art', value: 'line_art' },
  { name: '3d-model', label: '3D model', value: '3d_model' },
] as const

type ImageOptions = typeof imageStyles[number]['value']

interface Data {
  text: string
  imageStyle?: ImageOptions
}

const props = defineProps<NodeViewProps>()

const aiOptions = computed(() => {
  return props.editor.extensionManager.extensions.find((ext: any) => ext.name === 'ai')?.options || {}
})

const data = ref<Data>({
  text: '',
  imageStyle: undefined,
})

const currentImageStyle = computed(() => imageStyles.find(t => t.value === data.value.imageStyle))
const previewImage = ref<string | undefined>(undefined)
const isFetching = ref(false)
const textareaId = uuid()

const generateImage = async () => {
  if (!data.value.text) {
    toast.error('Please enter a description for the image')
    return
  }

  isFetching.value = true

  const payload = {
    text: data.value.text,
    style: data.value.imageStyle,
  }

  try {
    const { baseUrl, appId, token } = aiOptions.value as any
    const response = await fetch(`${baseUrl}/image/prompt`, {
      method: 'POST',
      headers: {
        accept: 'application.json',
        'Content-Type': 'application/json',
        'X-App-Id': appId.trim(),
        Authorization: `Bearer ${token.trim()}`,
      },
      body: JSON.stringify(payload),
    })

    const json = await response.json()
    const url = json.response

    if (!url || !url.length) {
      isFetching.value = false
      return
    }

    previewImage.value = url
  } catch (err: any) {
    const errorMessage = err?.response?.data?.error
    const message = errorMessage !== 'An error occurred' ? `An error has occured: ${errorMessage}` : errorMessage
    toast.error(message)
  } finally {
    isFetching.value = false
  }
}

const insert = () => {
  if (!previewImage.value?.length || !props.getPos) {
    return
  }

  props.editor
    .chain()
    .insertContent(`<img src="${previewImage.value}" alt="" />`)
    .deleteRange({ from: props.getPos(), to: props.getPos() })
    .focus()
    .run()
}

const discard = () => {
  if (!props.deleteNode) return
  props.deleteNode()
}

const onUndoClick = () => {
  data.value.imageStyle = undefined
  previewImage.value = undefined
}

const createItemClickHandler = (style: { name: string; label: string; value: string }) => {
  data.value.imageStyle = style.value as ImageOptions
}
</script> 