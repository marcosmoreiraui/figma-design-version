import { useEffect, useState, useCallback } from 'react'

interface MessageData {
  type: string
  content?: any
}

export function useFigmaMessage () {
  const [message, setMessage] = useState<MessageData | null>(null)

  const postMessage = useCallback((type: string, content?: any) => {
    const message: MessageData = {
      type,
      content
    }
    parent.postMessage({ pluginMessage: message }, '*')
  }, [])

  useEffect(() => {
    function receiveMessage (event: MessageEvent) {
      if (event.data.pluginMessage) {
        setMessage(event.data.pluginMessage)
      }
    }

    window.addEventListener('message', receiveMessage)
    return () => {
      window.removeEventListener('message', receiveMessage)
    }
  }, [])

  return {
    postMessage,
    message
  }
}
