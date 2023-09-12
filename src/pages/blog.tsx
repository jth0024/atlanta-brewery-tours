import { Center, Container, Heading, Link, Stack, Text } from '@chakra-ui/react'
import Head from 'next/head'
import NextLink from 'next/link'

const BlogPage = () => (
  <>
    <Head>
      <title>Blog | Atlanta Brewery Tours</title>
      <link rel="canonical" href="https://www.atlantabrewerytours.com/blog" />
    </Head>
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
              color="primary"
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
  </>
)

export default BlogPage
