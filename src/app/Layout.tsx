import { Box, Divider } from '@chakra-ui/react'
import React from 'react'
import { Footer } from './Footer'
import { Topbar } from './Topbar'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => (
  <Box backgroundColor="background" color="onSurface">
    <Box position="sticky" top="0" zIndex="1">
      <Topbar />
    </Box>
    <main>{React.Children.only(children)}</main>
    <Divider />
    <Footer />
  </Box>
)
