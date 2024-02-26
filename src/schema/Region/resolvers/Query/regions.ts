import { isFullPage } from '@notionhq/client'
import type { QueryResolvers } from '../../../types.generated'
import { queryRegionsDb } from '../../../utils'

export const regions: NonNullable<QueryResolvers['regions']> = async () => {
  const { results } = await queryRegionsDb()

  return results.filter(isFullPage)
}
