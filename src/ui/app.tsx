import { useEffect, useState } from 'react'

import '@ui/styles/main.scss'
import '@radix-ui/themes/styles.css'

import CreateVersionSemantic from '@ui/views/create-version-semantic'
import CreatePage from '@ui/views/create-page'
import VersioningType from '@ui/views/versioning-type'
import CreateVersionDate from '@ui/views/create-version-date'
import { useFigmaMessage } from '../functions/useFigmaMessage'
import { Flex, Spinner, Text } from '@radix-ui/themes'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

function App () {
  const [hasPage, setHasPage] = useState<boolean>(false)
  const [versioning, setVersioning] = useState<any>('')
  const [lastVersion, setLastVersion] = useState<any>('0.0.0')
  const [loading, setLoading] = useState<boolean>(false)

  const {
    message,
    postMessage
  } = useFigmaMessage()

  const [init, setInit] = useState<boolean>(false)
  const [error, setError] = useState('')

  useEffect(() => {
    postMessage('INITIALIZE')
    postMessage('GET_LAST_VERSION')
  }, [])

  useEffect(() => {
    if (message?.type === 'INITIALIZE') {
      console.log('INITIALIZE', message.content)
      setHasPage(message.content[0])
      setVersioning(message.content[1])
      setLastVersion(message.content[2].lastVersion || '0.0.0')
      setInit(true)
    }

    if (message?.type === 'ERROR') {
      console.log('error', message)
      setError(message.content)
    }

    if (message?.type === 'CREATE_PAGE') {
      if (message.content !== 'error') {
        console.log('CREATE_PAGE', message)
        setHasPage(true)
      }
    }
    if (message?.type === 'VERSIONING') {
      setVersioning(message.content)
    }

    if (message?.type === 'COMMIT') {
      setLoading(false)
    }
  }, [message])

  const handleCreatePage = async (name: string) => {
    postMessage('CREATE_PAGE', name)
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
      {!hasPage && <CreatePage onClick={handleCreatePage}/>}
      {(hasPage && !versioning) && <VersioningType onClick={handleVersioning}/>}
      {(hasPage && versioning === 'semantic') &&
				<CreateVersionSemantic lastVersion={lastVersion} loading={loading} onClick={handleVersion}/>}
      {(hasPage && versioning === 'date') && <CreateVersionDate loading={loading} onClick={handleVersion}/>}
    </div>
  )
}

export default App
