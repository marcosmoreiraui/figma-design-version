import React, { useState } from 'react'
import { Badge, Button, Dialog, Flex, Select, Text, TextArea, TextField, Tooltip } from '@radix-ui/themes'
import { Cross1Icon, Link1Icon } from '@radix-ui/react-icons'

function CreateVersionDate ({
  loading,
  onClick,
  pages,
  selectedPage
}: {
  loading: boolean
  onClick: (page: string, message: string, links: Array<{ key: string, label?: string, link?: string }>) => void
  pages: any
  selectedPage: string
}) {
  const [links, setLinks] = useState<Array<{
    key: string
    label?: string
    url?: string
  }>>([])
  const [newLabel, setNewLabel] = useState('') // El label del nuevo link.
  const [newUrl, setNewUrl] = useState('') // El URL del nuevo link.
  const [message, setMessage] = useState('')
  const [isValidUrl, setValidUrl] = useState(true)
  const [page, setPage] = useState(selectedPage)

  const handleClick = async () => {
    onClick && onClick(page, message, links)
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

  return (
    <Flex direction="column" gap="4" justify="between" height="calc(100% - 40px)">
      <Flex direction="column" width="100%" align="start" gap="4">
        <Text size="4" weight="bold" align="left">Commit your changes</Text>
        <Flex direction="column" gap="2">
          <Text as="label" size="1" weight="bold">Page</Text>
          <Select.Root defaultValue={selectedPage} onValueChange={setPage}>
            <Select.Trigger/>
            <Select.Content>
              {pages.map((page: any) => (
                <Select.Item key={page.id} value={page.id}>{page.name}</Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>
        <Flex direction="column" gap="2" width="100%">
          <Text size="1" as="label" align="left" htmlFor="changes" weight="bold">Describe your changes</Text>
          <TextArea mt="1" id="changes" rows={6} resize="vertical" onChange={(v) => {
            setMessage(v.target.value)
          }} placeholder="- Added Button component &#10;- Changed the primary color token"/>
        </Flex>
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
            <Button variant="ghost">Add links</Button>
          </Dialog.Trigger>

          <Dialog.Content maxWidth="450px">
            <Dialog.Title><Link1Icon width={12} height={12}/> Add link</Dialog.Title>
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

export default CreateVersionDate
