import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
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

  return (
    <Box backgroundColor="background">
      <Section>
        <Heading
          as="h1"
          fontWeight="800"
          size="4xl"
          textTransform="capitalize"
          color="onSurface"
        >
          Atlanta Brewery Tours Blog
        </Heading>
        <Text fontSize="xl" fontWeight="500" pt="4" color="onSurface">
          Keep up-to-date with the latest from the Atlanta Brewery Tours team!
        </Text>
      </Section>
      <Section>
        <Heading as="h2" pb="6" size="xl" textTransform="capitalize">
          Recent Posts
        </Heading>
        <Stack spacing="6">
          {data?.blogPosts
            ?.filter(({ status }) => status === 'PUBLISHED')
            .map(({ date, id, title, excerpt, tags, slug }) => (
              <Box key={id}>
                <Card
                  variant="outline"
                  backgroundColor="surface"
                  borderRadius="lg"
                >
                  <CardHeader>
                    <HStack>
                      {tags.map(tag => (
                        <Tag
                          textDecoration="capitalize"
                          key={tag}
                          colorScheme="secondary"
                        >
                          {tag}
                        </Tag>
                      ))}
                    </HStack>
                    <Heading as="h3" size="md" mt={6}>
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
            ))}
        </Stack>
      </Section>
    </Box>
  )
}

export default Blog
