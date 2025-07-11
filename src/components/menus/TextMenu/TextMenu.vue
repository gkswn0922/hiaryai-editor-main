<template>
  <BubbleMenu
    :tippy-options="{ popperOptions: { placement: 'top-start' } }"
    :editor="editor"
    plugin-key="textMenu"
    :should-show="states.shouldShow"
    :update-delay="100"
  >
    <Toolbar>
      <!-- <AIDropdown
        @complete-sentence="commands.onCompleteSentence"
        @emojify="commands.onEmojify"
        @fix-spelling="commands.onFixSpelling"
        @make-longer="commands.onMakeLonger"
        @make-shorter="commands.onMakeShorter"
        @simplify="commands.onSimplify"
        @tldr="commands.onTldr"
        @tone="commands.onTone"
        @translate="commands.onTranslate"
      />
      <ToolbarDivider /> -->
      <ContentTypePicker :options="blockOptions" />
      <FontFamilyPicker @change="commands.onSetFont" :value="states.currentFont.value || ''" />
      <FontSizePicker @change="commands.onSetFontSize" :value="states.currentSize.value || ''" />
      <ToolbarDivider />
      <ToolbarButton tooltip="Bold" :tooltip-shortcut="['Mod', 'B']" @click="commands.onBold" :is-active="states.isBold.value">
        <Icon name="Bold" />
      </ToolbarButton>
      <ToolbarButton tooltip="Italic" :tooltip-shortcut="['Mod', 'I']" @click="commands.onItalic" :is-active="states.isItalic.value">
        <Icon name="Italic" />
      </ToolbarButton>
      <ToolbarButton tooltip="Underline" :tooltip-shortcut="['Mod', 'U']" @click="commands.onUnderline" :is-active="states.isUnderline.value">
        <Icon name="Underline" />
      </ToolbarButton>
      <ToolbarButton tooltip="Strikehrough" :tooltip-shortcut="['Mod', 'Shift', 'S']" @click="commands.onStrike" :is-active="states.isStrike.value">
        <Icon name="Strikethrough" />
      </ToolbarButton>
      <ToolbarButton tooltip="Code" :tooltip-shortcut="['Mod', 'E']" @click="commands.onCode" :is-active="states.isCode.value">
        <Icon name="Code" />
      </ToolbarButton>
      <ToolbarButton tooltip="Code block" @click="commands.onCodeBlock">
        <Icon name="CodeXml" />
      </ToolbarButton>
      <EditLinkPopover @set-link="commands.onLink" />
      <PopoverRoot>
        <PopoverTrigger as-child>
          <ToolbarButton :is-active="!!states.currentHighlight.value" tooltip="Highlight text">
            <Icon name="Highlighter" />
          </ToolbarButton>
        </PopoverTrigger>
        <PopoverContent side="top" :side-offset="8" as-child>
          <Surface class="p-1">
            <ColorPicker
              :color="states.currentHighlight.value"
              @change="commands.onChangeHighlight"
              @clear="commands.onClearHighlight"
            />
          </Surface>
        </PopoverContent>
      </PopoverRoot>
      <PopoverRoot>
        <PopoverTrigger as-child>
          <ToolbarButton :is-active="!!states.currentColor.value" tooltip="Text color">
            <Icon name="Palette" />
          </ToolbarButton>
        </PopoverTrigger>
        <PopoverContent side="top" :side-offset="8" as-child>
          <Surface class="p-1">
            <ColorPicker
              :color="states.currentColor.value"
              @change="commands.onChangeColor"
              @clear="commands.onClearColor"
            />
          </Surface>
        </PopoverContent>
      </PopoverRoot>
      <PopoverRoot>
        <PopoverTrigger as-child>
          <ToolbarButton tooltip="More options">
            <Icon name="EllipsisVertical" />
          </ToolbarButton>
        </PopoverTrigger>
        <PopoverContent side="top" as-child>
          <Toolbar>
            <ToolbarButton tooltip="Subscript" :tooltip-shortcut="['Mod', '.']" @click="commands.onSubscript" :is-active="states.isSubscript.value">
              <Icon name="Subscript" />
            </ToolbarButton>
            <ToolbarButton tooltip="Superscript" :tooltip-shortcut="['Mod', ',']" @click="commands.onSuperscript" :is-active="states.isSuperscript.value">
              <Icon name="Superscript" />
            </ToolbarButton>
            <ToolbarDivider />
            <ToolbarButton tooltip="Align left" :tooltip-shortcut="['Shift', 'Mod', 'L']" @click="commands.onAlignLeft" :is-active="states.isAlignLeft.value">
              <Icon name="AlignLeft" />
            </ToolbarButton>
            <ToolbarButton tooltip="Align center" :tooltip-shortcut="['Shift', 'Mod', 'E']" @click="commands.onAlignCenter" :is-active="states.isAlignCenter.value">
              <Icon name="AlignCenter" />
            </ToolbarButton>
            <ToolbarButton tooltip="Align right" :tooltip-shortcut="['Shift', 'Mod', 'R']" @click="commands.onAlignRight" :is-active="states.isAlignRight.value">
              <Icon name="AlignRight" />
            </ToolbarButton>
            <ToolbarButton tooltip="Justify" :tooltip-shortcut="['Shift', 'Mod', 'J']" @click="commands.onAlignJustify" :is-active="states.isAlignJustify.value">
              <Icon name="AlignJustify" />
            </ToolbarButton>
          </Toolbar>
        </PopoverContent>
      </PopoverRoot>
    </Toolbar>
  </BubbleMenu>
</template>

<script setup lang="ts">
import { BubbleMenu, Editor } from '@tiptap/vue-3'
import { PopoverContent, PopoverRoot, PopoverTrigger } from 'radix-vue'

import { useTextmenuCommands } from '@/composables/useTextmenuCommands'
import { useTextmenuStates } from '@/composables/useTextmenuStates'
import { useTextmenuContentTypes } from '@/composables/useTextmenuContentTypes'

import Icon from '@/components/ui/Icon.vue'
import Toolbar from '@/components/ui/Toolbar.vue'
import ToolbarButton from '@/components/ui/ToolbarButton.vue'
import ToolbarDivider from '@/components/ui/ToolbarDivider.vue'
import Surface from '@/components/ui/Surface.vue'
import ColorPicker from '@/components/panels/Colorpicker/ColorPicker.vue'
import FontFamilyPicker from './components/FontFamilyPicker.vue'
import FontSizePicker from './components/FontSizePicker.vue'
import ContentTypePicker from './components/ContentTypePicker.vue'
// import AIDropdown from './components/AIDropdown.vue'
import EditLinkPopover from './components/EditLinkPopover.vue'


type TextMenuProps = {
  editor: Editor
}

const props = defineProps<TextMenuProps>()

const commands = useTextmenuCommands(props.editor)
const states = useTextmenuStates(props.editor)
const blockOptions = useTextmenuContentTypes(props.editor)
</script> 