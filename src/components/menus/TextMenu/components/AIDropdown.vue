<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger as-child>
      <ToolbarButton
        tooltip="AI Tools"
        class="text-purple-500 hover:text-purple-600 active:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 dark:active:text-purple-400"
        active-classname="text-purple-600 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-200"
      >
        <Icon name="Sparkles" class="mr-1" />
        AI Tools
        <Icon name="ChevronDown" class="w-2 h-2 ml-1" />
      </ToolbarButton>
    </DropdownMenuTrigger>
    <DropdownMenuContent as-child>
      <Surface class="p-2 min-w-[10rem]">
        <DropdownMenuItem @select="onSimplify">
          <Icon name="CircleSlash" />
          Simplify
        </DropdownMenuItem>
        <DropdownMenuItem @select="onFixSpelling">
          <Icon name="Eraser" />
          Fix spelling & grammar
        </DropdownMenuItem>
        <DropdownMenuItem @select="onMakeShorter">
          <Icon name="ArrowLeftToLine" />
          Make shorter
        </DropdownMenuItem>
        <DropdownMenuItem @select="onMakeLonger">
          <Icon name="ArrowRightToLine" />
          Make longer
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon name="Mic" />
            Change tone
            <Icon name="ChevronRight" class="w-4 h-4 ml-auto" />
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <Surface class="flex flex-col min-w-[15rem] p-2 max-h-[20rem] overflow-auto">
              <DropdownMenuItem v-for="tone in tones" :key="tone.value" @select="handleTone(tone.value)">
                {{ tone.label }}
              </DropdownMenuItem>
            </Surface>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem @select="onTldr">
          <Icon name="MoveHorizontal" />
          Tl;dr:
        </DropdownMenuItem>
        <DropdownMenuItem @select="onEmojify">
          <Icon name="SmilePlus" />
          Emojify
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon name="Languages" />
            Translate
            <Icon name="ChevronRight" class="w-4 h-4 ml-auto" />
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <Surface class="flex flex-col min-w-[15rem] p-2 max-h-[20rem] overflow-auto">
              <DropdownMenuItem v-for="lang in languages" :key="lang.value" @select="handleTranslate(lang.value)">
                {{ lang.label }}
              </DropdownMenuItem>
            </Surface>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem @select="onCompleteSentence">
          <Icon name="PenLine" />
          Complete sentence
        </DropdownMenuItem>
      </Surface>
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>

<script setup lang="ts">
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from 'radix-vue'
import Icon from '@/components/ui/Icon.vue'
import Surface from '@/components/ui/Surface.vue'
import ToolbarButton from '@/components/ui/ToolbarButton.vue'
import { languages, tones } from '@/lib/constants'

const emit = defineEmits([
  'simplify',
  'fixSpelling',
  'makeShorter',
  'makeLonger',
  'emojify',
  'tldr',
  'translate',
  'tone',
  'completeSentence',
])

const onSimplify = () => emit('simplify')
const onFixSpelling = () => emit('fixSpelling')
const onMakeShorter = () => emit('makeShorter')
const onMakeLonger = () => emit('makeLonger')
const onEmojify = () => emit('emojify')
const onTldr = () => emit('tldr')
const onCompleteSentence = () => emit('completeSentence')
const handleTone = (tone: string) => emit('tone', tone)
const handleTranslate = (language: string) => emit('translate', language)
</script>

<style>
.dropdown-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  text-align: left;
}
.dropdown-button:hover {
  background-color: #f1f5f9;
}
</style> 