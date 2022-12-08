import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, BoxProps, Circle, HStack, IconButton } from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

interface SliderProps extends BoxProps {
  children: React.ReactNode
}

export const Slider = ({ children, ...rest }: SliderProps) => {
  const items = React.Children.toArray(children)
  const [activeIdx, setActiveIdx] = useState(0)

  const handlePrevClick = useCallback(() => {
    setActiveIdx(prev => Math.max(prev - 1, 0))
  }, [setActiveIdx])

  const handleNextClick = useCallback(() => {
    setActiveIdx(prev => Math.min(prev + 1, items.length))
  }, [setActiveIdx, items.length])

  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current
        .querySelector(`[data-idx="${activeIdx}"]`)
        ?.scrollIntoView({
          block: 'nearest',
          inline: 'center',
        })
    }
  }, [activeIdx])

  return (
    <Box {...rest}>
      <HStack
        spacing="4"
        minHeight="400px"
        alignItems="stretch"
        justifyContent="flex-start"
        overflowX="auto"
        ref={scrollContainerRef}
      >
        {items.map((item, i) => (
          // eslint-disable-next-line react/jsx-key
          <Box
            data-idx={i}
            alignSelf="stretch"
            display="flex"
            alignItems="stretch"
            justifyContent="stretch"
          >
            {item}
          </Box>
        ))}
      </HStack>
      <HStack pt="6" spacing="4" justifyContent="center" alignItems="center">
        <IconButton
          aria-label="previous"
          icon={<ArrowBackIcon />}
          borderRadius="full"
          variant="solid"
          onClick={handlePrevClick}
          disabled={activeIdx === 0}
        />
        {items.map((_, i) => (
          // eslint-disable-next-line react/jsx-key
          <Circle
            backgroundColor={i === activeIdx ? 'gray.800' : 'gray.300'}
            size="1"
          />
        ))}
        <IconButton
          aria-label="next"
          icon={<ArrowForwardIcon />}
          borderRadius="full"
          variant="solid"
          onClick={handleNextClick}
          disabled={activeIdx === items.length - 1}
        />
      </HStack>
    </Box>
  )
}
