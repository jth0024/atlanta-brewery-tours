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
  Image,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  Wrap,
} from '@chakra-ui/react'
import { capitalize, intersection } from 'lodash'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
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
  const heroSrc = useColorModeValue(
    '/images/blog-hero-light.png',
    '/images/blog-hero-dark.png',
  )
  const [{ data }] = useQuery({ query: BLOG_QUERY })
  const { query } = useRouter()
  const allowDrafts = Boolean(query?.preview)
  const posts =
    (allowDrafts
      ? data?.blogPosts
      : data?.blogPosts?.filter(({ status }) => status === 'PUBLISHED')) ?? []

  const [filters, setFilters] = useState<string[]>([])
  const allTags = Array.from(new Set<string>(posts.flatMap(post => post.tags)))

  const filteredPosts = filters.length
    ? posts.filter(post => intersection(filters, post.tags).length)
    : posts

  return (
    <Box backgroundColor="background">
      <Box position="relative">
        <Image
          src={heroSrc}
          objectFit="cover"
          objectPosition="center"
          alt="Blog"
          height="100%"
          width="100%"
          position="absolute"
          top={0}
        />
        <Box
          bgGradient="linear(to-b, background, neutralLight)"
          position="absolute"
          height="100%"
          width="100%"
          top="0"
          opacity="0.9"
        />
        <Section
          filled
          bgColor="transparent"
          borderBottom="1px"
          borderColor="border"
          position="relative"
          zIndex={1}
          pt={32}
          pb={36}
        >
          <Box height="topbarHeight" />
          <Heading
            as="h1"
            fontWeight="800"
            size="4xl"
            textTransform="capitalize"
            color="onSurface"
          >
            Blog
          </Heading>
          <Text fontSize="xl" pt="4" color="onSurface">
            The{' '}
            <b>
              <i>latest</i>
            </b>{' '}
            updates about Atlanta&apos;s craft beer scene, shared by the Atlanta
            Brewery Tours team!
          </Text>
        </Section>
      </Box>
      <Section>
        {posts.length ? (
          <Heading as="h2" pb="6" size="xl" textTransform="capitalize">
            Recent Posts
          </Heading>
        ) : null}
        <Wrap pb="8">
          {allTags.map(tag => (
            <Button
              key={tag}
              borderRadius="full"
              colorScheme={filters.includes(tag) ? 'primary' : 'gray'}
              variant={filters.includes(tag) ? 'solid' : 'outline'}
              cursor="pointer"
              onClick={() => {
                setFilters(prev => {
                  if (prev.includes(tag)) {
                    return prev.filter(f => f !== tag)
                  }
                  return prev.concat(tag)
                })
              }}
            >
              {capitalize(tag)}
            </Button>
          ))}
        </Wrap>
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
