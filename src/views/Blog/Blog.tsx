import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'
import { capitalize } from 'lodash'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { useQuery } from 'urql'
import { gql } from '../../__generated__'
import { Section } from '../../lib'

export const BLOG_QUERY = gql(/* GraphQL */ `
  query Blog {
    blogPosts {
      date
      excerpt
      id
      imageSrc
      status
      slug
      tags
      title
    }
  }
`)

export const Blog = () => {
  const [{ data }] = useQuery({ query: BLOG_QUERY })
  const { query } = useRouter()
  const allowDrafts = Boolean(query?.preview)
  const filteredPosts =
    (allowDrafts
      ? data?.blogPosts
      : data?.blogPosts?.filter(({ status }) => status === 'PUBLISHED')) ?? []

  return (
    <Box backgroundColor="background">
      <Section
        filled
        alignItems="center"
        display="flex"
        justifyContent="center"
        pt={24}
        pb={20}
      >
        <Heading
          as="h1"
          fontWeight="800"
          size="sm"
          textTransform="capitalize"
          textAlign="center"
          color="primary"
        >
          Blog
        </Heading>
        <Heading
          as="h2"
          fontSize="xl"
          fontWeight="800"
          pt="4"
          color="onSurface"
          textAlign="center"
        >
          The{' '}
          <Box as="span" color="primary">
            <i>latest</i>
          </Box>{' '}
          about Atlanta Brewery Tours!
        </Heading>
      </Section>
      <Section>
        {filteredPosts.length ? (
          <Heading as="h2" pb="6" fontSize="xl" textTransform="capitalize">
            Recent Posts
          </Heading>
        ) : null}
        <Stack spacing="6">
          {filteredPosts.length ? (
            filteredPosts.map(
              ({ date, id, title, excerpt, tags, slug, status }) => (
                <Box key={id}>
                  <Card
                    variant="outline"
                    backgroundColor="surface"
                    borderRadius="lg"
                  >
                    <CardHeader>
                      <HStack spacing={2}>
                        {status === 'DRAFT' ? (
                          <Tag colorScheme="tertiary">Draft</Tag>
                        ) : null}
                        {tags.map(tag => (
                          <Tag key={tag} colorScheme="secondary">
                            {capitalize(tag)}
                          </Tag>
                        ))}
                      </HStack>
                      <Heading as="h3" fontSize="md" mt={6}>
                        {title}
                      </Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>{excerpt}</Text>
                    </CardBody>
                    <CardFooter
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text
                        color="onSurfaceVariant"
                        fontWeight="bold"
                        fontSize="sm"
                        mr="auto"
                      >
                        {date
                          ? new Date(date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : null}
                      </Text>
                      <Button
                        as={NextLink}
                        href={`/blog/${slug}`}
                        colorScheme="primary"
                        variant="link"
                        rightIcon={<IoChevronForwardOutline />}
                        ml="auto"
                      >
                        Read More
                      </Button>
                    </CardFooter>
                  </Card>
                </Box>
              ),
            )
          ) : (
            <Center minHeight="50vh">
              <Box mx="auto" textAlign="center">
                <Heading as="h3" size="md">
                  No posts found.
                </Heading>
                <Text>
                  Hmm, we&apos;re having trouble loading blog posts right now.
                </Text>
              </Box>
            </Center>
          )}
        </Stack>
      </Section>
    </Box>
  )
}

export default Blog
