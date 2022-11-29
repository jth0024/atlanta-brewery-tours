import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Container,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { neighborhoods, tours } from '../api'
import { Tour } from './Tour'

interface NeighborhoodProps {
  slug: string
}

export const Neighborhood = ({ slug }: NeighborhoodProps) => {
  const neighborhood = [...neighborhoods.values()].find((n) => n.slug === slug)

  if (!neighborhood) {
    return null
  }

  const matchingTours = [...tours.values()].filter(
    (tour) => tour.neighborhoodId === neighborhood.id,
  )

  console.log(neighborhood)

  return (
    <Container maxW={['container.sm', 'container.sm', '768px']} py="6">
      <Stack align="left" spacing="6">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={NextLink} href="/">
              Neighborhoods
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage isLastChild>
            <BreadcrumbLink>{neighborhood.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Image
          borderRadius="lg"
          alt={neighborhood.name}
          src={neighborhood.imageSrc}
        />
        <Heading size="lg">{`${neighborhood.name} Tours`}</Heading>
        {matchingTours.length === 0 && (
          <Center pt="32">
            <Text align="center" fontSize="lg" color="gray.600">
              Darn! There aren&apos;t any tours in this neighborhood yet.
              <br />
              View more{' '}
              <Link color="orange.500" as={NextLink} href="/">
                neighborhoods
              </Link>
              .
            </Text>
          </Center>
        )}
        {matchingTours.map((tour) => (
          <Tour key={tour.id} tour={tour} />
        ))}
      </Stack>
    </Container>
  )
}
