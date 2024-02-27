import { isFullPage } from '@notionhq/client'
import type { QueryResolvers } from '../../../types.generated'
import { queryNeighborhoodsDb } from '../../../utils'

export const neighborhoods: NonNullable<
  QueryResolvers['neighborhoods']
> = async (_parent, _arg) => {
  const filter = _arg.filter?.slug
    ? {
        property: 'Slug',
        rich_text: {
          equals: _arg.filter.slug,
        },
      }
    : undefined

  const { results } = await queryNeighborhoodsDb({ filter })

  return results.filter(isFullPage)
}
