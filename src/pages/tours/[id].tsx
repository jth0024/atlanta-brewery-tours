import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import { API_URL, initQueryClient } from '../../app'
import { Tour, TOUR_QUERY } from '../../views'

export const getStaticPaths = async () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context
  const id = `${params?.id ?? ''}`
  const urqlState = await initQueryClient(TOUR_QUERY, { id })

  return {
    props: { urqlState },
    revalidate: 600,
  }
}

const TourPage = () => {
  const { query } = useRouter()
  return <Tour id={`${query.id}`} />
}

export default withUrqlClient(() => ({
  url: API_URL,
}))(TourPage)
