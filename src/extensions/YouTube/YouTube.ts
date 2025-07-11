import { Node, mergeAttributes } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'

function isValidYouTubeUrl(url: string) {
  return url.match(
    /^(https?:\/\/)?(www\.|music\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)?([A-Za-z0-9_-]{11})(\S+)?$/,
  )
}

function getEmbedUrlFromYouTubeUrl(options: {
  url: string
  allowFullscreen?: boolean
  autoplay?: boolean
  ccLanguage?: string
  ccLoadPolicy?: boolean
  controls?: boolean
  disableKBcontrols?: boolean
  enableIFrameApi?: boolean
  endTime?: number
  interfaceLanguage?: string
  ivLoadPolicy?: number
  loop?: boolean
  modestBranding?: boolean
  nocookie?: boolean
  origin?: string
  playlist?: string
  progressBarColor?: string
  rel?: boolean
  showinfo?: boolean
  startAt?: number
}) {
  const {
    url,
    allowFullscreen,
    autoplay,
    ccLanguage,
    ccLoadPolicy,
    controls,
    disableKBcontrols,
    enableIFrameApi,
    endTime,
    interfaceLanguage,
    ivLoadPolicy,
    loop,
    modestBranding,
    nocookie,
    origin,
    playlist,
    progressBarColor,
    rel,
    showinfo,
    startAt,
  } = options

  const videoIdRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi
  const match = videoIdRegex.exec(url)

  if (!match || !match[1]) {
    return null
  }

  let embedUrl = `https://www.youtube${nocookie ? '-nocookie' : ''}.com/embed/${match[1]}`

  const params = new URLSearchParams()

  if (autoplay) {
    params.set('autoplay', '1')
  }

  if (!controls) {
    params.set('controls', '0')
  }

  if (disableKBcontrols) {
    params.set('disablekb', '1')
  }

  if (enableIFrameApi) {
    params.set('enablejsapi', '1')
  }

  if (endTime) {
    params.set('end', String(endTime))
  }

  if (interfaceLanguage) {
    params.set('hl', interfaceLanguage)
  }

  if (ivLoadPolicy) {
    params.set('iv_load_policy', String(ivLoadPolicy))
  }

  if (loop) {
    params.set('loop', '1')
  }

  if (modestBranding) {
    params.set('modestbranding', '1')
  }

  if (origin) {
    params.set('origin', origin)
  }

  if (playlist) {
    params.set('playlist', playlist)
  }

  if (progressBarColor) {
    params.set('color', progressBarColor)
  }

  if (!rel) {
    params.set('rel', '0')
  }

  if (!showinfo) {
    params.set('showinfo', '0')
  }

  if (startAt) {
    params.set('start', String(startAt))
  }

  if (ccLanguage) {
    params.set('cc_lang_pref', ccLanguage)
  }

  if (ccLoadPolicy) {
    params.set('cc_load_policy', '1')
  }

  if (params.toString()) {
    embedUrl += `?${params.toString()}`
  }

  return embedUrl
}

export interface YouTubeOptions {
  allowFullscreen: boolean
  autoplay: boolean
  ccLanguage?: string
  ccLoadPolicy?: boolean
  controls: boolean
  disableKBcontrols: boolean
  enableIFrameApi: boolean
  endTime: number
  height: number
  interfaceLanguage?: string
  ivLoadPolicy: number
  loop: boolean
  modestBranding: boolean
  nocookie: boolean
  origin: string
  playlist: string
  progressBarColor?: string
  rel: boolean
  showinfo: boolean
  startAt: number
  width: number
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    youtube: {
      setYouTubeVideo: (options: {
        src: string
        width?: number
        height?: number
        start?: number
      }) => ReturnType
    }
  }
}

export const YouTube = Node.create<YouTubeOptions>({
  name: 'youtube',

  group: 'block',

  atom: true,

  addOptions() {
    return {
      allowFullscreen: true,
      autoplay: false,
      ccLanguage: undefined,
      ccLoadPolicy: undefined,
      controls: true,
      disableKBcontrols: false,
      enableIFrameApi: false,
      endTime: 0,
      height: 315,
      interfaceLanguage: undefined,
      ivLoadPolicy: 0,
      loop: false,
      modestBranding: false,
      nocookie: false,
      origin: '',
      playlist: '',
      progressBarColor: undefined,
      rel: true,
      showinfo: true,
      startAt: 0,
      width: 560,
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      start: {
        default: 0,
      },
      width: {
        default: this.options.width,
      },
      height: {
        default: this.options.height,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-youtube-video] iframe',
      },
    ]
  },

  addCommands() {
    return {
      setYouTubeVideo:
        (options: { src: string; width?: number; height?: number; start?: number }) =>
        ({ commands }) => {
          if (!isValidYouTubeUrl(options.src)) {
            return false
          }

          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('youtube-handler'),
        props: {
          handlePaste: (view, event) => {
            const clipboardData = event.clipboardData
            if (!clipboardData) return false

            const text = clipboardData.getData('text/plain')
            if (!text || !isValidYouTubeUrl(text)) return false

            const pos = view.state.selection.from
            const tr = view.state.tr.insert(pos, this.type.create({ src: text }))
            view.dispatch(tr)
            return true
          },
          handleDrop: (view, event) => {
            const text = event.dataTransfer?.getData('text/plain')
            if (!text || !isValidYouTubeUrl(text)) return false

            const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })
            if (!pos) return false

            const tr = view.state.tr.insert(pos.pos, this.type.create({ src: text }))
            view.dispatch(tr)
            return true
          },
        },
      }),
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const embedUrl = getEmbedUrlFromYouTubeUrl({
      url: HTMLAttributes.src,
      allowFullscreen: this.options.allowFullscreen,
      autoplay: this.options.autoplay,
      ccLanguage: this.options.ccLanguage,
      ccLoadPolicy: this.options.ccLoadPolicy,
      controls: this.options.controls,
      disableKBcontrols: this.options.disableKBcontrols,
      enableIFrameApi: this.options.enableIFrameApi,
      endTime: this.options.endTime,
      interfaceLanguage: this.options.interfaceLanguage,
      ivLoadPolicy: this.options.ivLoadPolicy,
      loop: this.options.loop,
      modestBranding: this.options.modestBranding,
      nocookie: this.options.nocookie,
      origin: this.options.origin,
      playlist: this.options.playlist,
      progressBarColor: this.options.progressBarColor,
      rel: this.options.rel,
      showinfo: this.options.showinfo,
      startAt: HTMLAttributes.start || this.options.startAt,
    })

    const iframeAttributes = {
      src: embedUrl,
      width: HTMLAttributes.width || this.options.width,
      height: HTMLAttributes.height || this.options.height,
      allowfullscreen: this.options.allowFullscreen,
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      frameborder: 0,
    }

    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, { 'data-youtube-video': '' }),
      ['iframe', iframeAttributes],
    ]
  },
})
