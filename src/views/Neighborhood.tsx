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
import { useQuery } from 'urql'
import { gql } from '../__generated__'
import { Tour } from './Tour'

export const NEIGHBORHOOD_QUERY = gql(/* GraphQL */ `
  query Neighborhood($slug: String!) {
    neighborhoods(filter: { slug: $slug }) {
      id
      imageSrc
      name
      slug
    }
    tours {
      id
      name
      distance
      description
      breweries {
        id
      }
      neighborhood {
        id
      }
    }
  }
`)

interface NeighborhoodProps {
  slug: string
}

export const Neighborhood = ({ slug }: NeighborhoodProps) => {
  const [{ data }] = useQuery({
    query: NEIGHBORHOOD_QUERY,
    variables: {
      slug,
    },
  })
  const { neighborhoods = [], tours = [] } = data ?? {}
  const neighborhood = neighborhoods[0]

  if (!neighborhood) {
    return null
  }

  const matchingTours = tours.filter(
    (tour) => tour?.neighborhood?.id === neighborhood.id,
  )

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
          alt={neighborhood.name ?? ''}
          src={neighborhood.imageSrc ?? ''}
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
          <Tour
            key={tour.id}
            name={tour.name ?? ''}
            breweries={tour.breweries.length}
            distance={tour.distance ?? 0}
            description={tour.description ?? ''}
          />
        ))}
      </Stack>
    </Container>
  )
}
