import { Box, Divider, useColorModeValue, useTheme } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Footer } from './Footer'
import { Topbar } from './Topbar'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const listener = () => {
      const amountToScroll = 96
      const { scrollTop = 96 } = document.scrollingElement ?? {}
      const nextOpacity = scrollTop / amountToScroll

      setOpacity(nextOpacity)
    }

    document.addEventListener('scroll', listener)

    return () => {
      document.removeEventListener('scroll', listener)
    }
  }, [])

  const theme = useTheme()
  const themeColor = useColorModeValue(
    // eslint-disable-next-line no-underscore-dangle
    theme.semanticTokens.colors.surface._light,
    // eslint-disable-next-line no-underscore-dangle
    theme.semanticTokens.colors.surface._dark,
  )

  return (
    <>
      <meta key="theme-color" name="theme-color" content={themeColor} />
      <Box backgroundColor="background" color="onSurface">
        <Box position="sticky" top="0" zIndex="2">
          <Box position="relative">
            <Box
              data-testid="foo"
              bgColor="background"
              position="absolute"
              top={0}
              width="100%"
              height="100%"
              opacity={opacity}
            />
            <Topbar height="topbarHeight" zIndex={1} position="relative" />
          </Box>
        </Box>
        <Box as="main" mt="-96px">
          {React.Children.only(children)}
        </Box>
        <Divider />
        <Footer />
      </Box>
    </>
  )
}
