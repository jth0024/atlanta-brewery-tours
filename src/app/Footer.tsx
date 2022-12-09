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
  Stack,
  Text,
} from '@chakra-ui/react'
import * as React from 'react'
import { FaFacebook, FaInstagram, FaPatreon } from 'react-icons/fa'

export const Footer = () => (
  <Box as="footer" role="contentinfo" py={{ base: '12', md: '16' }} px="4">
    <Container padding="0" size={{ base: 'sm', lg: 'md' }}>
      <Stack spacing={{ base: '12', md: '12' }}>
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
              <Input placeholder="Enter your email" type="email" required />
              <Button colorScheme="orange" type="submit" flexShrink={0}>
                Subscribe
              </Button>
            </Stack>
          </FormControl>
        </Stack>
        <Divider />
        <Stack
          justify="space-between"
          direction={{ base: 'column-reverse', md: 'row' }}
          align="center"
        >
          <Text fontSize="sm">
            &copy; {new Date().getFullYear()} Atlanta Brewery Tours. All rights
            reserved.
          </Text>
          <ButtonGroup variant="ghost">
            <IconButton
              as="a"
              href="#"
              aria-label="Instagram"
              icon={<FaInstagram fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Facebook"
              icon={<FaFacebook fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Patreon"
              icon={<FaPatreon fontSize="1.25rem" />}
            />
          </ButtonGroup>
        </Stack>
      </Stack>
    </Container>
  </Box>
)
