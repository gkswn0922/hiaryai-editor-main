import { EmojiItem } from '@tiptap-pro/extension-emoji'

export interface EmojiListProps {
  command: (item: EmojiItem) => void
  items: EmojiItem[]
}
