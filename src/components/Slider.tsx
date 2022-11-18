import React from 'react'
import { Box, HStack } from '@chakra-ui/react'

interface SliderProps {
  activeIndex?: number
  children: React.ReactNode
}

export const Slider = ({ activeIndex = 0, children }: SliderProps) => (
  <HStack alignItems="stretch">
    {React.Children.toArray(children).map((child, i) => (
      <Box
        borderWidth="1px"
        borderStyle="solid"
        borderRadius="4px"
        borderColor={i === activeIndex ? 'orange.600' : 'none'}
      >
        {child}
      </Box>
    ))}
  </HStack>
)
