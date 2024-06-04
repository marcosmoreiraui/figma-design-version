import { useState } from 'react'
import { Button, Flex, Select, Text } from '@radix-ui/themes'

function SelectPage ({ onClick, pages }: { onClick: (v: string) => void, pages: PageNode[] }) {
  const [id, setId] = useState<string>(pages[0].id)

  const handleOnClick = async () => {
    onClick(id)
  }

  return (
    <Flex direction="column" gap="4" height="calc(100% - 40px)">
      <Flex direction="column" gap="1">
        <Text size="4" weight="bold">Create your changelog page</Text>
        <Text size="2">We add every change here. If you have a changelog, we can continue from your existing one
                    without losing any history.</Text>
      </Flex>
      <Flex direction="column" justify="between" gap="3" height="100%">
        <Flex direction="column" gap="2">
          <Text size="1" as="label" align="left" htmlFor="pageName" weight="bold">Select page</Text>
          <Select.Root defaultValue={pages[0].id} onValueChange={setId}>
            <Select.Trigger/>
            <Select.Content>
              <Select.Group>
                {pages.map((page) => (
                  <Select.Item key={page.id} value={page.id}>{page.name}</Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>
        <Button color="violet" onClick={handleOnClick}>Save</Button>
      </Flex>
    </Flex>
  )
}

export default SelectPage
