import { Node } from '@tiptap/core'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Bold } from '@tiptap/extension-bold'
import { Italic } from '@tiptap/extension-italic'
import { Heading } from '@tiptap/extension-heading'
import { BulletList } from '@tiptap/extension-bullet-list'
import { Document } from '@tiptap/extension-document'
import { ListItem } from '@tiptap/extension-list-item'
import { OrderedList } from '@tiptap/extension-ordered-list'
import { Text } from '@tiptap/extension-text'

export const TiptapExtensions = [
  Node,
  Paragraph,
  Bold,
  Italic,
  Heading,
  BulletList,
  Document,
  ListItem,
  OrderedList,
  Text,
]

// TODO: File causes circular dependency issue in ESLint
/* eslint-disable */
export { CharacterCount } from '@tiptap/extension-character-count'
export { CodeBlock } from '@tiptap/extension-code-block'
export { Collaboration } from '@tiptap/extension-collaboration'
export { CollaborationCursor } from '@tiptap/extension-collaboration-cursor'
export { Color } from '@tiptap/extension-color'
export { Dropcursor } from '@tiptap/extension-dropcursor'
export { FocusClasses as Focus } from '@tiptap/extension-focus'
export { FontFamily } from '@tiptap/extension-font-family'
export { Highlight } from '@tiptap/extension-highlight'
export { Placeholder } from '@tiptap/extension-placeholder'
export { Subscript } from '@tiptap/extension-subscript'
export { Superscript } from '@tiptap/extension-superscript'
export { TaskItem } from '@tiptap/extension-task-item'
export { TaskList } from '@tiptap/extension-task-list'
export { TextAlign } from '@tiptap/extension-text-align'
export { TextStyle } from '@tiptap/extension-text-style'
export { Typography } from '@tiptap/extension-typography'
export { Underline } from '@tiptap/extension-underline'
export { StarterKit } from '@tiptap/starter-kit'

export { Document } from './Document'
export { Heading } from './Heading'

export { AiImage } from './AiImage'
export { AiWriter } from './AiWriter'
export { BlockquoteFigure } from './BlockquoteFigure'
export { Quote } from './BlockquoteFigure/Quote'
export { QuoteCaption } from './BlockquoteFigure/QuoteCaption'

export { emojiSuggestion } from './EmojiSuggestion'
export { Figcaption } from './Figcaption'
export { Figure } from './Figure'
export { FontSize } from './FontSize'
export { HorizontalRule } from './HorizontalRule'
export { ImageBlock } from './ImageBlock'
export { ImageUpload } from './ImageUpload'
export { Link } from './Link'
export { Column, Columns } from './MultiColumn'
export { Selection } from './Selection'
export { SlashCommand } from './SlashCommand'
export { Table, TableCell, TableHeader, TableRow } from './Table'
export { TrailingNode } from './TrailingNode'

