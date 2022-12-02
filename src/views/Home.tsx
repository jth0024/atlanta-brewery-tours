import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Spacer,
  Stack,
  StackDivider,
  Text,
  Wrap,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import { useQuery } from 'urql'
import { gql } from '../__generated__'
import { Tour } from './Tour'

export const HOME_QUERY = gql(/* GraphQL */ `
  query Home {
    neighborhoods {
      id
      imageSrc
      name
      description
      slug
      regions {
        id
      }
    }
    tours {
      id
      distance
      description
      breweries {
        id
      }
      name
      isFeatured
    }
    regions {
      id
      name
    }
  }
`)

export const Home = () => {
  const [{ data }] = useQuery({ query: HOME_QUERY })
  const { neighborhoods = [], tours = [], regions = [] } = data ?? {}

  const featuredTours = tours.filter((t) => t.isFeatured)

  const [filters, setFilters] = useState<string[]>([])
  const matchingNeighborhoods =
    filters.length > 0
      ? neighborhoods.filter((neighborhood) => {
          const regionIds = neighborhood.regions.map((r) => r.id)
          return filters.some((filter) => regionIds.includes(filter))
        })
      : neighborhoods

  return (
    <div>
      <Box
        as="iframe"
        src="https://snazzymaps.com/embed/413288"
        width="100%"
        height={['300px', '500px']}
        border="none"
        title="Atlanta Brewery Tours Map"
      />
      <Divider orientation="horizontal" />
      <Container
        maxW={['container.sm', 'container.sm', '768px']}
        padding="0px"
        py="6"
      >
        <Heading as="h2" py="6" px="4" size="lg" textTransform="capitalize">
          Featured Tours
        </Heading>
        <Card variant="filled">
          <CardBody>
            <Wrap>
              {featuredTours.map((tour) => (
                <Box maxWidth="320px" key={tour.id}>
                  <Tour
                    name={tour.name ?? ''}
                    description={tour.description ?? ''}
                    distance={tour.distance ?? 0}
                    breweries={tour.breweries.length}
                  />
                </Box>
              ))}
            </Wrap>
          </CardBody>
        </Card>
        <Spacer height="6" />
        <Heading as="h2" py="6" px="4" size="lg" textTransform="capitalize">
          Explore Neighborhoods
        </Heading>
        <Wrap px="3" pb="8">
          {[...regions.values()].map((region) => (
            <Button
              key={region.id}
              borderRadius="full"
              colorScheme={filters.includes(region.id) ? 'orange' : 'gray'}
              variant={filters.includes(region.id) ? 'solid' : 'outline'}
              cursor="pointer"
              onClick={() => {
                setFilters((prev) => {
                  if (prev.includes(region.id)) {
                    return prev.filter((f) => f !== region.id)
                  }
                  return prev.concat(region.id)
                })
              }}
            >
              {region.name}
            </Button>
          ))}
        </Wrap>
        <Stack px={4} spacing={6} divider={<StackDivider />}>
          {matchingNeighborhoods.length === 0 && (
            <Center pt="32">
              <Stack align="center" spacing={4}>
                <Text fontSize="lg" color="gray.600">
                  Darn! There aren&apos;t any neighborhoods matching your
                  filters.&nbsp;
                </Text>
                <Button
                  colorScheme="orange"
                  variant="link"
                  onClick={() => setFilters([])}
                >
                  Remove Filters
                </Button>
              </Stack>
            </Center>
          )}
          {matchingNeighborhoods.map(
            ({ name, id, description, imageSrc, slug }) => (
              <Card key={id} variant="unstyled">
                <CardBody>
                  <Image
                    src={imageSrc ?? ''}
                    alt={`Image of ${name}`}
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading as="h3" size="md" textTransform="capitalize">
                      {name}
                    </Heading>
                    <Text>{description}</Text>
                  </Stack>
                </CardBody>
                <CardFooter justify="flex-end">
                  <Flex justifyContent="flex-end" mt={6}>
                    <Link href={`/neighborhoods/${slug}`}>
                      <Button colorScheme="gray" ml="auto">
                        View Tours
                      </Button>
                    </Link>
                  </Flex>
                </CardFooter>
              </Card>
            ),
          )}
        </Stack>
      </Container>
    </div>
  )
}
