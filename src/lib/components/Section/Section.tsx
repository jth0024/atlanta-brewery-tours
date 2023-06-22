import { Box, BoxProps, Container } from '@chakra-ui/react'

interface SectionProps extends BoxProps {
  children: React.ReactNode
  filled?: boolean
  size?: string | { [key: string]: string }
}

export const Section = ({
  children,
  filled = false,
  size = { base: 'sm', lg: 'md' },
  ...boxProps
}: SectionProps) => (
  <Box
    as="section"
    backgroundColor={filled ? 'background' : 'surface'}
    py="12"
    px="4"
    {...boxProps}
  >
    <Container size={size} padding="0px">
      {children}
    </Container>
  </Box>
)
