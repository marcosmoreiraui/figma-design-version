import { useState } from 'react'
import { Button, Flex, RadioCards, Text } from '@radix-ui/themes'
import dayjs from 'dayjs'
import { ArrowRightIcon } from '@radix-ui/react-icons'

function Type ({ onClick }: { onClick: (v: string) => void }) {
  const [type, setType] = useState<string>('date')
  const date = dayjs().format('MMMM D, YYYY')

  const handleOnClick = async () => {
    onClick(type)
  }

  return (
    <Flex direction="column" gap="4" height="calc(100% - 40px)">
      <Flex direction="column" gap="2" height="100%">
        <Flex direction="column" gap="2">
          <Text size="4" weight="bold" align="left">Versioning type</Text>
          <Text size="1">Choose the versioning type for your project</Text>
        </Flex>
        <Flex>
          <RadioCards.Root defaultValue="date" columns="2" gap="2" onValueChange={(v) => {
            setType(v)
          }}>
            <RadioCards.Item value="date">
              <Flex direction="column" width="100%">
                <Text weight="bold" color="indigo">{date}</Text>
                <Text size="1"><Text weight="bold">Date</Text>. For general projects</Text>
              </Flex>
            </RadioCards.Item>
            <RadioCards.Item value="semantic">
              <Flex direction="column" width="100%">
                <Text weight="bold" color="indigo">v1.2.3</Text>
                <Text size="1">
                  <Text weight="bold">Semantic</Text>. Mostly used for libraries
                </Text>
              </Flex>
            </RadioCards.Item>
          </RadioCards.Root>
        </Flex>
      </Flex>
      <Button style={{ width: '100%' }} onClick={handleOnClick}>Continue <ArrowRightIcon/></Button>
    </Flex>
  )
}

export default Type
