import React, { useState } from 'react'
import { Badge, Button, Dialog, Flex, Text, TextArea, TextField, Tooltip } from '@radix-ui/themes'
import { Cross1Icon, Link1Icon } from '@radix-ui/react-icons'

function CreateVersionDate ({
  loading,
  onClick
}: {
  loading: boolean
  onClick: (message: string, links: Array<{ key: string, label?: string, link?: string }>) => void
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

  const handleClick = async () => {
    onClick && onClick(message, links)
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
    <Flex direction="column" align="start" justify="start" gap="4">
      <Text size="4" weight="bold" align="left">Commit your changes</Text>
      <Flex direction="column" gap="1" width="100%">
        <Text size="1" as="label" align="left" htmlFor="changes" weight="bold">Describe your changes</Text>
        <TextArea mt="1" id="changes" rows={5} onChange={(v) => {
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
      <Button mt="4" onClick={handleClick} loading={loading} style={{ width: '100%' }}>Commit</Button>
    </Flex>
  )
}

export default CreateVersionDate
