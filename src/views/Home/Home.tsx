import { ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Stack,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { intersection, range } from 'lodash'
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useQuery } from 'urql'
import { gql } from '../../__generated__'
import { Section, Slider } from '../../lib'
import { Step } from './Step'
import { TourCard } from './TourCard'
import { TourCardSkeleton } from './TourCardSkeleton'

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

export const Home = () => {
  const popularToursRef = useRef<HTMLHeadingElement | null>(null)
  const topRef = useRef<HTMLDivElement | null>(null)
  const scrollIntoView = useCallback(
    (ref: MutableRefObject<HTMLElement | null>) => {
      if (ref.current) {
        ref.current.scrollIntoView({
          block: 'center',
        })
      }
    },
    [],
  )

  // TODO: for some reason the page always loads partially scrolled down,
  // so this is a quick fix to scroll back to the top
  useEffect(() => {
    scrollIntoView(topRef)
  }, [scrollIntoView])

  const [{ data, fetching }] = useQuery({ query: HOME_QUERY })
  const { tours = [], regions = [] } = data ?? {}

  const [filters, setFilters] = useState<string[]>([])
  const validTours = tours.filter(
    t => t.id && t.name && t.distance && t.description && t.breweries.length,
  )
  const featuredTours = validTours.filter(t => t.isFeatured)
  const filteredTours =
    filters.length > 0
      ? validTours.filter(
          ({ neighborhood }) =>
            intersection(
              neighborhood?.regions?.map(({ id }) => id),
              filters,
            ).length > 0,
        )
      : validTours

  return (
    <div>
      <div ref={topRef} />
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
            {fetching
              ? range(0, 5).map(i => (
                  <TourCardSkeleton
                    key={i}
                    sx={{
                      width: '320px',
                      minWidth: '320px',
                      alignSelf: 'stetch',
                    }}
                  />
                ))
              : featuredTours.map(
                  ({ id, name, description, distance, breweries = [] }) => (
                    <TourCard
                      key={id}
                      id={id}
                      name={name || ''}
                      description={description || ''}
                      distance={distance || 0}
                      stops={breweries.length || 0}
                      sx={{
                        width: '320px',
                        minWidth: '320px',
                        alignSelf: 'stetch',
                      }}
                    />
                  ),
                )}
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
          {/* eslint-disable-next-line no-nested-ternary */}
          {fetching ? (
            range(0, 5).map(i => (
              <TourCardSkeleton
                key={i}
                sx={{
                  width: '320px',
                  minWidth: '320px',
                  alignSelf: 'stetch',
                }}
              />
            ))
          ) : filteredTours.length === 0 ? (
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
            filteredTours.map(
              ({ id, name, description, distance, breweries = [] }) => (
                <TourCard
                  key={id}
                  id={id}
                  name={name || ''}
                  description={description || ''}
                  distance={distance || 0}
                  stops={breweries.length || 0}
                />
              ),
            )
          )}
        </Stack>
      </Section>
    </div>
  )
}