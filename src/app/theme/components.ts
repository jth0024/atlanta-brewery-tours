import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const thin = defineStyle({
  borderColor: 'gray.800',
  borderWidth: '1px',
  borderStyle: 'solid',
})

const thick = defineStyle({
  borderColor: 'gray.800',
  borderWidth: '2px', // change the width of the border
  borderStyle: 'solid', // change the style of the border
})

export const dividerTheme = defineStyleConfig({
  defaultProps: {
    colorScheme: 'orange',
  },
  variants: { thin, thick },
})
