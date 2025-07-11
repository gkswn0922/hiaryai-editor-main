import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { v4 as uuid } from 'uuid'

import AiWriterView from './components/AiWriterView.vue'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    aiWriter: {
      setAiWriter: () => ReturnType
      continueWriting: () => ReturnType
    }
  }
}

export const AiWriter = Node.create({
  name: 'aiWriter',

  group: 'block',

  draggable: true,

  addOptions() {
    return {
      authorId: undefined,
      authorName: undefined,
      HTMLAttributes: {
        class: `node-${this.name}`,
      },
    }
  },

  addAttributes() {
    return {
      id: {
        default: undefined,
        parseHTML: element => element.getAttribute('data-id'),
        renderHTML: attributes => ({
          'data-id': attributes.id,
        }),
      },
      authorId: {
        default: undefined,
        parseHTML: element => element.getAttribute('data-author-id'),
        renderHTML: attributes => ({
          'data-author-id': attributes.authorId,
        }),
      },
      authorName: {
        default: undefined,
        parseHTML: element => element.getAttribute('data-author-name'),
        renderHTML: attributes => ({
          'data-author-name': attributes.authorName,
        }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: `div.node-${this.name}`,
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addCommands() {
    return {
      setAiWriter:
        () =>
        ({ chain }) =>
          chain()
            .focus()
            .insertContent({
              type: this.name,
              attrs: {
                id: uuid(),
                authorId: this.options.authorId,
                authorName: this.options.authorName,
              },
            })
            .run(),
      continueWriting:
        () =>
        ({ editor }) => {
          const { state, chain } = editor
          const { doc } = state
          const { from, to } = state.selection

          const text = doc.textBetween(Math.max(0, from - 5000), from, '\n')

          const { baseUrl, appId, token } = this.options

          fetch(`${baseUrl}/text/prompt`, {
            method: 'POST',
            headers: {
              accept: 'application.json',
              'Content-Type': 'application/json',
              'X-App-Id': appId.trim(),
              Authorization: `Bearer ${token.trim()}`,
            },
            body: JSON.stringify({
              text,
            }),
          })
            .then(response => response.json())
            .then(({ response }) => {
              if (response) {
                return chain().focus().insertContentAt(to, response).run()
              }
            })

          return true
        },
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(AiWriterView)
  },
})

export default AiWriter
