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

interface TourProps extends CardProps {
  breweries: number
  description: string
  distance: number
  name: string
}

export const Tour = ({
  breweries,
  description,
  distance,
  name,
  ...rest
}: TourProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Card variant="outline" backgroundColor="white" {...rest}>
        <CardHeader>
          <Heading size="sm">{name}</Heading>
          <Spacer height="2" />
          <HStack>
            <Tag>{`${breweries} Stops`}</Tag>
            <Tag>{`${distance} miles`}</Tag>
          </HStack>
        </CardHeader>
        <CardBody>
          <Text>{description}</Text>
        </CardBody>
        <CardFooter justifyContent="flex-end">
          <ButtonGroup>
            <Button colorScheme="orange" onClick={onOpen}>
              Take This Tour
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Take this Tour?
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Text mb="4">You selected:</Text>
            <Card variant="filled" mb="4">
              <CardBody>
                <Text as="b">{name}</Text>
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
            <Button variant="ghost" onClick={onClose}>
              Nevermind
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
