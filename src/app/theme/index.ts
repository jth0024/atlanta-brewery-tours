import '@fontsource/open-sans/variable.css'
import '@fontsource/raleway/variable.css'
import { extendTheme } from '@chakra-ui/react'
import { containerTheme, dividerTheme } from './components'

export const theme = extendTheme({
  config: {
    useSystemColorMode: false,
  },
  colors: {
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
  },
  components: {
    Divider: dividerTheme,
    Container: containerTheme,
  },
  fonts: {
    body: `'Raleway', sans-serif`,
    heading: `'Open Sans', sans-serif`,
  },
})
