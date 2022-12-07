import { Box } from '@chakra-ui/react'
import React from 'react'
import { Topbar } from './Topbar'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => (
  <main>
    <Box position="sticky" top="0" zIndex="1">
      <Topbar />
    </Box>
    {React.Children.only(children)}
  </main>
)
