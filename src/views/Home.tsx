import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Box,
  BoxProps,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Circle,
  Container,
  Divider,
  Flex,
  Heading,
  Highlight,
  HStack,
  IconButton,
  Image,
  OrderedList,
  Spacer,
  Square,
  Stack,
  StackDivider,
  Text,
  Wrap,
} from '@chakra-ui/react'
import Head from 'next/head'
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

interface SectionProps extends BoxProps {
  children: React.ReactNode
  filled?: boolean
}

const Section = ({ children, filled, ...boxProps }: SectionProps) => (
  <Box
    as="section"
    backgroundColor={filled ? 'gray.100' : 'white'}
    py="12"
    px="4"
    {...boxProps}
  >
    <Container maxW={['container.sm', 'container.sm', '768px']} padding="0px">
      {children}
    </Container>
  </Box>
)

interface StepProps {
  description: string
  order: number
}

const Step = ({ description, order }: StepProps) => (
  <Stack
    spacing={{ base: '8', sm: '4' }}
    alignItems="center"
    justifyContent={{ base: 'flex-start', sm: 'center' }}
    direction={{ base: 'row', sm: 'column' }}
  >
    <Circle
      size="12"
      padding="6"
      borderRadius="full"
      backgroundColor="gray.100"
      flex="0 0 auto"
    >
      <Heading size="xl">{order}</Heading>
    </Circle>
    <Heading fontWeight="bolder" size="md" textTransform="capitalize">
      {description}
    </Heading>
  </Stack>
)

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
      <Section textAlign="left" py="16">
        <Heading as="h1" fontWeight="800" size="4xl" textTransform="capitalize">
          Atlanta Brewery Tours
        </Heading>
        <Text fontSize="xl" fontWeight="500" pt="4">
          Atlanta Brewery Tours is a{' '}
          <i>
            <b>free</b>
          </i>{' '}
          self-guided tour service! We provide walking and scooter tours for
          Atlanta&apos;s coolest brewery districts and neighborhoods.
        </Text>
      </Section>
      <Box
        as="iframe"
        src="https://snazzymaps.com/embed/413288"
        width="100%"
        height="50vh"
        border="none"
        title="Atlanta Brewery Tours Map"
      />
      <Divider orientation="horizontal" />
      <Stack spacing="0" py="6">
        <Section textAlign="center">
          <Heading as="h2" size="xl">
            It&apos;s <i>so</i> easy to get started!
          </Heading>
          <Stack
            py="12"
            spacing="4"
            direction={{ base: 'column', sm: 'row' }}
            alignItems={{ base: 'flex-start', sm: 'center' }}
            justifyContent={{ base: 'center', sm: 'space-between' }}
          >
            <Step order={1} description="Choose a tour" />
            <Step order={2} description="Enter your email" />
            <Step order={3} description="Receive your tour!" />
          </Stack>
          <Button rightIcon={<ArrowForwardIcon />} colorScheme="orange">
            Find a Tour
          </Button>
        </Section>
        <Section filled>
          <Heading
            textAlign="center"
            as="h2"
            pb="6"
            size="xl"
            textTransform="capitalize"
          >
            Popular Tours
          </Heading>
          <HStack
            spacing="4"
            minHeight="400px"
            alignItems="stretch"
            justifyContent="flex-start"
            overflowX="scroll"
          >
            {featuredTours.map((tour) => (
              <Tour
                key={tour.id}
                width="320px"
                minWidth="320px"
                alignSelf="stetch"
                name={tour.name ?? ''}
                description={tour.description ?? ''}
                distance={tour.distance ?? 0}
                breweries={tour.breweries.length}
              />
            ))}
          </HStack>
          <HStack
            pt="6"
            spacing="4"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton
              aria-label="previous"
              icon={<ArrowBackIcon />}
              borderRadius="full"
              variant="solid"
            />
            {Array(featuredTours.length)
              .fill(0)
              .map((_, i) => (
                <Circle key={i} backgroundColor="gray.800" size="1" />
              ))}
            <IconButton
              aria-label="next"
              icon={<ArrowForwardIcon />}
              borderRadius="full"
              variant="solid"
            />
          </HStack>
        </Section>
      </Stack>
      <Section>
        <Heading as="h2" pb="6" size="xl" textTransform="capitalize">
          Explore Neighborhoods
        </Heading>
        <Wrap pb="8">
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
        <Stack spacing={6} divider={<StackDivider />}>
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
            ({ name, id, description, imageSrc, slug }) =>
              imageSrc ? (
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
                        <Button
                          colorScheme="gray"
                          ml="auto"
                          rightIcon={<ArrowForwardIcon />}
                        >
                          View Tours
                        </Button>
                      </Link>
                    </Flex>
                  </CardFooter>
                </Card>
              ) : null,
          )}
        </Stack>
      </Section>
    </div>
  )
}
