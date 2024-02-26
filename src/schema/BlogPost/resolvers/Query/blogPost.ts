import { isFullPage } from '@notionhq/client'
import type { QueryResolvers } from '../../../types.generated'
import { notionClient } from '../../../utils'

export const blogPost: NonNullable<QueryResolvers['blogPost']> = async (
  _parent,
  _arg,
) => {
  const response = await notionClient.pages.retrieve({
    page_id: _arg.id,
  })

  if (!response) {
    throw new Error('Not found')
  }

  if (!isFullPage(response)) {
    throw new Error('Not a full page')
  }

  return response
}
