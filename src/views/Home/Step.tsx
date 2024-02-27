import { Heading, Icon, Stack, Text } from '@chakra-ui/react'
import { ComponentProps } from 'react'

type StepProps = {
  title: string
  description: string
  icon: ComponentProps<typeof Icon>['as']
} & ComponentProps<typeof Stack>

export const Step = ({ description, icon, title, ...rest }: StepProps) => (
  <Stack
    spacing="4"
    alignItems="center"
    justifyContent="flex-start"
    direction="column"
    backgroundColor="surface"
    px={{ base: 0, sm: '4' }}
    {...rest}
  >
    <Icon
      flex="0 0 auto"
      as={icon}
      fontSize={{ base: '5xl', sm: '5xl' }}
      color="currentcolor"
    />
    <Stack spacing="2" mt="0.5">
      <Heading
        as="h3"
        fontWeight="800"
        size={{ base: 'sm', sm: 'md' }}
        textAlign="center"
      >
        {title}
      </Heading>
      <Text textAlign="center" fontSize="md">
        {description}
      </Text>
    </Stack>
  </Stack>
)
