import { Editor } from '@tiptap/core'
import { icons } from 'lucide-vue-next'

export interface Group {
  name: string
  title: string
  commands: Command[]
}

export interface Command {
  id: string
  name: string
  label: string
  description: string
  aliases?: string[]
  iconName: keyof typeof icons
  action: (editor: Editor) => void
  shouldBeHidden?: (editor: Editor) => boolean
}

export interface MenuListProps {
  editor: Editor
  items: Group[]
  command: (command: Command) => void
}
