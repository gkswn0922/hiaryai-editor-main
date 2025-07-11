import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import TableOfContentsNodeView from './TableOfContentsNodeView.vue'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tableOfContentsNode: {
      insertTableOfContents: () => ReturnType
    }
  }
}

export const TableOfContentsNode = Node.create({
  name: 'tableOfContentsNode',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,
  inline: false,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="table-of-content"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { ...HTMLAttributes, 'data-type': 'table-of-content' }]
  },

  addNodeView() {
    return VueNodeViewRenderer(TableOfContentsNodeView)
  },

  addCommands() {
    return {
      insertTableOfContents:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
          })
        },
    }
  },
}) 