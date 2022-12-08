import { ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Box,
  BoxProps,
  Button,
  Center,
  Circle,
  Container,
  Divider,
  Heading,
  Stack,
  StackDivider,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { intersection } from 'lodash'
import React, { MutableRefObject, useRef, useState } from 'react'
import { useQuery } from 'urql'
import { gql } from '../__generated__'
import { Slider } from '../lib'
import { Tour } from './Tour'

export const HOME_QUERY = gql(/* GraphQL */ `
  query Home {
    tours {
      id
      distance
      description
      breweries {
        id
      }
      name
      isFeatured
      neighborhood {
        id
        name
        regions {
          id
        }
      }
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
  size?: string | { [key: string]: string }
}

const Section = ({
  children,
  filled = false,
  size = { base: 'sm', md: 'md' },
  ...boxProps
}: SectionProps) => (
  <Box
    as="section"
    backgroundColor={filled ? 'gray.100' : 'white'}
    py="12"
    px="4"
    {...boxProps}
  >
    <Container size={size} padding="0px">
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
    spacing="4"
    alignItems="center"
    justifyContent={{ base: 'center', sm: 'center' }}
    direction={{ base: 'column', sm: 'column' }}
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
    <Heading
      as="h3"
      fontWeight="800"
      size={{ base: 'xs', sm: 'sm' }}
      textTransform="capitalize"
    >
      {description}
    </Heading>
  </Stack>
)

export const Home = () => {
  const popularToursRef = useRef<HTMLHeadingElement | null>(null)
  const scrollIntoView = (ref: MutableRefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        block: 'center',
      })
    }
  }

  const [{ data }] = useQuery({ query: HOME_QUERY })
  const { tours = [], regions = [] } = data ?? {}

  const [filters, setFilters] = useState<string[]>([])
  const featuredTours = tours.filter(t => t.isFeatured)
  const filteredTours =
    filters.length > 0
      ? tours.filter(
          ({ neighborhood }) =>
            intersection(
              neighborhood?.regions?.map(({ id }) => id),
              filters,
            ).length > 0,
        )
      : tours

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
          <Heading as="h2" size="xl" textTransform="capitalize">
            How it Works
          </Heading>
          <Stack
            py="12"
            spacing="4"
            direction={{ base: 'row', sm: 'row' }}
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Step order={1} description="Choose a tour" />
            <Step order={2} description="Enter your email" />
            <Step order={3} description="Receive your tour!" />
          </Stack>
          <Button
            colorScheme="orange"
            rightIcon={<ArrowForwardIcon />}
            onClick={() => scrollIntoView(popularToursRef)}
          >
            Find a Tour
          </Button>
        </Section>
        <Section filled size={{ base: 'sm', md: 'md', lg: 'lg' }}>
          <Heading
            textAlign="center"
            as="h2"
            pb="12"
            size="xl"
            textTransform="capitalize"
            ref={popularToursRef}
          >
            Popular Tours
          </Heading>
          <Slider>
            {featuredTours.map(({ id }) => (
              <Tour
                key={id}
                id={id}
                sx={{
                  width: '320px',
                  minWidth: '320px',
                  alignSelf: 'stetch',
                }}
              />
            ))}
          </Slider>
        </Section>
      </Stack>
      <Section>
        <Heading as="h2" pb="6" size="xl" textTransform="capitalize" id="tours">
          Explore Neighborhoods
        </Heading>
        <Wrap pb="8">
          {regions.map(region => (
            <Button
              key={region.id}
              borderRadius="full"
              colorScheme={filters.includes(region.id) ? 'orange' : 'gray'}
              variant={filters.includes(region.id) ? 'solid' : 'outline'}
              cursor="pointer"
              onClick={() => {
                setFilters(prev => {
                  if (prev.includes(region.id)) {
                    return prev.filter(f => f !== region.id)
                  }
                  return prev.concat(region.id)
                })
              }}
            >
              {region.name}
            </Button>
          ))}
        </Wrap>
        <Stack spacing={6}>
          {filteredTours.length === 0 ? (
            <Center alignSelf="stretch" minHeight="320px">
              <Stack align="center" spacing={4}>
                <Text
                  textAlign="center"
                  fontSize="lg"
                  color="gray.600"
                  maxW="container.sm"
                >
                  Darn! There aren&apos;t any tours matching your filters. Want
                  to try something else?&nbsp;
                </Text>
                <Button
                  colorScheme="orange"
                  variant="link"
                  onClick={() => setFilters([])}
                >
                  Clear Filters
                </Button>
              </Stack>
            </Center>
          ) : (
            filteredTours.map(({ id }) => <Tour key={id} id={id} />)
          )}
        </Stack>
      </Section>
    </div>
  )
}
