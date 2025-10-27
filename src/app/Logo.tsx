import { Box, Image } from '@chakra-ui/react'

const logoSrc = '/images/logo-bug-500-x-500.png'

export const Logo = ({ ...props, height, width }) => (
  <Box {...props} backgroundColor="background" borderRadius="full" height={height} width={width}>
    <Image
      objectFit="contain"
      src={logoSrc}
      alt="Atlanta Brewery Tours Logo"
      borderRadius="full"
      height={height}
      width={width}
    />
  </Box>
)
