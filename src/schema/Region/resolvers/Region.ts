import { getTitleProperty } from '../../../lib/notion-utils'
import type { RegionResolvers } from '../../types.generated'

export const Region: RegionResolvers = {
  id: parent => parent.id,
  name: parent =>
    getTitleProperty(parent, 'Name')
      .title.map(text => text.plain_text)
      .join(' '),
}
