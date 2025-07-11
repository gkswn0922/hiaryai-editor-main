import { Group } from './types'

export const GROUPS: Group[] = [
  {
    name: 'ai',
    title: 'AI',
    commands: [
      {
        id: 'continueWriting',
        name: 'continueWriting',
        label: '계속 작성하기',
        iconName: 'PenLine',
        description: 'AI를 사용해서 텍스트를 확장합니다',
        action: editor => {
          editor.chain().focus().continueWriting().run()
        },
      },
      {
        id: 'aiWriter',
        name: 'aiWriter',
        label: 'AI 작성도구',
        iconName: 'Sparkles',
        description: 'AI가 당신의 생각을 완성해드립니다',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => editor.chain().focus().setAiWriter().run(),
      },
      {
        id: 'aiImage',
        name: 'aiImage',
        label: 'AI 이미지',
        iconName: 'Sparkles',
        description: '텍스트로부터 이미지를 생성합니다',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => editor.chain().focus().setAiImage().run(),
      },
    ],
  },
  {
    name: 'format',
    title: '서식',
    commands: [
      {
        id: 'heading1',
        name: 'heading1',
        label: '제목 1',
        iconName: 'Heading1',
        description: '높은 우선순위 섹션 제목',
        aliases: ['h1'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 1 }).run()
        },
      },
      {
        id: 'heading2',
        name: 'heading2',
        label: '제목 2',
        iconName: 'Heading2',
        description: '중간 우선순위 섹션 제목',
        aliases: ['h2'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 2 }).run()
        },
      },
      {
        id: 'heading3',
        name: 'heading3',
        label: '제목 3',
        iconName: 'Heading3',
        description: '낮은 우선순위 섹션 제목',
        aliases: ['h3'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 3 }).run()
        },
      },
      {
        id: 'bulletList',
        name: 'bulletList',
        label: '글머리 기호 목록',
        iconName: 'List',
        description: '순서가 없는 항목 목록',
        aliases: ['ul'],
        action: editor => {
          editor.chain().focus().toggleBulletList().run()
        },
      },
      {
        id: 'numberedList',
        name: 'numberedList',
        label: '번호 목록',
        iconName: 'ListOrdered',
        description: '순서가 있는 항목 목록',
        aliases: ['ol'],
        action: editor => {
          editor.chain().focus().toggleOrderedList().run()
        },
      },
      {
        id: 'taskList',
        name: 'taskList',
        label: '할일 목록',
        iconName: 'ListTodo',
        description: '할일 항목이 있는 작업 목록',
        aliases: ['todo'],
        action: editor => {
          editor.chain().focus().toggleTaskList().run()
        },
      },
      {
        id: 'blockquote',
        name: 'blockquote',
        label: '인용구',
        iconName: 'Quote',
        description: '인용을 위한 요소',
        action: editor => {
          editor.chain().focus().setBlockquote().run()
        },
      },
      {
        id: 'codeBlock',
        name: 'codeBlock',
        label: '코드 블록',
        iconName: 'SquareCode',
        description: '구문 강조가 있는 코드 블록',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor.chain().focus().setCodeBlock().run()
        },
      },
    ],
  },
  {
    name: 'insert',
    title: '삽입',
    commands: [
      {
        id: 'table',
        name: 'table',
        label: '표',
        iconName: 'Table',
        description: '표를 삽입합니다',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()
        },
      },
      {
        id: 'image',
        name: 'image',
        label: '이미지',
        iconName: 'Image',
        description: '이미지를 삽입합니다',
        aliases: ['img'],
        action: editor => {
          editor.chain().focus().setImageUpload().run()
        },
      },
      {
        id: 'columns',
        name: 'columns',
        label: '열',
        iconName: 'Columns2',
        description: '두 개의 열 콘텐츠를 추가합니다',
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
        label: '수평선',
        iconName: 'Minus',
        description: '수평 구분선을 삽입합니다',
        aliases: ['hr'],
        action: editor => {
          editor.chain().focus().setHorizontalRule().run()
        },
      },
      {
        id: 'toc',
        name: 'toc',
        label: '목차',
        iconName: 'Book',
        aliases: ['outline'],
        description: '목차를 삽입합니다',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor.chain().focus().insertTableOfContents().run()
        },
      },
      {
        id: 'youtube',
        name: 'youtube',
        label: 'YouTube 비디오',
        iconName: 'Play',
        description: 'YouTube 비디오를 삽입합니다',
        aliases: ['video', 'youtube'],
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          const url = prompt('YouTube URL을 입력하세요:')
          if (url) {
            editor.chain().focus().setYouTubeVideo({ src: url }).run()
          }
        },
      },
    ],
  },
]

export default GROUPS
