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
      if (message.content.hasPage) {
        setVersioning(message.content.versioning.type)
        setLastVersion(message.content.versioning.lastVersion || '0.0.0')
      }
      setInit(true)
    }

    if (message?.type === 'ERROR') {
      setError(message.content)
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
  }, [message])

  const handleSelectPage = async (id: string) => {
    setLoading(true)
    postMessage('SELECT_PAGE', id)
  }
  const handleVersioning = async (type: string) => {
    setVersioning(type)
  }

  const handleVersion = async (message?: string, links?: Array<{
    label?: string
    url?: string
  }>, version?: string) => {
    setLoading(true)

    if (versioning === 'semantic') {
      postMessage('COMMIT', {
        versioning,
        message,
        links,
        version
      })
    } else {
      postMessage('COMMIT', {
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
      {!page && <SelectPage loading={loading} pages={pages} onClick={handleSelectPage}/>}
      {(page && !versioning) && <VersioningType onClick={handleVersioning}/>}
      {(page && versioning === 'semantic') &&
        <CreateVersionSemantic lastVersion={lastVersion} loading={loading} onClick={handleVersion}/>}
      {(page && versioning === 'date') && <CreateVersionDate loading={loading} onClick={handleVersion}/>}
    </div>
  )
}

export default App
