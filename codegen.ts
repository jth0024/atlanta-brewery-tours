import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './src/api/schema.ts',
  documents: ['src/**/*.tsx'],
  generates: {
    './src/__generated__/': {
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
