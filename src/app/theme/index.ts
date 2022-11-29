import { extendTheme } from '@chakra-ui/react'
import { dividerTheme } from './components'

export const theme = extendTheme({
  config: {
    useSystemColorMode: true,
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
  },
})
