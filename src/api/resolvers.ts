/* eslint-disable no-underscore-dangle */
import { Client, isFullPage } from '@notionhq/client'
import {
  GetPageResponse,
  ListBlockChildrenResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'
import { get, identity, toUpper } from 'lodash'

const auth = process.env.NOTION_API_KEY ?? ''
const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN ?? ''
const toursDB = process.env.NOTION_TOURS_DATABASE_ID ?? ''
const regionsDB = process.env.NOTION_REGIONS_DATABASE_ID ?? ''
const breweriesDB = process.env.NOTION_BREWERIES_DATABASE_ID ?? ''
const blogPostsDB = process.env.NOTION_BLOG_POSTS_DATABASE_ID ?? ''
const neighborhoodsDB = process.env.NOTION_NEIGHBORHOODS_DATABASE_ID ?? ''

export const client = new Client({ auth })

const getCheckbox = (response: GetPageResponse, field: string): boolean =>
  get(response, ['properties', field, 'checkbox'], false)
const getCreatedTime = (response: GetPageResponse, field: string): string =>
  get(response, ['properties', field, 'created_time'], '')
const getId = (response: GetPageResponse): string => get(response, 'id', '')
const getImageFile = (response: GetPageResponse, field: string): string =>
  get(response, ['properties', field, 'files', 0, 'file', 'url'], '')
const getMultiSelect = (response: GetPageResponse, field: string): string[] =>
  get(response, ['properties', field, 'multi_select'], []).map(
    ({ name }: { name: string }) => name,
  )
const getNumber = (response: GetPageResponse, field: string): number =>
  get(response, ['properties', field, 'number'], 0)
const getRichText = (response: GetPageResponse, field: string): string =>
  get(response, ['properties', field, 'rich_text'], [])
    .map(({ plain_text: plainText }: { plain_text: string }) => plainText)
    .join(' ')
const getSelect = (
  response: GetPageResponse,
  field: string,
  fallback = '',
): string => get(response, ['properties', field, 'select', 'name'], fallback)
const getTitle = (response: GetPageResponse, field: string): string =>
  get(response, ['properties', field, 'title'], [])
    .map(({ plain_text: plainText }: { plain_text: string }) => plainText)
    .join(' ')

const queryDatabase = async (
  id: string,
  mapper: (response: GetPageResponse) => unknown,
  filter?: QueryDatabaseParameters['filter'],
) => {
  const { results } = await client.databases.query({
    database_id: id,
    filter,
  })
  return results.filter(isFullPage).map(mapper)
}

const retrievePage = async (
  id: string,
  mapper: (response: GetPageResponse) => unknown,
) => {
  const result = await client.pages.retrieve({ page_id: id })
  return mapper(result)
}

const retrievePageContent = async <T>(
  id: string,
  mapper: (response: ListBlockChildrenResponse) => T = identity,
) => {
  const result = await client.blocks.children.list({
    block_id: id,
  })
  return mapper(result)
}

const retrieveRelation = async (
  pageId: string,
  propertyId: string,
  mapper: (response: GetPageResponse) => unknown,
) => {
  const property = await client.pages.properties.retrieve({
    page_id: pageId,
    property_id: propertyId,
  })
  const pages = await Promise.all(
    get(property, 'results', []).map(result =>
      client.pages.retrieve({
        page_id: get(result, 'relation.id', ''),
      }),
    ),
  )
  return pages.map(mapper)
}

const toBlogPost = (response: GetPageResponse) => ({
  date: getCreatedTime(response, 'Created'),
  excerpt: getRichText(response, 'Excerpt'),
  id: getId(response),
  imageSrc: getImageFile(response, 'Image'),
  slug: getRichText(response, 'Slug'),
  status: toUpper(getSelect(response, 'Status', 'DRAFT')),
  tags: getMultiSelect(response, 'Tags'),
  title: getTitle(response, 'Title'),
})

const toBrewery = (response: GetPageResponse) => ({
  _neighborhoodId: get(response, 'properties.Neighborhood.id', ''),
  id: getId(response),
  name: getTitle(response, 'Name'),
  address: getRichText(response, 'Address'),
})

const toNeighborhood = (response: GetPageResponse) => ({
  _regionsId: get(response, 'properties.Regions.id', ''),
  id: getId(response),
  imageSrc: getImageFile(response, 'Image'),
  description: getRichText(response, 'Description'),
  name: getTitle(response, 'Name'),
  slug: getRichText(response, 'Slug'),
})

const toRegion = (response: GetPageResponse) => ({
  id: getId(response),
  name: getTitle(response, 'Name'),
})

const toTour = (response: GetPageResponse) => ({
  _breweriesId: get(response, 'properties.Breweries.id', ''),
  _neighborhoodId: get(response, 'properties.Neighborhood.id', ''),
  description: getRichText(response, 'Description'),
  id: getId(response),
  isFeatured: getCheckbox(response, 'Featured'),
  name: getTitle(response, 'Name'),
  distance: getNumber(response, 'Distance'),
  googleMapsLink: getRichText(response, 'Google Maps Link'),
  googleMapsEmbed: getRichText(response, 'Google Maps Embed'),
})

export const resolvers = {
  Mutation: {
    async createSubscriber(
      _: null,
      args: {
        input: {
          firstName: string
          lastName: string
          email: string
          tourID: string
          tourName: string
        }
      },
    ) {
      const { input } = args
      const data = {
        fields: [
          {
            objectTypeId: '0-1',
            name: 'email',
            value: input.email,
          },
          {
            objectTypeId: '0-1',
            name: 'firstname',
            value: input.firstName ?? '',
          },
          {
            objectTypeId: '0-1',
            name: 'lastname',
            value: input.lastName ?? '',
          },
        ],
      }

      if (input.tourID && input.tourName) {
        data.fields.push(
          {
            objectTypeId: '0-1',
            name: 'tour_url',
            value: `https://atlantabrewerytours.com/tours/${input.tourID}`,
          },
          {
            objectTypeId: '0-1',
            name: 'tour_name',
            value: input.tourName,
          },
        )
      }

      const portalId = '40070077'
      const fromTourFormGuid = '3ecf5083-ed79-4ddb-9130-a773c69d22af'
      const fromFooterFormGuid = '408e3acf-88cf-4227-8d3d-4a1e8ea9b029'
      const formGuid =
        input.tourID && input.tourName ? fromTourFormGuid : fromFooterFormGuid

      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/secure/submit/${portalId}/${formGuid}`,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${hubspotToken}`,
            'Content-Type': 'application/json',
          },
        },
      )

      const result = await response.json()

      if (result.inlineMessage) {
        const subscriber = {
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
        }

        if (input.tourID && input.tourName) {
          const tour = await retrievePage(input.tourID, toTour)
          return { subscriber, tour }
        }

        return {
          subscriber,
        }
      }

      throw new Error('An error occurred during form submission')
    },
  },
  Query: {
    async blogPost(_: null, args: { id: string }) {
      return retrievePage(args.id, toBlogPost)
    },
    async blogPostBySlug(_: null, args: { slug: string }) {
      const filter = {
        property: 'Slug',
        rich_text: {
          equals: args.slug,
        },
      }

      const results = await queryDatabase(blogPostsDB, toBlogPost, filter)
      return results[0]
    },
    async blogPosts() {
      return queryDatabase(blogPostsDB, toBlogPost)
    },
    async brewery(_: null, args: { id: string }) {
      return retrievePage(args.id, toBrewery)
    },
    async breweries() {
      return queryDatabase(breweriesDB, toBrewery)
    },
    async neighborhood(_: null, args: { id: string }) {
      return retrievePage(args.id, toNeighborhood)
    },
    async neighborhoods(_: null, args: { filter?: { slug?: string } }) {
      const filter = args.filter?.slug
        ? {
            property: 'Slug',
            rich_text: {
              equals: args.filter.slug,
            },
          }
        : undefined
      return queryDatabase(neighborhoodsDB, toNeighborhood, filter)
    },
    async regions() {
      return queryDatabase(regionsDB, toRegion)
    },
    async tour(_: GetPageResponse, args: { id: string }) {
      return retrievePage(args.id, toTour)
    },
    async tours() {
      return queryDatabase(toursDB, toTour)
    },
  },
  BlogPost: {
    async content(parent: { id: string }) {
      console.log(parent)
      const result = await retrievePageContent(parent.id)
      return JSON.stringify(result)
    },
  },
  Brewery: {
    async neighborhood(parent: { _neighborhoodId: string; id: string }) {
      const neighborhoods = await retrieveRelation(
        parent.id,
        parent._neighborhoodId,
        toNeighborhood,
      )
      return neighborhoods[0]
    },
  },
  Neighborhood: {
    async regions(parent: { _regionsId: string; id: string }) {
      return retrieveRelation(parent.id, parent._regionsId, toRegion)
    },
  },
  Tour: {
    async breweries(parent: { _breweriesId: string; id: string }) {
      return retrieveRelation(parent.id, parent._breweriesId, toBrewery)
    },
    async neighborhood(parent: { _neighborhoodId: string; id: string }) {
      const neighborhoods = await retrieveRelation(
        parent.id,
        parent._neighborhoodId,
        toNeighborhood,
      )
      return neighborhoods[0]
    },
  },
}
