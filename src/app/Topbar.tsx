import { Button, Flex, Image, Link, Spacer } from '@chakra-ui/react'
import NextLink from 'next/link'

const logoSrc = '/images/logo-bug-500-x-500.png'

export const Topbar = ({ ...rest }) => (
  <Flex
    as="header"
    backgroundColor="white"
    height="96px"
    px="4"
    py="2"
    justifyContent="stretch"
    alignItems="stretch"
    overflow="hidden"
    {...rest}
  >
    <Flex
      flex="1 1 auto"
      justifyContent="space-between"
      alignItems="center"
      overflow="hidden"
    >
      <Image
        objectFit="contain"
        src={logoSrc}
        alt="Atlanta Brewery Tours Logo"
        height="100%"
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
  </Flex>
)
