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
import { useRouter } from 'next/router'
import React, { FormEventHandler, useRef } from 'react'
import { useQuery } from 'urql'
import { gql } from '../../__generated__'
import { pluralize } from '../../lib'

export const TOUR_QUERY = gql(/* GraphQL */ `
  query TourSummary($id: ID!) {
    tour(id: $id) {
      id
      name
      distance
      description
      emailTemplateID
      breweries {
        id
      }
      neighborhood {
        id
      }
    }
  }
`)

interface TourCardProps extends CardProps {
  id: string
}

export const TourCard = ({ id, ...rest }: TourCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const [{ data }] = useQuery({
    query: TOUR_QUERY,
    variables: {
      id,
    },
  })

  const { tour } = data ?? {}

  const formRef = useRef<HTMLFormElement | null>(null)
  const form = formRef?.current
  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    // console.log(e)
    e.preventDefault()
    router.push(`/tours/${id}`)

    if (form) {
      // console.log(form)
    }
  }

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
          <form id="tour-form" ref={formRef} onSubmit={handleSubmit}>
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
                <Button colorScheme="orange" type="submit">
                  Submit
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
