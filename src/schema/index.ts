import { makeExecutableSchema } from '@graphql-tools/schema'
import { resolvers } from './resolvers.generated'
import { typeDefs } from './typeDefs.generated'

export * from './resolvers.generated'
export * from './typeDefs.generated'
export * from './types.generated'

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})
