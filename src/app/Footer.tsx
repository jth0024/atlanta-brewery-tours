import { CheckIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { FormEventHandler, useCallback, useState } from 'react'
import { BiLogoVenmo } from 'react-icons/bi'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { useMutation } from 'urql'
import { gql } from '../__generated__'
import { INSTAGRAM_PROFILE_URL, VENMO_PROFILE_URL } from './constants'

const CREATE_SUBSCRIBER_MUTATION = gql(/* GraphQL */ `
  mutation CreateSubscriber($input: CreateSubscriberInput!) {
    createSubscriber(input: $input) {
      subscriber {
        email
      }
    }
  }
`)

export const Footer = () => {
  const [createSubscriberResult, createSubscriber] = useMutation(
    CREATE_SUBSCRIBER_MUTATION,
  )
  const [email, setEmail] = useState<string>('')
  const [showAlert, setShowAlert] = useState(false)

  const handleEmailChange = useCallback(e => setEmail(e.target.value), [])

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    createSubscriber({
      input: {
        email,
      },
    }).then(result => {
      if (!result.error) {
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
          setEmail('')
        }, 10000)
      }
    })
  }

  return (
    <Box as="footer" role="contentinfo" py={{ base: '12', md: '16' }} px="4">
      <Container padding="0" size={{ base: 'sm', lg: 'md' }}>
        <Stack spacing={{ base: '12', md: '12' }}>
          <form onSubmit={handleSubmit}>
            <Stack
              justify="space-between"
              direction={{ base: 'column', md: 'column' }}
              align={{ base: 'center', md: 'start' }}
              spacing={{ base: '12', md: '4' }}
            >
              <Heading size="lg" fontWeight="800">
                Atlanta Brewery Tours
              </Heading>
              <FormControl marginLeft={{ md: 'auto' }}>
                <FormLabel fontSize="sm" fontWeight="700">
                  Stay up to date
                </FormLabel>

                <Stack
                  spacing="4"
                  direction={{ base: 'column', md: 'row' }}
                  justifyContent={{ md: 'flex-end' }}
                  align={{ md: 'end' }}
                  maxW={{ md: '360px' }}
                >
                  <InputGroup>
                    <Input
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter your email"
                      type="email"
                      required
                    />
                    {showAlert ? (
                      <InputRightElement>
                        <CheckIcon color="green.500" />
                      </InputRightElement>
                    ) : null}
                  </InputGroup>
                  <Button
                    colorScheme="orange"
                    type="submit"
                    flexShrink={0}
                    isLoading={createSubscriberResult.fetching}
                  >
                    Subscribe
                  </Button>
                </Stack>
              </FormControl>
            </Stack>
          </form>
          <Divider />
          <Stack
            justify="space-between"
            direction={{ base: 'column-reverse', md: 'row' }}
            align="center"
          >
            <Text fontSize="sm">
              &copy; {new Date().getFullYear()} Atlanta Brewery Tours. All
              rights reserved.
            </Text>
            <ButtonGroup variant="ghost">
              <IconButton
                as="a"
                target="_blank"
                rel="noopener noreferrer"
                href={INSTAGRAM_PROFILE_URL}
                aria-label="Instagram Profile"
                icon={<FaInstagram fontSize="1.25rem" />}
              />
              <IconButton
                as="a"
                href="#"
                aria-label="Facebook Profile"
                icon={<FaFacebook fontSize="1.25rem" />}
              />
              <IconButton
                as="a"
                target="_blank"
                aria-label="Venmo Profile"
                href={VENMO_PROFILE_URL}
                rel="noopener noreferrer"
                icon={<BiLogoVenmo fontSize="1.25rem" />}
              />
            </ButtonGroup>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
