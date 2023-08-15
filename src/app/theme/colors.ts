import { SemanticValue } from '@chakra-ui/react'

const semanticColor = (
  _light: string,
  _dark: string,
): SemanticValue<string> => ({
  default: _light,
  _dark,
  _light,
})

interface MaterialPalette {
  0: string
  10: string
  20: string
  25: string
  30: string
  35: string
  40: string
  50: string
  60: string
  70: string
  80: string
  90: string
  95: string
  98: string
  99: string
  100: string
}

interface ChakraPalette {
  '50': string
  '100': string
  '200': string
  '300': string
  '400': string
  '500': string
  '600': string
  '700': string
  '800': string
  '900': string
}

const translatePalette = (palette: MaterialPalette): ChakraPalette => ({
  '50': palette[95],
  '100': palette[90],
  '200': palette[80],
  '300': palette[60], // 70
  '400': palette[50], // 60
  '500': palette[35], // 50
  '600': palette[30], // 40
  '700': palette[25], // 30
  '800': palette[20], // 20
  '900': palette[10], // 10
})

const neutral = translatePalette({
  0: '#000000',
  10: '#1a1c19',
  20: '#2f312d',
  25: '#3a3c38',
  30: '#454743',
  35: '#51534f',
  40: '#5d5f5a',
  50: '#767873',
  60: '#90918c',
  70: '#aaaca6',
  80: '#c6c7c1',
  90: '#e2e3dd',
  95: '#f0f1eb',
  98: '#f9faf4',
  99: '#fcfdf7',
  100: '#ffffff',
})

export const colors = {
  // Source: #678164
  primary: translatePalette({
    '0': '#000000',
    '10': '#002105', // onPrimaryContainer
    '20': '#00390e', // onPrimary (dark)
    '25': '#004612',
    '30': '#005318', // primaryContainer (dark)
    '35': '#135f22',
    '40': '#236c2d', // primary
    '50': '#3e8643',
    '60': '#58a05b',
    '70': '#72bc73',
    '80': '#8dd88c', // primary (dark)
    '90': '#a8f5a6', // primaryContainer, onPrimaryContainer (dark)
    '95': '#c7ffc2',
    '98': '#ebffe5',
    '99': '#f6fff0',
    '100': '#ffffff',
  }),
  // Source: #849680
  secondary: translatePalette({
    '0': '#000000',
    '10': '#101f10', // onSecondaryContainer
    '20': '#253424', // onSecondary (dark)
    '25': '#303f2e',
    '30': '#3b4b39', // secondaryContainer (dark)
    '35': '#465744',
    '40': '#52634f', // secondary
    '50': '#6a7c67',
    '60': '#849680', // source color
    '70': '#9eb09a',
    '80': '#b9ccb4', // secondary (dark)
    '90': '#d5e8cf', // secondaryContainer, onSecondaryContainer (dark)
    '95': '#e3f6dd',
    '98': '#ecffe5',
    '99': '#f6fff0',
    '100': '#ffffff',
  }),
  // Source: #fd5523
  tertiary: translatePalette({
    '0': '#000000',
    '10': '#3b0900',
    '20': '#601400',
    '25': '#731a00',
    '30': '#872000',
    '35': '#9c2700',
    '40': '#b12d00',
    '50': '#db3d07',
    '60': '#ff5625',
    '70': '#ff8b6a',
    '80': '#ffb5a0',
    '90': '#ffdbd1',
    '95': '#ffede8',
    '98': '#fff8f6',
    '99': '#fffbff',
    '100': '#ffffff',
  }),
  gray: neutral,
  neutral,
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

export const colorTokens = {
  // Primary
  primary: semanticColor('#236c2d', '#8dd88c'),
  onPrimary: semanticColor('#ffffff', '#00390e'),
  primaryContainer: semanticColor('#a8f5a6', '#005318'),
  onPrimaryContainer: semanticColor('#002105', '#a8f5a6'),
  // Secondary
  secondary: semanticColor('#52634f', '#b9ccb4'),
  onSecondary: semanticColor('#ffffff', '#253424'),
  secondaryContainer: semanticColor('#d5e8cf', '#3b4b39'),
  onSecondaryContainer: semanticColor('#101f10', '#d5e8cf'),
  // Tertiary
  tertiary: semanticColor('#b12d00', '#ffb5a0'),
  onTertiary: semanticColor('#ffffff', '#601400'),
  tertiaryContainer: semanticColor('#ffdbd1', '#872000'),
  onTertiaryContainer: semanticColor('#3b0900', '#ffdbd1'),
  // Error
  error: semanticColor('#ba1a1a', '#ffb4ab'),
  onError: semanticColor('#ffffff', '#690005'),
  errorContainer: semanticColor('#ffdad6', '#93000a'),
  onErrorContainer: semanticColor('#410002', '#ffdad6'),
  // Background
  background: semanticColor('#fcfdf7', '#1a1c19'),
  onBackground: semanticColor('#1a1c19', '#e2e3dd'),
  // Surface
  surface: semanticColor('#fcfdf7', '#1a1c19'),
  onSurface: semanticColor('#1a1c19', '#e2e3dd'),
  surfaceVariant: semanticColor('#dee5d9', '#424940'),
  onSurfaceVariant: semanticColor('#424940', '#c2c9bd'),
  // Outline
  outline: semanticColor('#72796f', '#8c9388'),
}
