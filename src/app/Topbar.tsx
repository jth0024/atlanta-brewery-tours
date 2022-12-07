import {
  Button,
  ButtonGroup,
  Flex,
  Image,
  Link,
  Spacer,
} from '@chakra-ui/react'
import NextLink from 'next/link'

const logoSrc = '/images/logo-bug-500-x-500.png'

export const Topbar = ({ ...rest }) => (
  <Flex
    as="header"
    backgroundColor="white"
    height="84px"
    paddingLeft="4"
    paddingRight="4"
    paddingTop="0"
    paddingBottom="0"
    justifyContent="space-between"
    alignItems="center"
    {...rest}
  >
    <Image
      objectFit="contain"
      src={logoSrc}
      alt="Atlanta Brewery Tours Logo"
      width="60px"
      borderRadius="full"
    />
    <Spacer display={['block', 'none']} height="2" flex="0 0 auto" />
    <Flex alignItems="center" marginLeft={[0, 'auto']} as="nav">
      <Link as={NextLink} href="/about" fontWeight="bold">
        Blog
      </Link>
      <Spacer width={4} />
      <Link as={NextLink} href="/donate" fontWeight="bold">
        Tours
      </Link>
      <Spacer width={4} />
      <Button colorScheme="orange">Buy Us a Beer</Button>
    </Flex>
  </Flex>
)
