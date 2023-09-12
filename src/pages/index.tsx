import { executeExchange } from '@urql/exchange-execute'
import Head from 'next/head'
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
  await client?.query(HOME_QUERY, {}).toPromise()

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
  }
}

const HomePage = () => (
  <>
    <Head key="home-page-head">
      <title>Atlanta Brewery Tours</title>
      <meta
        name="description"
        content={`Experience the best craft beers in Georgia with Atlanta Brewery Tours, 
            a free self-guided tour service! Discover new favorites, learn about the brewing process, 
            and enjoy a fun-filled walking or scooter tour with friends or fellow beer enthusiasts. 
            Book your free tour today!`}
      />
      <link rel="canonical" href="https://www.atlantabrewerytours.com" />
    </Head>
    <Home />
  </>
)

export default withUrqlClient(
  () => ({
    url: API_URL,
  }),
  {
    staleWhileRevalidate: true,
  },
)(HomePage)
