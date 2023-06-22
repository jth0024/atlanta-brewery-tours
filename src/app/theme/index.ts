import '@fontsource/open-sans/variable.css'
import '@fontsource/raleway/variable.css'
import { extendTheme } from '@chakra-ui/react'
import { colors, colorTokens } from './colors'
import { containerTheme, dividerTheme } from './components'

export const theme = extendTheme({
  config: {
    useSystemColorMode: false,
  },
  colors,
  components: {
    Divider: dividerTheme,
    Container: containerTheme,
  },
  fonts: {
    body: `'Raleway', sans-serif`,
    heading: `'Open Sans', sans-serif`,
  },
  semanticTokens: {
    colors: colorTokens,
  },
})
