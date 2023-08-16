import {
  Box,
  Card,
  CardBody,
  Heading,
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
import { useQuery } from 'urql'
import { gql } from '../../__generated__'
import { INSTAGRAM_PROFILE_URL } from '../../app'
import { Section } from '../../lib'

export const TOUR_QUERY = gql(/* GraphQL */ `
  query Tour($id: ID!) {
    tour(id: $id) {
      id
      name
      distance
      description
      emailTemplateID
      googleMapsLink
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
        <Heading as="h2" size="xl" pb="6" textTransform="capitalize">
          {tour?.name}
        </Heading>
        <Text fontSize="lg" pb="6">
          {tour?.description}
        </Text>
        <Tag colorScheme="secondary" mr="4">
          {tour?.breweries.length} stops
        </Tag>
        <Tag colorScheme="secondary">{tour?.distance} miles</Tag>
        {/* {tour?.googleMapsLink ? (
          <Text fontSize="lg">
            Navigate this tour with{' '}
            <Link
              color="orange.500"
              isExternal
              href={tour?.googleMapsLink ?? ''}
            >
              Google Maps
            </Link>
          </Text>
        ) : null} */}
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
              <Box flexShrink="0">
                <StepTitle>{brewery.name}</StepTitle>
                <StepDescription>{brewery.address}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Section>
      <Section>
        <Heading as="h2">Things to Know</Heading>
        <Text mt="4">
          It&apos;s helpful to keep a few things in mind to ensure a smooth and
          enjoyable tour:
        </Text>
        <Stack mt="6" spacing={6}>
          <Card key={1} variant="outline" backgroundColor="surface">
            <CardBody>
              <Heading as="h3" fontSize="lg">
                1. Plan your route.
              </Heading>
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
              <Heading as="h3" fontSize="lg">
                2. Check operating hours.
              </Heading>
              <Text pt="4">
                Check the operating hours of the breweries you plan to visit, as
                they may vary. We recommend contacting the breweries in advance
                or checking their websites for any updates or special events.
              </Text>
            </CardBody>
          </Card>
          <Card key={3} variant="outline" backgroundColor="surface">
            <CardBody>
              <Heading as="h3" fontSize="lg">
                3. Drink responsibly.
              </Heading>
              <Text pt="4">
                Always remember to drink responsibly and adhere to all federal,
                state, and local alcohol laws. Bring a valid photo ID, as
                breweries may ask for identification before serving alcohol.
              </Text>
            </CardBody>
          </Card>
          <Card variant="outline" backgroundColor="surface" key={4}>
            <CardBody>
              <Heading as="h3" fontSize="lg">
                4. Capture some memories.
              </Heading>
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
              <Heading as="h3" fontSize="lg">
                5. Enjoy the tour!
              </Heading>
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
            {/* <InfoOutlineIcon boxSize="24px" mr={0} /> */}
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
            <Text color="onSecondaryContainer" maxWidth="sm">
              If you have any questions or need assistance during your
              self-guided tour, our team is here to support you! Feel free to
              reach out by replying to the email we sent or sending us a DM on{' '}
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
