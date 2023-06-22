export const colors = {
  orange: {
    '50': '#FCEDE9',
    '100': '#F6CCC1',
    '200': '#F0AB99',
    '300': '#EA8A71',
    '400': '#E46949',
    '500': '#DE4821',
    '600': '#B23A1A',
    '700': '#852B14',
    '800': '#591D0D',
    '900': '#2C0E07',
  },
}

interface ColorToken {
  default: string
  _dark: string
}
const defineColorToken = (_: string, dark: string): ColorToken => ({
  default: _,
  _dark: dark,
})

export const colorTokens = {
  background: defineColorToken('gray.100', 'gray.900'),
  surface: defineColorToken('white', 'gray.800'),
  brand: defineColorToken('orange.500', 'orange.600'),
}
