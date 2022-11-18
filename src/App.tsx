import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './Home'
import { Neighborhood } from './Neighborhood'
import { Layout } from './Layout'
import { theme } from './theme'

export const App = () => {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/neighborhoods/:slug" element={<Neighborhood />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ChakraProvider>
  )
}
