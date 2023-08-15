import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Card,
  CardBody,
  Divider,
  Heading,
  HStack,
  Icon,
  Link,
  List,
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
        <Tag mr="4">{tour?.breweries.length} stops</Tag>
        <Tag>{tour?.distance} miles</Tag>
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
          Tour Information
        </Heading>
        <Stepper
          index={activeStep}
          colorScheme="tertiary"
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
              Need Directions?
            </Heading>
            <Text color="onSecondaryContainer" maxWidth="sm">
              You can navigate your tour with ease using our handy Google Maps{' '}
              <Link
                color="primary"
                isExternal
                href={tour?.googleMapsLink ?? ''}
              >
                route
              </Link>
              .
            </Text>
          </CardBody>
        </Card>
      </Section>
    </div>
  )
}
