import { isFullPage } from '@notionhq/client'
import type { QueryResolvers } from '../../../types.generated'
import { queryToursDb } from '../../../utils'

export const tours: NonNullable<QueryResolvers['tours']> = async () => {
  const { results } = await queryToursDb()

  return results.filter(isFullPage)
}
