import { Center, Container, Heading, Link, Stack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

const BlogPage = () => (
  <Center height="75vh">
    <Container>
      <Stack spacing="6" textAlign="center">
        <Heading size="xl" fontWeight="800">
          Coming soon!
        </Heading>
        <Text>
          We&apos;re working hard on our new blog! While we&apos;re working on
          it, why don&apos;t you take a look at some of our
          {` `}
          <Link
            textDecoration="underline"
            color="orange.500"
            as={NextLink}
            href="/#tours"
          >
            Tours
          </Link>
          ?
        </Text>
      </Stack>
    </Container>
  </Center>
)

export default BlogPage
