import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Image,
  Link,
  Skeleton,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import { capitalize } from 'lodash'
import Head from 'next/head'
import NextLink from 'next/link'
import { IoChevronBackOutline } from 'react-icons/io5'
import { useQuery } from 'urql'
import { parse } from '../../lib'
import { gql } from '../../schema/client'
import { BlockRenderer } from './BlockRenderer'

export const BLOG_POST_QUERY = gql(/* GraphQL */ `
  query BlogPost($slug: String!) {
    blogPost: blogPostBySlug(slug: $slug) {
      content
      date
      excerpt
      id
      imageSrc
      imageAltText
      slug
      status
      title
      tags
    }
  }
`)

interface BlogPostProps {
  slug: string
}

export const BlogPost = ({ slug }: BlogPostProps) => {
  const [{ data, fetching }] = useQuery({
    query: BLOG_POST_QUERY,
    variables: {
      slug,
    },
  })
  const { blogPost = null } = data ?? {}
  const backButton = (
    <Button
      as={NextLink}
      colorScheme="primary"
      href="/blog"
      variant="link"
      marginRight="auto"
      leftIcon={<IoChevronBackOutline />}
    >
      Back to Blog
    </Button>
  )

  if (fetching) {
    return (
      <Container maxW={['container.sm', 'container.sm', '768px']} py="6">
        {backButton}
        <Stack spacing="4" alignItems="flex-start" my={6}>
          <Skeleton height="50px" width="75%" />
          <Skeleton height="50vh" width="100%" />
        </Stack>
      </Container>
    )
  }

  if (!blogPost) {
    return (
      <Container maxW={['container.sm', 'container.sm', '768px']} py="6">
        {backButton}
        <Center minHeight="70vh">
          <Box mx="auto" textAlign="center">
            <Heading as="h1" size="md">
              404 Not Found
            </Heading>
            <Text pt={4}>
              Hmm, we&apos;re having trouble finding that blog post.
              <br />
              Would you like to{' '}
              <Link color="primary" as={NextLink} href="/blog">
                go back?
              </Link>
            </Text>
          </Box>
        </Center>
      </Container>
    )
  }

  const content = parse<ListBlockChildrenResponse>(blogPost.content ?? '')
  const titlePrefix = blogPost.title ? `${blogPost.title} | }` : ''

  return (
    <Container maxW={['container.sm', 'container.sm', '768px']} py="6">
      <Head>
        <meta name="title" content={blogPost.title ?? ''} />
        <meta property="og:title" content={blogPost?.title ?? ''} />
        <meta property="twitter:title" content={blogPost?.title ?? ''} />
        <meta name="description" content={blogPost?.excerpt ?? ''} />
        <meta property="og:description" content={blogPost?.excerpt ?? ''} />
        <title>{`${titlePrefix}Blog | Atlanta Brewery Tours`}</title>
      </Head>
      <Stack align="left" spacing="4">
        {backButton}
        <Text color="onSurfaceVariant" fontWeight="bold" fontSize="sm">
          {blogPost.date
            ? new Date(blogPost.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : null}
        </Text>
        <Heading as="h1" size="xl">
          {blogPost.title}
        </Heading>
        {blogPost.tags.length ? (
          <HStack spacing={2}>
            {blogPost.status === 'DRAFT' ? (
              <Tag colorScheme="tertiary">Draft</Tag>
            ) : null}
            {blogPost.tags.map(tag => (
              <Tag key={tag} colorScheme="secondary">
                {capitalize(tag)}
              </Tag>
            ))}
          </HStack>
        ) : null}
        {blogPost.imageSrc ? (
          <Image
            borderRadius="lg"
            alt={
              blogPost.imageAltText ??
              `Header image for ${blogPost.title ?? ''} blog post`
            }
            src={blogPost.imageSrc ?? ''}
          />
        ) : null}
        {content ? (
          <Stack mt={6} spacing="6">
            {content.results.map(block => (
              <BlockRenderer key={block.id} block={block} />
            ))}
          </Stack>
        ) : null}
      </Stack>
    </Container>
  )
}
