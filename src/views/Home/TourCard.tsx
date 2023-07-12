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
  Stack,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React, { FormEventHandler, useCallback, useState } from 'react'
import { useMutation } from 'urql'
import { gql } from '../../__generated__'
import { pluralize } from '../../lib'

const CREATE_SUBSCRIBER_MUTATION = gql(/* GraphQL */ `
  mutation CreateSubscriber($input: CreateSubscriberInput!) {
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
  const [, createSubscriber] = useMutation(CREATE_SUBSCRIBER_MUTATION)
  const [result, setResult] = useState<{
    fetching: boolean
    data?: unknown
    error?: unknown
  }>({
    fetching: false,
    data: null,
    error: null,
  })

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

    const variables = {
      input: {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        tourName: name ?? '',
        tourID: id ?? '',
      },
    }

    setResult({ fetching: true })

    createSubscriber(variables).then(res =>
      setResult(prev => ({
        ...prev,
        ...res,
        fetching: false,
      })),
    )
  }

  const handleOpen = useCallback(() => {
    setResult({ fetching: false })
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
    })
    onOpen()
  }, [onOpen])

  const handleClose = useCallback(() => {
    setResult({ fetching: false })
    onClose()
  }, [onClose])

  return (
    <>
      <Card variant="outline" backgroundColor="white" {...rest}>
        <CardHeader>
          <Heading size="sm">{name}</Heading>
          <Spacer height="2" />

          <HStack>
            <Tag>{pluralize(stops, 'stop', 'stops')}</Tag>
            <Tag>{`${distance} miles`}</Tag>
          </HStack>
        </CardHeader>
        <CardBody>
          <Text>{description}</Text>
        </CardBody>
        <CardFooter justifyContent="flex-end">
          <ButtonGroup>
            <Button colorScheme="gray" onClick={handleOpen}>
              Take This Tour
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <Modal isOpen={isOpen} onClose={handleClose} motionPreset="slideInBottom">
        <ModalOverlay p="0" />
        <ModalContent
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
                <Button onClick={handleClose}>Done</Button>
              </ModalFooter>
            </div>
          ) : result?.data ? (
            <div>
              <ModalHeader>Enjoy the Tour!</ModalHeader>
              <ModalBody>
                <Alert
                  status="success"
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
                    Check your inbox
                  </AlertTitle>
                  <AlertDescription maxWidth="sm">
                    We sent an email with instructions to start your free
                    brewery tour.
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
                <Button onClick={handleClose}>Done</Button>
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
                  <Card variant="filled" mb="3">
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
                    variant="outline"
                    onClick={handleClose}
                    disabled={result.fetching}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="orange"
                    type="submit"
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
    </>
  )
}
