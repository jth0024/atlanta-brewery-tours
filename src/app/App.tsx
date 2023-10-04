import 'react-notion-x/src/styles.css'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { Layout } from './Layout'
import { GoogleTagManager } from './scripts'
import { theme } from './theme'

interface AppProps {
  children: React.ReactNode
}
export const App = ({ children }: AppProps) => (
  // 2. Wrap ChakraProvider at the root of your app
  <ChakraProvider theme={theme}>
    <GoogleTagManager />
    <Layout>{children}</Layout>
  </ChakraProvider>
)
