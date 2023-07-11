import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
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
  Skeleton,
  Spacer,
  Stack,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React, { FormEventHandler, useCallback, useState } from 'react'
import { useMutation, useQuery } from 'urql'
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

const TAKE_TOUR_MUTATION = gql(/* GraphQL */ `
  mutation TakeTour($input: TakeTourInput!) {
    takeTour(input: $input) {
      tourID
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
}

export const TourCard = ({ id, ...rest }: TourCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [, takeTour] = useMutation(TAKE_TOUR_MUTATION)
  const [result, setResult] = useState<{
    fetching: boolean
    data?: unknown
    error?: unknown
  }>({
    fetching: false,
    data: null,
    error: null,
  })
  const [tourResult] = useQuery({
    query: TOUR_QUERY,
    variables: {
      id,
    },
  })

  const { tour } = tourResult.data ?? {}

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
        tourName: tour?.name ?? '',
        tourID: tour?.id ?? '',
      },
    }

    setResult({ fetching: true })

    takeTour(variables).then(res =>
      setResult({
        ...res,
        fetching: false,
      }),
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
          {tourResult.fetching ? (
            <Skeleton height="20px" width="200px" />
          ) : (
            <Heading size="sm">{tour?.name ?? ''}</Heading>
          )}
          <Spacer height="2" />
          {tourResult.fetching ? (
            <Skeleton height="24px" width="100px" />
          ) : (
            <HStack>
              <Tag>
                {pluralize(tour?.breweries?.length ?? 0, 'stop', 'stops')}
              </Tag>
              <Tag>{`${tour?.distance ?? 0} miles`}</Tag>
            </HStack>
          )}
        </CardHeader>
        <CardBody>
          {tourResult.fetching ? (
            <Skeleton height="150px" />
          ) : (
            <Text>{tour?.description ?? ''}</Text>
          )}
        </CardBody>
        <CardFooter justifyContent="flex-end">
          <ButtonGroup>
            {tourResult.fetching ? (
              <Skeleton height="40px" width="144px" />
            ) : (
              <Button colorScheme="gray" onClick={handleOpen}>
                Take This Tour
              </Button>
            )}
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
              <ModalHeader>You&apos;re Registered!</ModalHeader>
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
                <Text mb="4">Your selection:</Text>
                <Card variant="filled" mb="4">
                  <CardBody>
                    <Text as="b">{tour?.name ?? ''}</Text>
                  </CardBody>
                </Card>
                <Text mb="8">
                  Enter your name and email address below to receive your free
                  tour guide!
                </Text>
                <Stack direction="row">
                  <FormControl>
                    <FormLabel fontWeight="600">First Name</FormLabel>
                    <Input
                      id="firstname"
                      type="text"
                      value={formData.firstName}
                      onChange={handleFirstNameChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="600">Last Name</FormLabel>
                    <Input
                      id="lastname"
                      type="text"
                      value={formData.lastName}
                      onChange={handleLastNameChange}
                    />
                  </FormControl>
                </Stack>
                <FormControl mt="4">
                  <FormLabel fontWeight="600">Email Address</FormLabel>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={handleEmailChange}
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
