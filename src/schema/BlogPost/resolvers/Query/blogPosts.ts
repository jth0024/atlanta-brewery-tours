import { isFullPage } from '@notionhq/client'
import type { QueryResolvers } from '../../../types.generated'
import { queryBlogPostsDb } from '../../../utils'

export const blogPosts: NonNullable<QueryResolvers['blogPosts']> = async () => {
  try {
    const { results } = await queryBlogPostsDb()
    return results.filter(isFullPage)
  } catch (error) {
    return []
  }
}
