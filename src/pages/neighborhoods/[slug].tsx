import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import { API_URL, initQueryClient } from '../../app'
import { Neighborhood, NEIGHBORHOOD_QUERY } from '../../views'

export const getStaticPaths = async () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context
  const slug = `${params?.slug}`
  const urqlState = await initQueryClient(NEIGHBORHOOD_QUERY, { slug })

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState,
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
