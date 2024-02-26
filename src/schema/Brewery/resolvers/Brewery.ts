import { isFullPage } from '@notionhq/client'
import {
  getRelationProperty,
  getRichTextProperty,
  getTitleProperty,
} from '../../../lib/notion-utils'
import type { BreweryResolvers } from '../../types.generated'
import { notionClient } from '../../utils'

export const Brewery: BreweryResolvers = {
  id: parent => parent.id,
  name: parent =>
    getTitleProperty(parent, 'Name')
      .title.map(text => text.plain_text)
      .join(' '),
  address: parent =>
    getRichTextProperty(parent, 'Address')
      .rich_text.map(text => text.plain_text)
      .join(' '),
  neighborhood: async parent => {
    const property = getRelationProperty(parent, 'Neighborhood')
    const { id } = property.relation[0] ?? { id: '' }

    if (!id) {
      return null
    }

    const response = await notionClient.pages.retrieve({
      page_id: id,
    })

    if (!isFullPage(response)) {
      return null
    }

    return response
  },
}
