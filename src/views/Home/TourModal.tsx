import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { FormEventHandler, useCallback, useState } from 'react'
import { useMutation } from 'urql'
import { gql } from '../../schema/client'

const CREATE_SUBSCRIBER_MUTATION = gql(/* GraphQL */ `
  mutation CreateSubscriberFromTour($input: CreateSubscriberInput!) {
    createSubscriber(input: $input) {
      tour {
        id
      }
    }
  }
`)

interface FormData {
  firstName: string
  lastName: string
  email: string
}

interface TourModalProps {
  id: string
  isOpen: boolean
  onClose: () => void
  name: string
}

export const TourModal = ({ id, isOpen, onClose, name }: TourModalProps) => {
  const [result, createSubscriber] = useMutation(CREATE_SUBSCRIBER_MUTATION)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
  })

  const handleFirstNameChange = useCallback(
    e =>
      setFormData(prev => ({
        ...prev,
        firstName: e.target.value,
      })),
    [],
  )

  const handleLastNameChange = useCallback(
    e =>
      setFormData(prev => ({
        ...prev,
        lastName: e.target.value,
      })),
    [],
  )

  const handleEmailChange = useCallback(
    e =>
      setFormData(prev => ({
        ...prev,
        email: e.target.value,
      })),
    [],
  )

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    createSubscriber({
      input: {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        tourName: name ?? '',
        tourID: id ?? '',
      },
    })
  }

  return (
    <Modal
      id={id}
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
    >
      <ModalOverlay p="0" />
      <ModalContent
        backgroundColor="surface"
        borderTopRadius="16"
        borderBottomRadius={{ base: 0, sm: '16' }}
        mx={{ base: 0, sm: '4' }}
        mt="auto"
        mb={{ base: 0, sm: 'auto' }}
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {result?.error ? (
          <div>
            <ModalHeader>Something Went Wrong</ModalHeader>
            <ModalBody>
              <Alert
                status="error"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
                borderRadius="lg"
              >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  Failed to register tour.
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  There was a problem registering your tour. Please try again
                  later.
                </AlertDescription>
              </Alert>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Done</Button>
            </ModalFooter>
          </div>
        ) : result?.data ? (
          <div>
            <ModalHeader>Enjoy the Tour!</ModalHeader>
            <ModalBody>
              <Alert
                status="success"
                backgroundColor="secondaryContainer"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
                borderRadius="lg"
              >
                <AlertIcon color="secondary" boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  Check your inbox
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  We sent an email with instructions to start your free brewery
                  tour.
                </AlertDescription>
              </Alert>
              <Text
                textAlign="center"
                variant="caption"
                color="GrayText"
                mt="4"
                fontSize="xs"
              >
                Didn&apos;t receive the email? Check your spam folder or try a
                different email address.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Done</Button>
            </ModalFooter>
          </div>
        ) : (
          <form id="tour-form" onSubmit={handleSubmit}>
            <ModalHeader>
              Take this Tour?
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
              <Box mb="12">
                <Text mb="3">You selected:</Text>
                <Card
                  variant="filled"
                  backgroundColor="secondaryContainer"
                  mb="3"
                >
                  <CardBody>
                    <Text as="b">{name ?? ''}</Text>
                  </CardBody>
                </Card>
                <Text>
                  Enter your name and email address below. We&apos;ll send
                  instructions to start your tour.
                </Text>
              </Box>
              <Stack direction="row">
                <FormControl>
                  <FormLabel fontWeight="600">First Name</FormLabel>
                  <Input
                    id="firstname"
                    type="text"
                    value={formData.firstName}
                    onChange={handleFirstNameChange}
                    textTransform="capitalize"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="600">Last Name</FormLabel>
                  <Input
                    id="lastname"
                    type="text"
                    value={formData.lastName}
                    onChange={handleLastNameChange}
                    textTransform="capitalize"
                  />
                </FormControl>
              </Stack>
              <FormControl mt="4">
                <FormLabel fontWeight="600">Email Address</FormLabel>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  textTransform="lowercase"
                />
                <FormHelperText>
                  P.S. We will never share your email with 3rd parties
                </FormHelperText>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <ButtonGroup mt="4">
                <Button
                  id="cancel"
                  variant="outline"
                  onClick={onClose}
                  disabled={result.fetching}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="primary"
                  type="submit"
                  id="TakeTourSubmitButton"
                  isLoading={result.fetching}
                >
                  Submit
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}
