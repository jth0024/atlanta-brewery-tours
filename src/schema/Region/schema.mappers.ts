// import { TitleProperty } from '../../lib/notion-utils'

// interface RegionProperties {
//   Name: TitleProperty
// }

// export interface RegionMapper {
//   id: string
//   properties: RegionProperties
// }
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export type RegionMapper = PageObjectResponse
