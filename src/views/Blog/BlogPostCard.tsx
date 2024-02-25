import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  HStack,
  Image,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'
import { capitalize } from 'lodash'
import NextLink from 'next/link'
import { IoChevronForwardOutline } from 'react-icons/io5'

interface BlogPostCardProps {
  blogPost: {
    date: string
    excerpt: string
    id: string
    imageSrc?: string | null
    imageAltText?: string | null
    slug: string
    status: string
    tags: string[]
    title: string
  }
}

export function BlogPostCard({ blogPost }: BlogPostCardProps) {
  const {
    date,
    excerpt,
    id,
    imageSrc,
    imageAltText,
    slug,
    status,
    tags,
    title,
  } = blogPost
  return (
    <Box key={id}>
      <Card variant="outline" backgroundColor="surface" borderRadius="lg">
        <Stack direction="row" alignItems="flex-start">
          {imageSrc ? (
            <Image
              borderRadius="lg"
              alt={title ?? ''}
              src={imageSrc ?? ''}
              display={{ base: 'none', md: 'block' }}
              boxSize="200px"
              ml="5"
              my="5"
            />
          ) : null}
          <div>
            <CardBody>
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
              <Text mt={{ base: '5', md: '4' }}>{excerpt}</Text>
              {imageSrc ? (
                <Image
                  mt={{ base: '6', md: '4' }}
                  display={{ md: 'none' }}
                  borderRadius="lg"
                  alt={
                    imageAltText ?? `Header image for ${title ?? ''} blog post`
                  }
                  src={imageSrc ?? ''}
                />
              ) : null}
            </CardBody>
            <CardFooter justifyContent="space-between" alignItems="center">
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
          </div>
        </Stack>
      </Card>
    </Box>
  )
}
