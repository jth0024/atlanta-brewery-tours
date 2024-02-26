// import {
//   RelationProperty,
//   RichTextProperty,
//   TitleProperty,
// } from '../../lib/notion-utils'

// interface BreweryProperties {
//   Name: TitleProperty
//   Address: RichTextProperty
//   Neighborhood: RelationProperty
// }

// export interface BreweryMapper {
//   id: string
//   properties: BreweryProperties
// }
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export type BreweryMapper = PageObjectResponse
