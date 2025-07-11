import { Extension } from '@tiptap/core'

import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'
import { History } from '@tiptap/extension-history'

import {
  AiImage,
  AiWriter,
  BlockquoteFigure,
  CharacterCount,
  Color,
  Column,
  Columns,
  Document,
  Dropcursor,
  Figcaption,
  Focus,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalRule,
  ImageBlock,
  Link,
  Placeholder,
  Selection,
  SlashCommand,
  StarterKit,
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TaskItem,
  TaskList,
  TextAlign,
  TextStyle,
  TrailingNode,
  Typography,
  Underline,
  YouTube,
} from '.'
import { ImageUpload } from './ImageUpload'
import { TableOfContentsNode } from './TableOfContentsNode'
import { Collaboration } from '@tiptap/extension-collaboration'
import { CollaborationCursor } from '@tiptap/extension-collaboration-cursor'
import { Doc as YDoc } from 'yjs'
import { HocuspocusProvider } from '@hocuspocus/provider'
import { Emoji } from '@tiptap-pro/extension-emoji'
import { emojiSuggestion } from './EmojiSuggestion'

const AiExtension = Extension.create({
  name: 'ai',

  addOptions() {
    return {
      baseUrl: 'https://api.tiptap.dev/ai',
      appId: 'w9ne2qd9',
      token: '30181fdc6b06fa02c12da35b13ede9c42552bc1a2c4fd57c44d4860953ede954',
    }
  },
})

interface ExtensionKitProps {
  provider?: HocuspocusProvider | null
  userId?: string
  userName?: string
  userColor?: string
  ydoc?: YDoc
}

export const ExtensionKit = ({ provider, userId, userName = 'Maxi', ydoc }: ExtensionKitProps) => {
  const extensions = [
    Document,
    Columns,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    AiWriter.configure({
      authorId: userId,
      authorName: userName,
    }),
    AiImage.configure({
      authorId: userId,
      authorName: userName,
    }),
    AiExtension,
    Column,
    Selection,
    Heading.configure({
      levels: [1, 2, 3, 4, 5, 6],
    }),
    HorizontalRule,
    StarterKit.configure({
      document: false,
      dropcursor: false,
      heading: false,
      horizontalRule: false,
      history: false,
      codeBlock: false,
    }),
    History.configure({
      depth: 100,
      newGroupDelay: 500,
    }),
    CodeBlockLowlight.configure({
      lowlight,
      defaultLanguage: null,
      HTMLAttributes: {
        class: 'code-block-wrapper',
      },
    }),
    TextStyle,
    FontSize,
    FontFamily,
    Color,
    TrailingNode,
    Link.configure({
      openOnClick: false,
    }),
    Highlight.configure({ multicolor: true }),
    Underline,
    CharacterCount.configure({ limit: 50000 }),
    TableOfContentsNode,
    ImageUpload.configure({
      clientId: provider?.document?.clientID,
    }),
    ImageBlock,

    TextAlign.extend({
      addKeyboardShortcuts() {
        return {}
      },
    }).configure({
              types: ['heading', 'paragraph'],
    }),
    Subscript,
    Superscript,
    Table,
    TableCell,
    TableHeader,
    TableRow,
    Typography,
    Placeholder.configure({
      includeChildren: true,
      showOnlyCurrent: false,
      placeholder: () => '',
    }),
    SlashCommand,
    Focus,
    Figcaption,
    BlockquoteFigure,
    Dropcursor.configure({
      width: 2,
      class: 'ProseMirror-dropcursor border-black',
    }),
    Emoji.configure({
      suggestion: emojiSuggestion,
    }),
    YouTube,
  ]

  if (provider && ydoc) {
    extensions.push(
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: userName,
          color: '#f783ac',
        },
      }),
    )
  }

  return extensions
}

export default ExtensionKit
