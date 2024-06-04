import { useState } from 'react'
import { Button, Flex, Text, TextField } from '@radix-ui/themes'

function CreatePage ({ onClick }: { onClick: (v: string) => void }) {
  const [name, setName] = useState<string>('Changelog')
  const handleOnClick = async () => {
    onClick(name)
  }
  return (
    <Flex direction="column" gap="4">
      <Flex direction="column" gap="1">
        <Text size="4" weight="bold">Create your changelog page</Text>
      </Flex>
      <Flex direction="column" gap="3">
        <Flex direction="column" gap="1">
          <Text size="1" as="label" align="left" htmlFor="pageName" weight="bold">Page
						name</Text>
          <TextField.Root placeholder="Page name" id="pageName" defaultValue="Changelog"
            onChange={(v) => {
              setName(v.target.value)
            }}></TextField.Root>
        </Flex>
        <Button color="violet" onClick={handleOnClick}>Create changelog
					page</Button>
      </Flex>
    </Flex>
  )
}

export default CreatePage
