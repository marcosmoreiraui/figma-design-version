import React, { useEffect, useState } from 'react'
import {
  Badge,
  Button,
  Checkbox,
  Dialog,
  Flex,
  RadioCards,
  Select,
  Text,
  TextArea,
  TextField,
  Tooltip
} from '@radix-ui/themes'
import semanticVersioning from '../../functions/semanticVersioning'
import { Cross1Icon, Link1Icon } from '@radix-ui/react-icons'

function CreateVersionSemantic ({
  lastVersion,
  onClick,
  loading,
  pages,
  selectedPage,
  onChange
}: {
  lastVersion: string
  onClick: (page: string, message: string, links: Array<{ label?: string, url?: string }>, version: string) => void
  loading: boolean
  pages?: any
  selectedPage: string
  onChange: (page: string) => void
}) {
  const [type, setType] = useState('1')
  const [isRC, setIsRC] = useState(lastVersion?.includes('-rc'))
  const [message, setMessage] = useState('')
  const [version, setVersion] = useState('0.0.0' as string)
  const [showRC, setShowRC] = useState(false)
  const [links, setLinks] = useState<Array<{
    key: string
    label?: string
    url?: string
  }>>([])
  const [newLabel, setNewLabel] = useState('') // El label del nuevo link.
  const [newUrl, setNewUrl] = useState('') // El URL del nuevo link.
  const [isValidUrl, setValidUrl] = useState(true)
  const [page, setPage] = useState(selectedPage)
  useEffect(() => {
    setIsRC(lastVersion?.includes('-rc'))
    if (showRC) {
      setVersion(semanticVersioning(lastVersion, type, showRC))
    } else {
      setVersion(semanticVersioning(lastVersion, type, isRC))
    }
  }, [type, showRC, lastVersion])

  const getNewVersion = (type: string, isRC?: boolean) => {
    return semanticVersioning(lastVersion, type, (isRC === true) || false)
  }
  const handleClick = () => {
    onClick(page, message, links, version)
  }

  const isValid = (url: string) => {
    try {
      // eslint-disable-next-line no-new
      new URL(url)
      setValidUrl(true)
    } catch (_) {
      setValidUrl(false)
    }
  }

  const addLink = () => {
    isValid(newUrl)
    if (!isValidUrl) return
    const uuid = () => Math.random().toString(16).slice(2)
    setLinks([...links, {
      key: uuid(),
      label: newLabel,
      url: newUrl
    }])
    setNewLabel('')
    setNewUrl('')
  }

  const removeLink = (key: string) => {
    setLinks(links.filter(link => link.key !== key))
  }

  const handleChange = (e: any) => {
    setPage(e)
    onChange(e)
  }

  return (
    <Flex direction="column" gap="4" width="100%">
      <Text size="4" weight="bold" align="left">Commit your changes</Text>
      <Flex direction="column" gap="2">
        <Text as="label" size="1" weight="bold">Page</Text>
        <Select.Root defaultValue={selectedPage} onValueChange={handleChange} size="2">
          <Select.Trigger/>
          <Select.Content>
            {pages.map((page: any) => (
              <Select.Item key={page.id} value={page.id}>{page.name}</Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>
      <Flex direction="column" gap="2" width="100%">
        <Text size="1" weight="bold">Select version type</Text>
        {!isRC && <Flex direction="column" gap="3">
          <RadioCards.Root size="1" defaultValue={!showRC ? '1' : '2'} gap="2" columns="3"
            onValueChange={(v) => {
              setType(v)
            }} value={type}>
            <RadioCards.Item value="1" disabled={showRC}>
              <Flex direction="column" width="100%">
                <Text weight="bold">Patch</Text>
                <Text>v{getNewVersion('1')}</Text>
              </Flex>
            </RadioCards.Item>
            <RadioCards.Item value="2">
              <Flex direction="column" width="100%">
                <Text weight="bold">Minor</Text>
                <Text>v{getNewVersion('2', showRC)}</Text>
              </Flex>
            </RadioCards.Item>
            <RadioCards.Item value="3">
              <Flex direction="column" width="100%">
                <Text weight="bold">Major</Text>
                <Text>v{getNewVersion('3', showRC)}</Text>
              </Flex>
            </RadioCards.Item>
          </RadioCards.Root>
          <Flex gap="2" align="center">
            <Checkbox onCheckedChange={(v) => {
              setType('2')
              // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
              setShowRC(!!v)
            }
            } checked={showRC}/>
            <Text size="1">Is a release candidate</Text>
          </Flex>
        </Flex>
        }
        {isRC && <Flex direction="column">
          <RadioCards.Root defaultValue="rc" onValueChange={(v) => {
            setType(v)
          }} gap="2" columns="2">
            <RadioCards.Item value="rc">
              <Flex direction="column" width="100%">
                <Text weight="bold">Continue RC</Text>
                <Text>v{getNewVersion('rc', true)}</Text>
              </Flex>
            </RadioCards.Item>
            <RadioCards.Item value="xrc">
              <Flex direction="column" width="100%">
                <Text weight="bold">Exit RC</Text>
                <Text>v{getNewVersion('xrc')}</Text>
              </Flex>
            </RadioCards.Item>
          </RadioCards.Root>
        </Flex>
        }
      </Flex>
      <Flex direction="column" gap="1" width="100%">
        <Text size="1" as="label" align="left" htmlFor="changes" weight="bold">Describe your changes</Text>
        <TextArea mt="1" id="changes" rows={6} resize="vertical" onChange={(v) => {
          setMessage(v.target.value)
        }} placeholder="- Added Button component &#10;- Changed the primary color token"/>
      </Flex>
      <Flex direction="column" align="start" gap="4" mb="2">
        {links.length > 0 &&
          <Flex gap="2" wrap="wrap">
            {links.map((link, index) => (
              <Tooltip key={index}
                content={<a href={link.url} target="_blank" rel="noreferrer">{link.url}</a>}>
                <Badge color="gray" onClick={() => {
                  removeLink(link.key)
                }}><Link1Icon width={12} height={12}/> {link.label}<Cross1Icon width={12}
                    height={12}/>
                </Badge>
              </Tooltip>
            ))}
          </Flex>}
        <Dialog.Root>
          <Dialog.Trigger>
            <Button variant="ghost"><Link1Icon width={12} height={12}/> Add links</Button>
          </Dialog.Trigger>

          <Dialog.Content maxWidth="450px">
            <Dialog.Title>Add link</Dialog.Title>
            <Flex direction="column" gap="3">
              <Text as="label" size="1">
                Label

                <TextField.Root
                  mt="1"
                  defaultValue=""
                  placeholder="Example link"
                  onChange={e => {
                    setNewLabel(e.target.value)
                  }}
                />
              </Text>
              <Text as="label" size="1">
                URL
                <TextField.Root
                  mt="1"
                  defaultValue=""
                  placeholder="https://example.com"
                  onChange={e => {
                    isValid(e.target.value)
                    setNewUrl(e.target.value)
                  }}
                  onBlur={(e) => {
                    isValid(e.target.value)
                  }}
                  color={!isValidUrl ? 'red' : undefined}
                />
              </Text>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button onClick={addLink} disabled={!isValidUrl || !newUrl}>Save</Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
      <Flex gap="4" direction="column">
        <Button onClick={handleClick} loading={loading} size="3">Commit</Button>
        <Button asChild variant="ghost" color="yellow">
          <a target="_blank" href="https://www.buymeacoffee.com/marcosmoreira" rel="noreferrer">
            <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" width="16" alt="Buy me a coffee"/>
            <Text>Buy me a coffee</Text>
          </a>
        </Button>
      </Flex>
    </Flex>
  )
}

export default CreateVersionSemantic
