import { Group } from './types'

export const GROUPS: Group[] = [
  {
    name: 'ai',
    title: 'AI',
    commands: [
      {
        id: 'continueWriting',
        name: 'continueWriting',
        label: 'Continue writing',
        iconName: 'PenLine',
        description: 'Use AI to expand your text',
        action: editor => {
          editor.chain().focus().continueWriting().run()
        },
      },
      {
        id: 'aiWriter',
        name: 'aiWriter',
        label: 'AI Writer',
        iconName: 'Sparkles',
        description: 'Let AI finish your thoughts',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => editor.chain().focus().setAiWriter().run(),
      },
      {
        id: 'aiImage',
        name: 'aiImage',
        label: 'AI Image',
        iconName: 'Sparkles',
        description: 'Generate an image from text',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => editor.chain().focus().setAiImage().run(),
      },
    ],
  },
  {
    name: 'format',
    title: 'Format',
    commands: [
      {
        id: 'heading1',
        name: 'heading1',
        label: 'Heading 1',
        iconName: 'Heading1',
        description: 'High priority section title',
        aliases: ['h1'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 1 }).run()
        },
      },
      {
        id: 'heading2',
        name: 'heading2',
        label: 'Heading 2',
        iconName: 'Heading2',
        description: 'Medium priority section title',
        aliases: ['h2'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 2 }).run()
        },
      },
      {
        id: 'heading3',
        name: 'heading3',
        label: 'Heading 3',
        iconName: 'Heading3',
        description: 'Low priority section title',
        aliases: ['h3'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 3 }).run()
        },
      },
      {
        id: 'bulletList',
        name: 'bulletList',
        label: 'Bullet List',
        iconName: 'List',
        description: 'Unordered list of items',
        aliases: ['ul'],
        action: editor => {
          editor.chain().focus().toggleBulletList().run()
        },
      },
      {
        id: 'numberedList',
        name: 'numberedList',
        label: 'Numbered List',
        iconName: 'ListOrdered',
        description: 'Ordered list of items',
        aliases: ['ol'],
        action: editor => {
          editor.chain().focus().toggleOrderedList().run()
        },
      },
      {
        id: 'taskList',
        name: 'taskList',
        label: 'Task List',
        iconName: 'ListTodo',
        description: 'Task list with todo items',
        aliases: ['todo'],
        action: editor => {
          editor.chain().focus().toggleTaskList().run()
        },
      },
      {
        id: 'blockquote',
        name: 'blockquote',
        label: 'Blockquote',
        iconName: 'Quote',
        description: 'Element for quoting',
        action: editor => {
          editor.chain().focus().setBlockquote().run()
        },
      },
      {
        id: 'codeBlock',
        name: 'codeBlock',
        label: 'Code Block',
        iconName: 'SquareCode',
        description: 'Code block with syntax highlighting',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor.chain().focus().setCodeBlock().run()
        },
      },
    ],
  },
  {
    name: 'insert',
    title: 'Insert',
    commands: [
      {
        id: 'table',
        name: 'table',
        label: 'Table',
        iconName: 'Table',
        description: 'Insert a table',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()
        },
      },
      {
        id: 'image',
        name: 'image',
        label: 'Image',
        iconName: 'Image',
        description: 'Insert an image',
        aliases: ['img'],
        action: editor => {
          editor.chain().focus().setImageUpload().run()
        },
      },
      {
        id: 'columns',
        name: 'columns',
        label: 'Columns',
        iconName: 'Columns2',
        description: 'Add two column content',
        aliases: ['cols'],
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor
            .chain()
            .focus()
            .setColumns()
            .focus(editor.state.selection.head - 1)
            .run()
        },
      },
      {
        id: 'horizontalRule',
        name: 'horizontalRule',
        label: 'Horizontal Rule',
        iconName: 'Minus',
        description: 'Insert a horizontal divider',
        aliases: ['hr'],
        action: editor => {
          editor.chain().focus().setHorizontalRule().run()
        },
      },
      {
        id: 'toc',
        name: 'toc',
        label: 'Table of Contents',
        iconName: 'Book',
        aliases: ['outline'],
        description: 'Insert a table of contents',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor.chain().focus().insertTableOfContents().run()
        },
      },
    ],
  },
]

export default GROUPS
