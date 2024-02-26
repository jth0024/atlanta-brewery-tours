import { executeExchange } from '@urql/exchange-execute'
import { initUrqlClient } from 'next-urql'
import { cacheExchange, Client, dedupExchange, ssrExchange } from 'urql'
import { schema } from '../schema'
import { API_URL } from './constants'

export const initQueryClient = async (...args: Parameters<Client['query']>) => {
  const ssrCache = ssrExchange({ isClient: false })
  const client = initUrqlClient(
    {
      url: API_URL,
      exchanges: [
        dedupExchange,
        cacheExchange,
        ssrCache,
        executeExchange({ schema }),
      ],
    },
    false,
  )

  // This query is used to populate the cache for the query
  // used on this page.
  await client?.query(...args).toPromise()

  return ssrCache.extractData()
}
