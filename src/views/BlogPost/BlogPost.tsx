import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import NextLink from 'next/link'
import { IoChevronBackOutline } from 'react-icons/io5'
import { useQuery } from 'urql'
import { gql } from '../../__generated__'
import { parse } from '../../lib'
import { BlockRenderer } from './BlockRenderer'

export const BLOG_POST_QUERY = gql(/* GraphQL */ `
  query BlogPost($slug: String!) {
    blogPost: blogPostBySlug(slug: $slug) {
      id
      date
      imageSrc
      title
      slug
      tags
      content
    }
  }
`)

interface BlogPostProps {
  slug: string
}

export const BlogPost = ({ slug }: BlogPostProps) => {
  const [{ data }] = useQuery({
    query: BLOG_POST_QUERY,
    variables: {
      slug,
    },
  })
  const { blogPost = null } = data ?? {}

  if (!blogPost) {
    return null
  }

  const content = parse<ListBlockChildrenResponse>(blogPost.content ?? '')

  return (
    <Container maxW={['container.sm', 'container.sm', '768px']} py="6">
      <Stack align="left" spacing="4">
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
        {blogPost.imageSrc ? (
          <Image
            borderRadius="lg"
            alt={blogPost.title ?? ''}
            src={blogPost.imageSrc ?? ''}
          />
        ) : null}
        <Text color="onSurfaceVariant" fontWeight="bold" fontSize="sm">
          {blogPost.date
            ? new Date(blogPost.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : null}
        </Text>
        <Heading size="xl">{blogPost.title}</Heading>
        {blogPost.tags.length ? (
          <HStack spacing={4}>
            {blogPost.tags.map(tag => (
              <Tag key={tag} colorScheme="secondary">
                {tag}
              </Tag>
            ))}
          </HStack>
        ) : null}
        {content ? (
          <Stack mt={6} spacing="6">
            {content.results.map(block => (
              <BlockRenderer key={block.id} block={block} />
            ))}
          </Stack>
        ) : null}
        {blogPost.content}
      </Stack>
    </Container>
  )
}