import { isFullPage } from '@notionhq/client'
import type { QueryResolvers } from '../../../types.generated'
import { queryBlogPostsDb } from '../../../utils'

export const blogPostBySlug: NonNullable<
  QueryResolvers['blogPostBySlug']
> = async (_parent, _arg) => {
  const results = await queryBlogPostsDb({
    filter: {
      property: 'Slug',
      rich_text: {
        equals: _arg.slug,
      },
    },
  })

  if (results.results.length === 0) {
    return null
  }

  const firstResult = results.results[0]
  if (!isFullPage(firstResult)) {
    return null
  }

  return firstResult
}
