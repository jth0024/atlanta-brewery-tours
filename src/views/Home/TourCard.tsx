import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
  Heading,
  HStack,
  Spacer,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { pluralize } from '../../lib'
import { TourModal } from './TourModal'

interface TourCardProps extends CardProps {
  id: string
  name: string
  description: string
  distance: number
  stops: number
}

export const TourCard = ({
  id,
  name,
  description,
  distance = 0,
  stops = 0,
  ...rest
}: TourCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Card
        variant="outline"
        backgroundColor="surface"
        borderRadius="lg"
        {...rest}
      >
        <CardHeader>
          <Heading size="sm">{name}</Heading>
          <Spacer height="2" />

          <HStack>
            <Tag colorScheme="secondary">
              {pluralize(stops, 'stop', 'stops')}
            </Tag>
            <Tag colorScheme="secondary">{`${distance} miles`}</Tag>
          </HStack>
        </CardHeader>
        <CardBody>
          <Text>{description}</Text>
        </CardBody>
        <CardFooter justifyContent="flex-end">
          <ButtonGroup>
            <Button id="TakeTourButton" colorScheme="gray" onClick={onOpen}>
              Take This Tour
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      {isOpen ? (
        <TourModal id={id} name={name} onClose={onClose} isOpen />
      ) : null}
    </>
  )
}
