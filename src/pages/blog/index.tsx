import Head from 'next/head'
import { withUrqlClient } from 'next-urql'
import { API_URL, initQueryClient } from '../../app'
import { Blog, BLOG_QUERY } from '../../views'

export const getStaticProps = async () => {
  const urqlState = await initQueryClient(BLOG_QUERY, {})
  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState,
      revalidate: 6000,
    },
  }
}

const BlogPage = () => (
  <>
    <Head>
      <title>Blog | Atlanta Brewery Tours</title>
      <link rel="canonical" href="https://www.atlantabrewerytours.com/blog" />
    </Head>
    <Blog />
  </>
)

export default withUrqlClient(
  () => ({
    url: API_URL,
  }),
  {
    staleWhileRevalidate: true,
  },
)(BlogPage)
