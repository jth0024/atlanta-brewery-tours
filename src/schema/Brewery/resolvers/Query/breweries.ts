import { isFullPage } from '@notionhq/client'
import type { QueryResolvers } from '../../../types.generated'
import { queryBreweriesDb } from '../../../utils'

export const breweries: NonNullable<QueryResolvers['breweries']> = async () => {
  const { results } = await queryBreweriesDb()

  return results.filter(isFullPage)
}
