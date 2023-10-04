import Head from 'next/head'
import { withUrqlClient } from 'next-urql'
import { API_URL, initQueryClient } from '../app'
import { Home, HOME_QUERY } from '../views/Home'

export const getStaticProps = async () => {
  const urqlState = await initQueryClient(HOME_QUERY, {})

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState,
      revalidate: 6000,
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
