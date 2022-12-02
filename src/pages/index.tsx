import { executeExchange } from '@urql/exchange-execute'
import { initUrqlClient, withUrqlClient } from 'next-urql'
import { cacheExchange, dedupExchange, ssrExchange } from 'urql'
import { API_URL, schema } from '../app'
import { Home, HOME_QUERY } from '../views/Home'

export const getStaticProps = async () => {
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
  const result = await client?.query(HOME_QUERY, {}).toPromise()

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
    revalidate: 600,
  }
}

const HomePage = () => {
  return <Home />
}

export default withUrqlClient(() => ({
  url: API_URL,
}))(HomePage)
