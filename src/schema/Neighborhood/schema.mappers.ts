// import {
//   FilesProperty,
//   RelationProperty,
//   RichTextProperty,
//   TitleProperty,
// } from '../../lib/notion-utils'

// interface NeighborhoodProperties {
//   Name: TitleProperty
//   Description: RichTextProperty
//   Image: FilesProperty
//   Regions: RelationProperty
//   Slug: RichTextProperty
// }

// export interface NeighborhoodMapper {
//   id: string
//   properties: NeighborhoodProperties
// }
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export type NeighborhoodMapper = PageObjectResponse
