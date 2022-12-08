import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { Layout } from './Layout'
import { theme } from './theme'

interface AppProps {
  children: React.ReactNode
}
export const App = ({ children }: AppProps) => (
  // 2. Wrap ChakraProvider at the root of your app
  <ChakraProvider theme={theme}>
    <Layout>{children}</Layout>
  </ChakraProvider>
)
