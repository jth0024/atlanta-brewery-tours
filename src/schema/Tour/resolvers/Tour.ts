import { isFullPage } from '@notionhq/client'
import {
  getCheckboxProperty,
  getNumberProperty,
  getRelationProperty,
  getRichTextProperty,
  getTitleProperty,
} from '../../../lib/notion-utils'
import type { TourResolvers } from '../../types.generated'
import { notionClient } from '../../utils'

export const Tour: TourResolvers = {
  breweries: async parent => {
    const property = getRelationProperty(parent, 'Breweries')

    const breweries = await Promise.all(
      property.relation.map(result =>
        notionClient.pages.retrieve({
          page_id: result.id,
        }),
      ),
    )

    return breweries.filter(isFullPage)
  },
  description: parent =>
    getRichTextProperty(parent, 'Description')
      .rich_text.map(text => text.plain_text)
      .join(' '),
  id: parent => parent.id,
  isFeatured: parent => getCheckboxProperty(parent, 'Featured').checkbox,
  name: parent =>
    getTitleProperty(parent, 'Name')
      .title.map(text => text.plain_text)
      .join(' '),
  distance: parent => getNumberProperty(parent, 'Distance').number,
  googleMapsLink: parent =>
    getRichTextProperty(parent, 'Google Maps Link')
      .rich_text.map(text => text.plain_text)
      .join(' '),
  googleMapsEmbed: parent =>
    getRichTextProperty(parent, 'Google Maps Embed')
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
