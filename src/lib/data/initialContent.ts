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
          text: ' Vue.js + Tiptap Block Editor Template',
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
          text: 'Welcome to our Vue.js Block Editor Template built on top of ',
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
          text: ' and ',
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
          text: '. This project can be a good starting point for your own implementation of a block editor.',
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
          text: 'This editor includes features like:',
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
                  text: 'A DragHandle including a DragHandle menu',
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
                  text: 'A Slash menu that can be triggered via typing a ',
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
                  text: ' into an empty paragraph or by using the ',
                },
                {
                  type: 'text',
                  marks: [
                    {
                      type: 'bold',
                    },
                  ],
                  text: '+ Button',
                },
                {
                  type: 'text',
                  text: ' next to the drag handle',
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
                  text: 'A TextFormatting menu that allows you to change the ',
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
                  text: 'font size',
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
                  text: 'font weight',
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
                  text: 'font family',
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
                  text: 'text color',
                },
                {
                  type: 'text',
                  text: ' and ',
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
                  text: 'highlighting',
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
                  text: 'A Table of Contents that automatically generates a list of all headlines.',
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
          text: 'Image Upload',
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
          text: 'This template has an image upload feature. You can simply drag and drop or copy/paste an image into the editor. It will be uploaded to a server and inserted into the document. The image is a block node, so you can also add a caption to it.',
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
          text: 'AI Tools',
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
          text: "We've also integrated our OpenAI extension, which allows you to use AI to improve your writing. You can use it to fix spelling and grammar, simplify your language, or even translate your text into another language. The AI tools are available in the text formatting menu.",
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
          text: 'Real-time collaboration',
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
          text: 'This template also includes a real-time collaboration feature. You can share a link to this document with others and edit it together. The changes will be synced in real-time. Try it out by opening this page in another tab!',
        },
      ],
    },
  ],
}
