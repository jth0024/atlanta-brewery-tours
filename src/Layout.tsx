import React from 'react'
import { Box, Divider } from '@chakra-ui/react'
import { Topbar } from './Topbar'

interface LayoutProps {
  children: React.ReactElement
}

export const Layout = ({ children }: LayoutProps) => (
  <main>
    <Box position="sticky" top="0" zIndex="1">
      <Topbar />
      <Divider orientation="horizontal" />
    </Box>
    {React.Children.only(children)}
  </main>
)
