import { ChevronRightIcon } from '@chakra-ui/icons'
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
import { useQuery } from 'urql'
import { gql } from '../../__generated__'
import { Section } from '../../lib'

export const BLOG_QUERY = gql(/* GraphQL */ `
  query Blog {
    blogPosts {
      id
      imageSrc
      excerpt
      title
      content
      slug
      tags
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
          {data?.blogPosts?.map(({ id, title, excerpt, tags, slug }) => (
            <Box key={id}>
              <Card
                variant="outline"
                backgroundColor="surface"
                borderRadius="lg"
              >
                <CardHeader>
                  <HStack>
                    {tags.map(tag => (
                      <Tag key={tag} colorScheme="secondary">
                        {tag}
                      </Tag>
                    ))}
                  </HStack>
                  <Heading as="h3" size="sm" mt={6}>
                    {title}
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text>{excerpt}</Text>
                </CardBody>
                <CardFooter justifyContent="flex-end">
                  <Button
                    as={NextLink}
                    href={`/blog/${slug}`}
                    colorScheme="secondary"
                    variant="ghost"
                    rightIcon={<ChevronRightIcon />}
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
