import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  useTheme,
  Wrap,
} from '@chakra-ui/react'
import { capitalize, intersection } from 'lodash'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'urql'
import { gql } from '../../__generated__'
import { Section } from '../../lib'
import { BlogPostCard } from './BlogPostCard'

export const BLOG_QUERY = gql(/* GraphQL */ `
  query Blog {
    blogPosts {
      date
      excerpt
      id
      imageSrc
      imageAltText
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

  const theme = useTheme()
  const { topbarHeight } = theme.sizes

  return (
    <Box
      backgroundColor="background"
      position="relative"
      top={`-${topbarHeight}`}
    >
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
          bgGradient="linear(to-b, neutralLight, background)"
          position="absolute"
          height="100%"
          width="100%"
          top="0"
          opacity="0.9"
        />
        <Section
          filled
          bgColor="transparent"
          position="relative"
          zIndex={1}
          pt={32}
          pb={36}
        >
          <Heading
            as="h1"
            fontWeight="800"
            size="4xl"
            textTransform="capitalize"
            color="onSurface"
            mt={topbarHeight}
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
            filteredPosts.map(post => (
              <BlogPostCard key={post.id} blogPost={post} />
            ))
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
