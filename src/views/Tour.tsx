import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'urql'
import { gql } from '../__generated__'
import { pluralize } from '../lib'

export const TOUR_QUERY = gql(/* GraphQL */ `
  query Tour($id: ID!) {
    tour(id: $id) {
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

interface TourProps extends CardProps {
  id: string
}

export const Tour = ({ id, ...rest }: TourProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [{ data }] = useQuery({
    query: TOUR_QUERY,
    variables: {
      id,
    },
  })

  const { tour } = data ?? {}

  return (
    <>
      <Card variant="outline" backgroundColor="white" {...rest}>
        <CardHeader>
          <Heading size="sm">{tour?.name ?? ''}</Heading>
          <Spacer height="2" />
          <HStack>
            <Tag>
              {pluralize(tour?.breweries?.length ?? 0, 'stop', 'stops')}
            </Tag>
            <Tag>{`${tour?.distance ?? 0} miles`}</Tag>
          </HStack>
        </CardHeader>
        <CardBody>
          <Text>{tour?.description ?? ''}</Text>
        </CardBody>
        <CardFooter justifyContent="flex-end">
          <ButtonGroup>
            <Button colorScheme="gray" onClick={onOpen}>
              Take This Tour
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay p="0" />
        <ModalContent
          borderTopRadius="16"
          borderBottomRadius={{ base: 0, sm: '16' }}
          mx={{ base: 0, sm: '4' }}
          mt="auto"
          mb={{ base: 0, sm: 'auto' }}
        >
          <ModalHeader>
            Take this Tour?
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Text mb="4">Your selection:</Text>
            <Card variant="filled" mb="4">
              <CardBody>
                <Text as="b">{tour?.name ?? ''}</Text>
              </CardBody>
            </Card>
            <Text mb="8">
              Enter your email address below to receive your free tour guide!
            </Text>
            <FormControl>
              <FormLabel fontWeight="600">Email Address</FormLabel>
              <Input type="email" />
              <FormHelperText>
                P.S. We will never share your email with 3rd parties
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup mt="4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="orange" onClick={onClose}>
                Submit
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
