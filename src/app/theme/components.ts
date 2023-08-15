import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

export const containerTheme = defineStyleConfig({
  sizes: {
    sm: { maxWidth: 'container.sm' },
    md: { maxWidth: 'container.md' },
    lg: { maxWidth: 'container.lg' },
    xl: { maxWidth: 'container.xl' },
  },
})

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
    colorScheme: 'primary',
  },
  variants: { thin, thick },
})
