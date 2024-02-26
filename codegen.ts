import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files'
import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '**/schema.graphql',
  documents: ['src/**/*.tsx'],
  generates: {
    './src/schema': defineConfig(),
    './src/schema/client/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
