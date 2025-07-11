export const initialContent = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 1,
      },
      content: [
        {
          type: 'emoji',
          attrs: {
            name: 'fire',
          },
        },
        {
          type: 'text',
          text: ' Vue.js + Tiptap 블록 에디터 템플릿',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        class: null,
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          text: '안녕하세요! ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://tiptap.dev/',
                target: '_blank',
                class: null,
              },
            },
          ],
          text: 'Tiptap',
        },
        {
          type: 'text',
          text: ', ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://vuejs.org/',
                target: '_blank',
                class: null,
              },
            },
          ],
          text: 'Vue.js',
        },
        {
          type: 'text',
          text: ', ',
        },
        {
          type: 'text',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://tailwindcss.com/',
                target: '_blank',
                class: null,
              },
            },
          ],
          text: 'Tailwind',
        },
        {
          type: 'text',
          text: '로 구축된 Vue.js 블록 에디터 템플릿에 오신 것을 환영합니다. 이 프로젝트는 블록 에디터를 직접 구현할 때 좋은 시작점이 될 수 있습니다.',
        },
      ],
    },
    {
      type: 'codeBlock',
      attrs: {
        language: null,
      },
      content: [
        {
          type: 'text',
          text: "import { useEditor, EditorContent } from '@tiptap/vue-3'\n\nfunction App() {\n  const editor = useEditor()\n\n  return <EditorContent editor={editor} />\n}",
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        class: null,
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          text: '이 에디터는 다음과 같은 기능들을 포함합니다:',
        },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: '드래그 핸들 메뉴를 포함한 드래그 핸들',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: '빈 문단에 ',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'code',
                    },
                  ],
                  text: '/',
                },
                {
                  type: 'text',
                  text: '를 입력하거나 드래그 핸들 옆의 ',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                  text: '+ 버튼',
                },
                {
                  type: 'text',
                  text: '을 사용해서 실행할 수 있는 슬래시 메뉴',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: '다음을 변경할 수 있는 텍스트 서식 메뉴: ',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'textStyle',
                      attrs: {
                        fontSize: '18px',
                        fontFamily: null,
                        color: null,
                      },
                    },
                  ],
                  text: '글꼴 크기',
                },
                {
                  type: 'text',
                  text: ', ',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                  text: '글꼴 굵기',
                },
                {
                  type: 'text',
                  text: ', ',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'textStyle',
                      attrs: {
                        fontSize: null,
                        fontFamily: 'Georgia',
                        color: null,
                      },
                    },
                  ],
                  text: '글꼴 종류',
                },
                {
                  type: 'text',
                  text: ', ',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'textStyle',
                      attrs: {
                        fontSize: null,
                        fontFamily: null,
                        color: '#ff0000',
                      },
                    },
                  ],
                  text: '텍스트 색상',
                },
                {
                  type: 'text',
                  text: ' 및 ',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'highlight',
                      attrs: {
                        color: '#ffff00',
                      },
                    },
                  ],
                  text: '하이라이트',
                },
                {
                  type: 'text',
                  text: '.',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              attrs: {
                class: null,
                textAlign: 'left',
              },
              content: [
                {
                  type: 'text',
                  text: '모든 제목의 목록을 자동으로 생성하는 목차.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: '이미지 업로드',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          text: '이 템플릿은 이미지 업로드 기능을 제공합니다. 에디터에 이미지를 간단히 드래그 앤 드롭하거나 복사/붙여넣기 할 수 있습니다. 이미지는 서버에 업로드되어 문서에 삽입됩니다. 이미지는 블록 노드이므로 캡션을 추가할 수도 있습니다.',
        },
      ],
    },
    {
      type: 'imageBlock',
      attrs: {
        src: 'https://i.imgur.com/K3aY4V6.jpeg',
      },
    },
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'AI 도구',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          text: '우리는 또한 글쓰기를 개선하기 위해 AI를 사용할 수 있는 OpenAI 확장을 통합했습니다. 맞춤법과 문법을 수정하거나, 언어를 단순화하거나, 심지어 텍스트를 다른 언어로 번역하는 데 사용할 수 있습니다. AI 도구는 텍스트 서식 메뉴에서 사용할 수 있습니다.',
        },
      ],
    },
    {
      type: 'aiWriter',
    },
    {
      type: 'heading',
      attrs: {
        textAlign: 'left',
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: '실시간 협업',
        },
      ],
    },
    {
      type: 'paragraph',
      attrs: {
        textAlign: 'left',
      },
      content: [
        {
          type: 'text',
          text: '이 템플릿은 실시간 협업 기능도 포함하고 있습니다. 이 문서의 링크를 다른 사람들과 공유하고 함께 편집할 수 있습니다. 변경 사항은 실시간으로 동기화됩니다. 다른 탭에서 이 페이지를 열어서 시도해보세요!',
        },
      ],
    },
  ],
}
