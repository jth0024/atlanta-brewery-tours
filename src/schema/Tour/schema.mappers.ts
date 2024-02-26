// import {
//   CheckboxProperty,
//   NumberProperty,
//   RelationProperty,
//   RichTextProperty,
//   TitleProperty,
// } from '../../lib/notion-utils'

// interface TourProperties {
//   Breweries: RelationProperty
//   Description: RichTextProperty
//   Distance: NumberProperty
//   Featured: CheckboxProperty
//   Name: TitleProperty
//   Neighborhood: RelationProperty
//   'Google Maps Link': RichTextProperty
//   'Google Maps Embed': RichTextProperty
// }

// export interface TourMapper {
//   id: string
//   properties: TourProperties
// }
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export type TourMapper = PageObjectResponse
