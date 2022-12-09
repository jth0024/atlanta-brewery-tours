import { Box, Image } from '@chakra-ui/react'

const logoSrc = '/images/logo-bug-500-x-500.png'

export const Logo = ({ ...props }) => (
  <Box {...props}>
    <Image
      objectFit="contain"
      src={logoSrc}
      alt="Atlanta Brewery Tours Logo"
      height="100%"
      borderRadius="full"
    />
  </Box>
)
