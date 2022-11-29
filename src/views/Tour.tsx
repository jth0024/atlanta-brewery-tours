import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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
import { Tour as ITour } from '../api'

interface TourProps {
  tour: ITour
}
export const Tour = ({ tour }: TourProps) => {
  const { name, breweryIds, distance, description } = tour
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Card variant="outline" backgroundColor="white">
        <CardHeader>
          <Heading size="sm">{name}</Heading>
          <Spacer height="2" />
          <HStack>
            <Tag>{`${breweryIds.length} Stops`}</Tag>
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
      <Modal isOpen={isOpen} onClose={onClose}>
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
              Where should we send the info? Enter your email address below, and
              we&apos;ll send a tour map to you!
            </Text>
            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input type="email" />
              <FormHelperText>
                P.S. We will never share your email with 3rd parties
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              No Thanks
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
