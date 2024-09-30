import { useEffect, useState } from 'react'

import '@ui/styles/main.scss'
import '@radix-ui/themes/styles.css'

import CreateVersionSemantic from '@ui/views/create-version-semantic'
import VersioningType from '@ui/views/versioning-type'
import CreateVersionDate from '@ui/views/create-version-date'
import { useFigmaMessage } from '@functions/useFigmaMessage'
import { Flex, Spinner, Text } from '@radix-ui/themes'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import SelectPage from '@ui/views/select-page'

function App () {
  const [page, setPage] = useState<string | undefined>('')
  const [versioning, setVersioning] = useState<any>('')
  const [lastVersion, setLastVersion] = useState<any>('0.0.0')
  const [loading, setLoading] = useState<boolean>(false)
  const [pages, setPages] = useState<any>([])

  const {
    message,
    postMessage
  } = useFigmaMessage()

  const [init, setInit] = useState<boolean>(false)
  const [error, setError] = useState('')

  useEffect(() => {
    postMessage('INITIALIZE')
  }, [])

  useEffect(() => {
    setLoading(false)
    if (message?.type === 'INITIALIZE') {
      setPage(message.content.hasPage)
      setPages(message.content.pages)
      setInit(true)
      if (message.content.hasPage) {
        setVersioning(message.content.versioning.type)
        setLastVersion(message.content.versioning.lastVersion || '0.0.0')
      }
    }

    if (message?.type === 'ERROR') {
      setError(message.content)
    }

    if (message?.type === 'SELECT_PAGE') {
      setLoading(false)
      if (message.content !== 'error') {
        postMessage('VERSIONING')
        setPage(message.content)
      } else {
        setPage(undefined)
      }
    }

    if (message?.type === 'VERSIONING') {
      setVersioning(message.content.type)
      setLastVersion(message.content.lastVersion)
    }

    if (message?.type === 'LAST_VERSION') {
      setLastVersion(message.content.lastVersion)
    }
  }, [message])

  const handleVersioning = async (type: string) => {
    setVersioning(type)
  }

  const handleChange = (e: any) => {
    postMessage('LAST_VERSION', e)
  }

  const handleVersion = async (page?: string, message?: string, links?: Array<{
    label?: string
    url?: string
  }>, version?: string) => {
    setLoading(true)
    if (versioning === 'semantic') {
      postMessage('COMMIT', {
        page,
        versioning,
        message,
        links,
        version
      })
    } else {
      postMessage('COMMIT', {
        page,
        versioning,
        message,
        links
      })
    }
  }

  if (!init) {
    return (
      <div className="main">
        <Flex direction="column" gap="2">
          <Spinner size="3"/>
          <Flex direction="column" gap="0">
            <Text size="3" weight="bold">Loading...</Text>
            <Text size="1">If this takes too long, please move your changelog page to top level of your
              Figma file</Text>
          </Flex>
        </Flex>
      </div>
    )
  }

  if (error) {
    return (
      <div className="main">
        <Flex direction="column" gap="2">
          <ExclamationTriangleIcon color="red" width="40" height="40"/>
          <Flex direction="column" gap="0">
            <Text size="3" weight="bold" color="red">
              Error
            </Text>
            <Text size="1">
              {error}
            </Text>
          </Flex>
        </Flex>
      </div>
    )
  }

  return (
    <div className="main">
      {(!versioning) && <VersioningType onClick={handleVersioning}/>}
      {(versioning === 'semantic') &&
        <CreateVersionSemantic pages={pages} selectedPage={page || pages[0].id} lastVersion={lastVersion} loading={loading}
          onClick={handleVersion} onChange={handleChange}/>}
      {(versioning === 'date') &&
        <CreateVersionDate pages={pages} selectedPage={page || pages[0].id} loading={loading} onClick={handleVersion}/>}
    </div>
  )
}

export default App
