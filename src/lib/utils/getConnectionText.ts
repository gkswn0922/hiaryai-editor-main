import { WebSocketStatus } from '@hocuspocus/provider'

export const getConnectionText = (collabState: WebSocketStatus) => {
  switch (collabState) {
    case WebSocketStatus.Connected:
      return `연결됨`

    case WebSocketStatus.Connecting:
      return `연결 중...`

    case WebSocketStatus.Disconnected:
      return `연결 끊김`

    default:
      return `연결 중...`
  }
}
