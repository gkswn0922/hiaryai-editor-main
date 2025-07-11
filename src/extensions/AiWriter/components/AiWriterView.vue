<template>
  <NodeViewWrapper data-drag-handle>
    <Panel :no-shadow="true" class="w-full">
      <div class="flex flex-col p-1">
        <Loader v-if="isFetching" label="AI is now doing its job!" />
        <template v-if="previewText">
          <PanelHeadline>Preview</PanelHeadline>
          <div
            class="bg-white dark:bg-black border-l-4 border-neutral-100 dark:border-neutral-700 text-black dark:text-white text-base max-h-[14rem] mb-4 ml-2.5 overflow-y-auto px-4 relative"
            v-html="previewText"
          ></div>
        </template>
        <div class="flex flex-row items-center justify-between gap-1">
          <PanelHeadline :as-child="true">
            <label :for="textareaId">Prompt</label>
          </PanelHeadline>
        </div>
        <textarea
          :id="textareaId"
          v-model="data.text"
          placeholder="Tell me what you want me to write about."
          required
          class="mb-2"
        ></textarea>
        <div class="flex flex-row items-center justify-between gap-1">
          <div class="flex justify-between w-auto gap-1">
            <DropdownMenuRoot>
              <DropdownMenuTrigger as-child>
                <Button variant="tertiary">
                  <Icon name="Mic" />
                  {{ currentTone?.label || 'Change tone' }}
                  <Icon name="ChevronDown" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="start" class="p-2 min-w-[12rem]">
                <DropdownMenuItem v-if="data.tone" @click="onUndoClick">
                  <Icon name="Undo2" />
                  Reset
                </DropdownMenuItem>
                <DropdownMenuSeparator v-if="data.tone" />
                <DropdownMenuItem v-for="tone in tones" :key="tone.value" @click="() => createItemClickHandler(tone)">
                  {{ tone.label }}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuRoot>
          </div>
          <div class="flex justify-between w-auto gap-1">
            <Button
              v-if="previewText"
              variant="ghost"
              class="text-red-500 hover:bg-red-500/10 hover:text-red-500"
              @click="discard"
            >
              <Icon name="Trash" />
              Discard
            </Button>
            <Button v-if="previewText" variant="ghost" @click="insert" :disabled="!previewText">
              <Icon name="Check" />
              Insert
            </Button>
            <Button variant="primary" @click="generateText" style="white-space: nowrap">
              <Icon :name="previewText ? 'Repeat' : 'Sparkles'" />
              {{ previewText ? 'Regenerate' : 'Generate text' }}
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

import Panel from '@/components/ui/Panel/Panel.vue'
import PanelHeadline from '@/components/ui/Panel/PanelHeadline.vue'
import Button from '@/components/ui/Button/Button.vue'
import Loader from '@/components/ui/Loader/Loader.vue'
import Icon from '@/components/ui/Icon.vue'
import { tones } from '@/lib/constants'
import type { AiTone, AiToneOption } from '@/components/BlockEditor/types'
import { useAIState } from "@/composables/useAIState";

interface DataProps {
  text: string
  addHeading: boolean
  tone?: AiTone
  textUnit?: string
  textLength?: string
  language?: string
}

const props = defineProps<NodeViewProps>()

const aiOptions = computed(() => {
  return props.editor.extensionManager.extensions.find((ext: any) => ext.name === 'ai')?.options || {}
})

const data = ref<DataProps>({
  text: '',
  tone: undefined,
  textLength: undefined,
  addHeading: false,
  language: undefined,
})

const currentTone = computed(() => tones.find(t => t.value === data.value.tone))
const previewText = ref<string | undefined>(undefined)
const isFetching = ref(false)
const textareaId = uuid()

const generateText = async () => {
  if (!data.value.text) {
    toast.error('Please enter a description')
    return
  }

  isFetching.value = true

  const payload = {
    text: data.value.text,
    textLength: data.value.textLength,
    textUnit: data.value.textUnit,
    useHeading: data.value.addHeading,
    tone: data.value.tone,
    language: data.value.language,
  }

  try {
    // @ts-ignore
    const { baseUrl, appId, token } = aiOptions.value
    const response = await fetch(`${baseUrl}/text/prompt`, {
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
    const text = json.response

    if (!text || !text.length) {
      isFetching.value = false
      return
    }

    previewText.value = text
  } catch (err: any) {
    const errorMessage = err?.response?.data?.error
    const message = errorMessage !== 'An error occurred' ? `An error has occured: ${errorMessage}` : errorMessage
    toast.error(message)
  } finally {
    isFetching.value = false
  }
}

const insert = () => {
  if (!props.getPos || !previewText.value) return
  const from = props.getPos()
  const to = from + props.node.nodeSize
  props.editor.chain().focus().insertContentAt({ from, to }, previewText.value).run()
}

const discard = () => {
  if (!props.deleteNode) return
  props.deleteNode()
}

const onUndoClick = () => {
  data.value.tone = undefined
}

const createItemClickHandler = (tone: AiToneOption) => {
  data.value.tone = tone.value
}

// const onToneSet = (t: any) => {
//   const tone = t.id as Tone
//
//   props.editor.chain().focus().setAiTone({ tone }).run()
// }
</script> 