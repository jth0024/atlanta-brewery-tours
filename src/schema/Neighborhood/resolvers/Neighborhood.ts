import { isFullPage } from '@notionhq/client'
import { first } from 'lodash'
import {
  getFilesProperty,
  getRelationProperty,
  getRichTextProperty,
  getTitleProperty,
} from '../../../lib/notion-utils'
import type { NeighborhoodResolvers } from '../../types.generated'
import { notionClient } from '../../utils'

export const Neighborhood: NeighborhoodResolvers = {
  id: parent => parent.id,
  description: parent =>
    getRichTextProperty(parent, 'Description')
      .rich_text.map(text => text.plain_text)
      .join(' '),
  imageSrc: parent =>
    first(
      getFilesProperty(parent, 'Image').files.map(src => {
        switch (src.type) {
          case 'external':
            return src.external.url
          case 'file':
            return src.file.url
          default:
            return ''
        }
      }),
    ),
  name: parent =>
    getTitleProperty(parent, 'Name')
      .title.map(text => text.plain_text)
      .join(' '),
  regions: async parent => {
    const property = getRelationProperty(parent, 'Regions')
    const regions = await Promise.all(
      property.relation.map(result =>
        notionClient.pages.retrieve({
          page_id: result.id,
        }),
      ),
    )

    return regions.filter(isFullPage)
  },
  slug: parent =>
    getRichTextProperty(parent, 'Slug')
      .rich_text.map(text => text.plain_text)
      .join(' '),
}
