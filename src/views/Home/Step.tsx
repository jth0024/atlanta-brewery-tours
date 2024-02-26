import { Heading, Icon, Stack } from '@chakra-ui/react'
import { ComponentProps } from 'react'

type StepProps = {
  description: string
  // order: number
  icon: ComponentProps<typeof Icon>['as']
} & ComponentProps<typeof Stack>

export const Step = ({ description, icon, ...rest }: StepProps) => (
  <Stack
    spacing="4"
    alignItems="center"
    justifyContent={{ base: 'center', sm: 'center' }}
    direction={{ base: 'column', sm: 'column' }}
    backgroundColor="surfaceVariant"
    padding="4"
    borderRadius="lg"
    color="onSurfaceVariant"
    {...rest}
  >
    <Icon flex="0 0 auto" as={icon} fontSize="3xl" color="currentcolor" />
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
