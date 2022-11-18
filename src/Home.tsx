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
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { neighborhoods, regions, Region, Neighborhood, tours } from './api'
import { Tour } from './Tour'

const filterByRegion = (neighborhoods: Neighborhood[], regions: Region[]) =>
  regions.length === 0
    ? neighborhoods
    : neighborhoods.filter(({ regionIds }) =>
        regions.some((r) => regionIds.includes(r.id)),
      )

const getFeaturedTours = () => [...tours.values()].filter((t) => t.isFeatured)

export const Home = () => {
  const [filters, setFilters] = useState<Region[]>([])
  const results = filterByRegion([...neighborhoods.values()], filters)

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
              {getFeaturedTours().map((tour) => (
                <Box maxWidth="320px">
                  <Tour tour={tour} />
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
              colorScheme={filters.includes(region) ? 'orange' : 'gray'}
              variant={filters.includes(region) ? 'solid' : 'outline'}
              cursor="pointer"
              onClick={() => {
                setFilters((prev) => {
                  if (prev.includes(region)) {
                    return prev.filter((f) => f !== region)
                  }
                  return prev.concat(region)
                })
              }}
            >
              {region.name}
            </Button>
          ))}
        </Wrap>
        <Stack px={4} spacing={6} divider={<StackDivider />}>
          {results.length === 0 && (
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
          {results.map(({ name, id, description, imageSrc, slug }) => (
            <Card key={id} variant="unstyled">
              <CardBody>
                <Image
                  src={imageSrc}
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
                  <Link to={`/neighborhoods/${slug}`}>
                    <Button colorScheme="gray" ml="auto">
                      View Tours
                    </Button>
                  </Link>
                </Flex>
              </CardFooter>
            </Card>
          ))}
        </Stack>
      </Container>
    </div>
  )
}
