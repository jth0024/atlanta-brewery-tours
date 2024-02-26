import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Link,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  Tag,
  Text,
  useSteps,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {
  FaBeer,
  FaCameraRetro,
  FaClock,
  FaMapMarkedAlt,
  FaSmileBeam,
} from 'react-icons/fa'
import { useQuery } from 'urql'
import { INSTAGRAM_PROFILE_URL } from '../../app'
import { Section } from '../../lib'
import { gql } from '../../schema/client'

export const TOUR_QUERY = gql(/* GraphQL */ `
  query Tour($id: ID!) {
    tour(id: $id) {
      id
      name
      distance
      description
      googleMapsLink
      googleMapsEmbed
      breweries {
        id
        name
        address
      }
      neighborhood {
        id
      }
    }
  }
`)

interface TourProps {
  id: string
}

export const Tour = ({ id }: TourProps) => {
  const [{ data }] = useQuery({
    query: TOUR_QUERY,
    variables: {
      id,
    },
  })
  const { tour } = data ?? {}
  const { activeStep } = useSteps({
    index: 0,
    count: tour?.breweries.length,
  })

  return (
    <div>
      <Section>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={NextLink} href="/#tours">
              Tours
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Tour Details</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading as="h2" size="xl" pt="6" textTransform="capitalize">
          {tour?.name}
        </Heading>
        <Text fontSize="lg" py="6">
          {tour?.description}
        </Text>
        <Tag colorScheme="secondary" mr="4">
          {tour?.breweries.length} stops
        </Tag>
        <Tag colorScheme="secondary">{tour?.distance} miles</Tag>
        {tour?.googleMapsEmbed ? (
          <Flex>
            <Card
              flexGrow="1"
              mt={6}
              borderRadius="lg"
              overflow="hidden"
              variant="unstyled"
              height={{ base: '250px', sm: '300px', md: '350px', lg: '400px' }}
            >
              <div
                style={{ height: '100%', width: '100%' }}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: tour?.googleMapsEmbed,
                }}
              />
            </Card>
          </Flex>
        ) : null}
        {tour?.googleMapsLink ? (
          <Button
            as="a"
            target="_blank"
            rel="noopener noreferrer"
            href={tour?.googleMapsLink ?? ''}
            rightIcon={<ExternalLinkIcon />}
            colorScheme="primary"
            variant="link"
            mt={8}
          >
            Open in Google Maps
          </Button>
        ) : null}
      </Section>
      <Section>
        <Heading as="h2" pb="6">
          Tour Route
        </Heading>
        <Stepper
          index={activeStep}
          colorScheme="primary"
          orientation="vertical"
          height="400px"
          gap="0"
        >
          {tour?.breweries.map(brewery => (
            <Step key={brewery.id}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <Box flexShrink="1">
                <StepTitle>{brewery.name}</StepTitle>
                <StepDescription>{brewery.address}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Section>
      <Section>
        <Heading as="h2">Before You Go</Heading>
        <Text mt="4">
          As you prepare for your self-guided tour, it&apos;s helpful to keep a
          few things in mind to ensure a smooth and enjoyable experience:
        </Text>
        <Stack mt="6" spacing={6}>
          <Card key={1} variant="outline" backgroundColor="surface">
            <CardBody>
              <Flex>
                <Icon as={FaMapMarkedAlt} fontSize="lg" mb={1} mr={3} />
                <Heading as="h3" fontSize="lg">
                  Plan your route.
                </Heading>
              </Flex>
              <Text pt="4">
                We have provided a suggested route with the recommended
                breweries to visit; however, you may consider customizing the
                route based on your preferences, available time, or other
                concerns.
              </Text>
            </CardBody>
          </Card>
          <Card key={2} variant="outline" backgroundColor="surface">
            <CardBody>
              <Flex alignItems="center">
                <Icon as={FaClock} fontSize="lg" mb={1} mr={3} />
                <Heading as="h3" fontSize="lg">
                  Check operating hours.
                </Heading>
              </Flex>
              <Text pt="4">
                Check the operating hours of the breweries you plan to visit, as
                they may vary. We recommend contacting the breweries in advance
                or checking their websites for any updates or special events.
              </Text>
            </CardBody>
          </Card>
          <Card key={3} variant="outline" backgroundColor="surface">
            <CardBody>
              <Flex alignItems="center">
                <Icon as={FaBeer} fontSize="lg" mb={1} mr={3} />
                <Heading as="h3" fontSize="lg">
                  Drink responsibly.
                </Heading>
              </Flex>
              <Text pt="4">
                Always remember to drink responsibly and adhere to all federal,
                state, and local alcohol laws. Bring a valid photo ID, as
                breweries may ask for identification before serving alcohol.
              </Text>
            </CardBody>
          </Card>
          <Card variant="outline" backgroundColor="surface" key={4}>
            <CardBody>
              <Flex alignItems="center">
                <Icon as={FaCameraRetro} fontSize="lg" mb={0.5} mr={3} />
                <Heading as="h3" fontSize="lg">
                  Capture some memories.
                </Heading>
              </Flex>
              <Text pt="4">
                Take photos and share your experiences on social media. You can
                tag us using the hashtag&nbsp;
                <Text as="code" color="primary">
                  #AtlantaBreweryTours
                </Text>
                &nbsp;if you&apos;d like! We would love to see your adventures
                and hear about your favorite brews.
              </Text>
            </CardBody>
          </Card>
          <Card variant="outline" backgroundColor="surface" key={5}>
            <CardBody>
              <Flex alignItems="center">
                <Icon as={FaSmileBeam} fontSize="lg" mb={1} mr={3} />
                <Heading as="h3" fontSize="lg">
                  Enjoy the tour!
                </Heading>
              </Flex>
              <Text pt="4">
                Engage with the brewery staff, ask questions about their brewing
                process, and sample a wide variety of beers! Our brewery tours
                are the best way to experience Atlanta&apos;s craft beer
                culture.
              </Text>
            </CardBody>
          </Card>
        </Stack>
      </Section>
      <Section>
        <Card
          textAlign="center"
          borderRadius="md"
          variant="filled"
          backgroundColor="secondaryContainer"
          size="lg"
        >
          <CardBody>
            {/* <Flex alignItems="center" justifyContent="center"> */}
            {/* <Icon as={FaHandPaper} mb={1} fontSize="lg" mr={3} /> */}
            <Heading
              color="onSecondaryContainer"
              as="h3"
              mt={4}
              mb={4}
              fontSize="lg"
              fontWeight="bold"
            >
              Need Help?
            </Heading>
            {/* </Flex> */}
            <Text
              color="onSecondaryContainer"
              maxWidth="sm"
              textAlign="center"
              mx="auto"
            >
              If you have any questions or need assistance during your
              self-guided tour, our team is here to support you!
              <br />
              <br />
              Feel free to reach out by replying to the email we sent or sending
              us a DM on{' '}
              <Link
                href={INSTAGRAM_PROFILE_URL}
                color="tertiary"
                rel="noopener noreferrer"
                target="_blank"
              >
                Instagram
              </Link>
              . We&apos;ll get back to you as soon as possible!
              {/* <Link
                color="primary"
                isExternal
                href={tour?.googleMapsLink ?? ''}
              >
                route
              </Link> */}
            </Text>
          </CardBody>
        </Card>
      </Section>
    </div>
  )
}
