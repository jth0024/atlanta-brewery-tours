import { Circle, Heading, Stack } from '@chakra-ui/react'

interface StepProps {
  description: string
  order: number
}

export const Step = ({ description, order }: StepProps) => (
  <Stack
    spacing="4"
    alignItems="center"
    justifyContent={{ base: 'center', sm: 'center' }}
    direction={{ base: 'column', sm: 'column' }}
  >
    <Circle
      size="12"
      padding="6"
      borderRadius="full"
      backgroundColor="gray.100"
      flex="0 0 auto"
    >
      <Heading size="xl">{order}</Heading>
    </Circle>
    <Heading
      as="h3"
      fontWeight="800"
      size={{ base: 'xs', sm: 'sm' }}
      textTransform="capitalize"
    >
      {description}
    </Heading>
  </Stack>
)
