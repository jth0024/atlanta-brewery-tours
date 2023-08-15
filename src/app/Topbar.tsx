import { Button, Flex, Link, Spacer } from '@chakra-ui/react'
import NextLink from 'next/link'
import { VENMO_PROFILE_URL } from './constants'
import { Logo } from './Logo'

export const Topbar = ({ ...rest }) => (
  <Flex
    as="nav"
    backgroundColor="background"
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
      <Logo as={NextLink} href="/" height="100%" />
      <Spacer display={['block', 'none']} height="2" flex="0 0 auto" />
      <Flex alignItems="center" marginLeft={[0, 'auto']} as="nav">
        <Link as={NextLink} href="/blog" fontWeight="bold">
          Blog
        </Link>
        <Spacer width={4} />
        <Link as={NextLink} href="/#tours" fontWeight="bold">
          Tours
        </Link>
        <Spacer width={4} />
        <Button
          as="a"
          target="_blank"
          colorScheme="orange"
          href={VENMO_PROFILE_URL}
          rel="noopener noreferrer"
        >
          Buy Us a Beer
        </Button>
      </Flex>
    </Flex>
  </Flex>
)
