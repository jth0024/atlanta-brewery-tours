import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { initUrqlClient, withUrqlClient } from 'next-urql'
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from 'urql'
import { API_URL } from '../../app'
import { Neighborhood, NEIGHBORHOOD_QUERY } from '../../views'

export const getStaticPaths = async () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context
  const slug = `${params?.slug}`
  const ssrCache = ssrExchange({ isClient: false })
  const client = initUrqlClient(
    {
      url: API_URL,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false,
  )

  // This query is used to populate the cache for the query
  // used on this page.
  await client
    ?.query(NEIGHBORHOOD_QUERY, {
      slug,
    })
    .toPromise()

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
    revalidate: 600,
  }
}

const NeighborhoodPage = () => {
  const { query } = useRouter()
  return <Neighborhood slug={`${query.slug}`} />
}

export default withUrqlClient(() => ({
  url: API_URL,
}))(NeighborhoodPage)
