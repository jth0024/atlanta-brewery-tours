/* eslint-disable no-underscore-dangle, camelcase */
import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints'
import { first, get, toUpper } from 'lodash'
import {
  getCheckboxPropertyValue,
  getCreatedTimePropertyValue,
  getFilesPropertyValue,
  getMultiSelectPropertyValue,
  getNumberPropertyValue,
  getPageId,
  getRichTextPropertyValue,
  getSelectPropertyValue,
  getTitlePropertyValue,
  queryDatabase,
  retrievePage,
  retrievePageContent,
  retrieveRelation,
} from './notion'

const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN ?? ''
const toursDB = process.env.NOTION_TOURS_DATABASE_ID ?? ''
const regionsDB = process.env.NOTION_REGIONS_DATABASE_ID ?? ''
const breweriesDB = process.env.NOTION_BREWERIES_DATABASE_ID ?? ''
const blogPostsDB = process.env.NOTION_BLOG_POSTS_DATABASE_ID ?? ''
const neighborhoodsDB = process.env.NOTION_NEIGHBORHOODS_DATABASE_ID ?? ''

const blogPostMapper = (response: GetPageResponse) => ({
  _response: response,
  date: getCreatedTimePropertyValue(response, 'Created'),
  excerpt: getRichTextPropertyValue(response, 'Excerpt')
    .map(({ plain_text }) => plain_text)
    .join(' '),
  id: getPageId(response),
  imageSrc: first(
    getFilesPropertyValue(response, 'ImgSrc').map(src => {
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
  imageAltText: getRichTextPropertyValue(response, 'ImgAltText')
    .map(({ plain_text }) => plain_text)
    .join(' '),
  slug: getRichTextPropertyValue(response, 'Slug')
    .map(({ plain_text }) => plain_text)
    .join(' '),
  status: toUpper(getSelectPropertyValue(response, 'Status')?.name ?? 'DRAFT'),
  tags: getMultiSelectPropertyValue(response, 'Tags').map(({ name }) => name),
  title: getTitlePropertyValue(response, 'Title')
    .map(({ plain_text }) => plain_text)
    .join(' '),
})

const breweryMapper = (response: GetPageResponse) => ({
  _response: response,
  id: getPageId(response),
  name: getTitlePropertyValue(response, 'Name')
    .map(({ plain_text }) => plain_text)
    .join(' '),
  address: getRichTextPropertyValue(response, 'Address')
    .map(({ plain_text }) => plain_text)
    .join(' '),
})

const neighborhoodMapper = (response: GetPageResponse) => ({
  _regionsId: get(response, 'properties.Regions.id', ''),
  id: getPageId(response),
  imageSrc: first(
    getFilesPropertyValue(response, 'Image').map(src => {
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
  description: getRichTextPropertyValue(response, 'Description')
    .map(({ plain_text }) => plain_text)
    .join(' '),
  name: getTitlePropertyValue(response, 'Name')
    .map(({ plain_text }) => plain_text)
    .join(' '),
  slug: getRichTextPropertyValue(response, 'Slug')
    .map(({ plain_text }) => plain_text)
    .join(' '),
})

const regionMapper = (response: GetPageResponse) => ({
  _response: response,
  id: getPageId(response),
  // eslint-disable-next-line camelcase
  name: getTitlePropertyValue(response, 'Name')
    .map(({ plain_text }) => plain_text)
    .join(' '),
})

const tourMapper = (response: GetPageResponse) => ({
  _response: response,
  _breweriesId: get(response, 'properties.Breweries.id', ''),
  _neighborhoodId: get(response, 'properties.Neighborhood.id', ''),
  description: getRichTextPropertyValue(response, 'Description')
    .map(({ plain_text }) => plain_text)
    .join(' '),
  id: getPageId(response),
  isFeatured: getCheckboxPropertyValue(response, 'Featured'),
  name: getTitlePropertyValue(response, 'Name')
    .map(({ plain_text }) => plain_text)
    .join(' '),
  distance: getNumberPropertyValue(response, 'Distance'),
  googleMapsLink: getRichTextPropertyValue(response, 'Google Maps Link')
    .map(({ plain_text }) => plain_text)
    .join(' '),
  googleMapsEmbed: getRichTextPropertyValue(response, 'Google Maps Embed')
    .map(({ plain_text }) => plain_text)
    .join(' '),
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
          const tour = await retrievePage(input.tourID, tourMapper)
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
      return retrievePage(args.id, blogPostMapper)
    },
    async blogPostBySlug(_: null, args: { slug: string }) {
      const filter = {
        property: 'Slug',
        rich_text: {
          equals: args.slug,
        },
      }

      const results = await queryDatabase(blogPostsDB, blogPostMapper, filter)
      return results[0]
    },
    async blogPosts() {
      return queryDatabase(blogPostsDB, blogPostMapper)
    },
    async brewery(_: null, args: { id: string }) {
      return retrievePage(args.id, breweryMapper)
    },
    async breweries() {
      return queryDatabase(breweriesDB, breweryMapper)
    },
    async neighborhood(_: null, args: { id: string }) {
      return retrievePage(args.id, neighborhoodMapper)
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
      return queryDatabase(neighborhoodsDB, neighborhoodMapper, filter)
    },
    async regions() {
      return queryDatabase(regionsDB, regionMapper)
    },
    async tour(_: GetPageResponse, args: { id: string }) {
      return retrievePage(args.id, tourMapper)
    },
    async tours() {
      return queryDatabase(toursDB, tourMapper)
    },
  },
  BlogPost: {
    async content(parent: { id: string }) {
      const result = await retrievePageContent(parent.id)
      return JSON.stringify(result)
    },
  },
  Brewery: {
    async neighborhood(parent: { _neighborhoodId: string; id: string }) {
      const neighborhoods = await retrieveRelation(
        parent.id,
        parent._neighborhoodId,
        neighborhoodMapper,
      )
      return neighborhoods[0]
    },
  },
  Neighborhood: {
    async regions(parent: { _regionsId: string; id: string }) {
      return retrieveRelation(parent.id, parent._regionsId, regionMapper)
    },
  },
  Tour: {
    async breweries(parent: { _breweriesId: string; id: string }) {
      return retrieveRelation(parent.id, parent._breweriesId, breweryMapper)
    },
    async neighborhood(parent: { _neighborhoodId: string; id: string }) {
      const neighborhoods = await retrieveRelation(
        parent.id,
        parent._neighborhoodId,
        neighborhoodMapper,
      )
      return neighborhoods[0]
    },
  },
}
