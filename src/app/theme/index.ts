import '@fontsource/open-sans/variable.css'
import '@fontsource/raleway/variable.css'
import { extendTheme } from '@chakra-ui/react'
import { borders, borderWidths } from './borders'
import { colors, colorTokens } from './colors'
import { containerTheme, dividerTheme } from './components'
import { sizes } from './sizes'

export const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  borders,
  borderWidths,
  colors,
  components: {
    Divider: dividerTheme,
    Container: containerTheme,
  },
  fonts: {
    body: `'Raleway', sans-serif`,
    heading: `'Open Sans', sans-serif`,
  },
  sizes,
  semanticTokens: {
    colors: colorTokens,
  },
})
