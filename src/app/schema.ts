/* eslint-disable no-underscore-dangle */
import { makeExecutableSchema } from '@graphql-tools/schema'
import { Client, isFullPage } from '@notionhq/client'
import {
  GetPageResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'
import { gql } from 'graphql-tag'
import { get } from 'lodash'

const auth = process.env.NOTION_API_KEY ?? ''
const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN ?? ''
const toursDB = process.env.NOTION_TOURS_DATABASE_ID ?? ''
const regionsDB = process.env.NOTION_REGIONS_DATABASE_ID ?? ''
const breweriesDB = process.env.NOTION_BREWERIES_DATABASE_ID ?? ''
const neighborhoodsDB = process.env.NOTION_NEIGHBORHOODS_DATABASE_ID ?? ''

export const client = new Client({ auth })

const typeDefs = gql`
  input TakeTourInput {
    firstName: String!
    lastName: String!
    email: String!
    tourID: String!
    tourName: String!
  }

  type TakeTourResult {
    tourID: String
  }

  type Mutation {
    takeTour(input: TakeTourInput): TakeTourResult!
  }

  input NeighborhoodsInput {
    slug: String
  }

  type Query {
    breweries: [Brewery!]!
    brewery(id: ID!): Brewery
    neighborhoods(filter: NeighborhoodsInput): [Neighborhood!]!
    neighborhood(id: ID!): Neighborhood
    regions: [Region!]!
    tours: [Tour!]!
    tour(id: ID!): Tour
  }

  type Brewery {
    id: ID!
    name: String
    neighborhood: Neighborhood
    address: String
  }

  type Neighborhood {
    id: ID!
    name: String
    description: String
    imageSrc: String
    slug: String
    regions: [Region!]!
  }

  type Tour {
    id: ID!
    isFeatured: Boolean
    name: String
    breweries: [Brewery!]!
    description: String
    distance: Float
    emailTemplateID: String
    neighborhood: Neighborhood
    googleMapsLink: String
  }

  type Region {
    id: ID!
    name: String
  }
`

const getCheckbox = (response: GetPageResponse, field: string): boolean =>
  get(response, ['properties', field, 'checkbox'], false)
const getId = (response: GetPageResponse): string => get(response, 'id', '')
const getImageFile = (response: GetPageResponse, field: string): string =>
  get(response, ['properties', field, 'files', 0, 'file', 'url'], '')
const getNumber = (response: GetPageResponse, field: string): number =>
  get(response, ['properties', field, 'number'], 0)
const getRichText = (response: GetPageResponse, field: string): string =>
  get(response, ['properties', field, 'rich_text'], [])
    .map(({ plain_text: plainText }: { plain_text: string }) => plainText)
    .join(' ')
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
  emailTemplateID: getRichText(response, 'Email Template ID'),
  googleMapsLink: getRichText(response, 'Google Maps Link'),
})

const resolvers = {
  Mutation: {
    async takeTour(
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
      const portalId = '40070077'
      const formGuid = '3ecf5083-ed79-4ddb-9130-a773c69d22af'
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
            value: input.firstName,
          },
          {
            objectTypeId: '0-1',
            name: 'lastname',
            value: input.lastName,
          },
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
        ],
      }

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
        return {
          tourID: input.tourID,
        }
      }

      throw new Error('An error occurred during form submission')
    },
  },
  Query: {
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

export const schema = makeExecutableSchema({ typeDefs, resolvers })
