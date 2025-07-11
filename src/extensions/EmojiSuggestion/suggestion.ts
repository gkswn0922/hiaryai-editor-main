import { VueRenderer } from '@tiptap/vue-3'
import { Editor } from '@tiptap/core'
import { SuggestionKeyDownProps, SuggestionProps } from '@tiptap/suggestion'
import tippy, { Instance } from 'tippy.js'

import EmojiList from './components/EmojiList.vue'

export const emojiSuggestion = {
  items: ({ editor, query }: { editor: Editor; query: string }) =>
    editor.storage.emoji.emojis
      .filter(
        ({ shortcodes, tags }: { shortcodes: string[]; tags: string[] }) =>
          shortcodes.find((shortcode: string) => shortcode.startsWith(query.toLowerCase())) ||
          tags.find((tag: string) => tag.startsWith(query.toLowerCase())),
      )
      .slice(0, 250),

  allowSpaces: false,

  render: () => {
    let component: VueRenderer
    let popup: Instance

    return {
      onStart: (props: SuggestionProps<any>) => {
        component = new VueRenderer(EmojiList, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect || !component.element) {
          return
        }

        popup = tippy(document.body, {
          getReferenceClientRect: props.clientRect as () => DOMRect,
          appendTo: () => document.body,
          content: component.element as any,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props: SuggestionProps<any>) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup.setProps({
          getReferenceClientRect: props.clientRect as () => DOMRect,
        })
      },

      onKeyDown(props: SuggestionKeyDownProps) {
        if (props.event.key === 'Escape') {
          popup.hide()

          return true
        }

        return (component.ref as any)?.onKeyDown(props)
      },

      onExit() {
        if (popup) {
          popup.destroy()
        }
        if (component) {
          component.destroy()
        }
      },
    }
  },
}

export default emojiSuggestion
