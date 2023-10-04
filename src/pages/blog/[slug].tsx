import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import { API_URL, initQueryClient } from '../../app'
import { BLOG_POST_QUERY, BlogPost } from '../../views'

export const getStaticPaths = async () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context
  const slug = `${params?.slug}`
  const urqlState = await initQueryClient(BLOG_POST_QUERY, { slug })

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState,
    },
    revalidate: 6000,
  }
}

const BlogPostPage = () => {
  const { query } = useRouter()
  return <BlogPost slug={`${query.slug}`} />
}

export default withUrqlClient(() => ({
  url: API_URL,
}))(BlogPostPage)
