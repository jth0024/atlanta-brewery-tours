/* eslint-disable no-underscore-dangle */
import { Client, isFullPage } from '@notionhq/client'
import {
  GetPageResponse,
  ListBlockChildrenResponse,
  PageObjectResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'
import { get, identity } from 'lodash'

const auth = process.env.NOTION_API_KEY ?? ''

export const client = new Client({ auth })

export type PageResponseMapper = <T>(response: GetPageResponse) => T

export const queryDatabase = async <T>(
  id: string,
  mapper: (response: GetPageResponse) => T,
  filter?: QueryDatabaseParameters['filter'],
) => {
  const { results } = await client.databases.query({
    database_id: id,
    filter,
  })
  return results.filter(isFullPage).map(mapper)
}

export const retrievePage = async <T>(
  id: string,
  mapper: (response: GetPageResponse) => T,
): Promise<T> => {
  const result = await client.pages.retrieve({ page_id: id })
  return mapper(result)
}

export const retrievePageContent = async <T>(
  id: string,
  mapper: (response: ListBlockChildrenResponse) => T = identity,
) => {
  const result = await client.blocks.children.list({
    block_id: id,
  })
  return mapper(result)
}

export const retrieveRelation = async <T>(
  pageId: string,
  propertyId: string,
  mapper: (response: GetPageResponse) => T,
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

export const getPageId = (response: GetPageResponse): string => response.id
export const getPageProperty = (
  response: GetPageResponse,
  name: string,
): PageObjectResponse['properties'][typeof name] => {
  if (!isFullPage(response)) {
    throw new Error('Response is not a full page')
  }

  const property = response.properties[name]

  if (!property) {
    throw new Error(`Property ${name} does not exist`)
  }

  return property
}

// Number
const getNumberProperty = (response: GetPageResponse, name: string) => {
  const property = getPageProperty(response, name)

  if (property.type !== 'number') {
    throw new Error(`Property ${name} is not a number property`)
  }

  return property
}

export const getNumberPropertyValue = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getNumberProperty(response, name)
  return property.number
}

// URL
export const getUrlProperty = (response: GetPageResponse, name: string) => {
  const property = getPageProperty(response, name)

  if (property.type !== 'url') {
    throw new Error(`Property ${name} is not a url property`)
  }

  return property
}

export const getUrlPropertyValue = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getUrlProperty(response, name)
  return property.url
}

// Select
export const getSelectProperty = (response: GetPageResponse, name: string) => {
  const property = getPageProperty(response, name)

  if (property.type !== 'select') {
    throw new Error(`Property ${name} is not a select property`)
  }

  return property
}

export const getSelectPropertyValue = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getSelectProperty(response, name)
  return property.select
}

// Multi-Select
export const getMultiSelectProperty = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getPageProperty(response, name)

  if (property.type !== 'multi_select') {
    throw new Error(`Property ${name} is not a multi_select property`)
  }

  return property
}

export const getMultiSelectPropertyValue = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getMultiSelectProperty(response, name)
  return property.multi_select
}

// Status
export const getStatusProperty = (response: GetPageResponse, name: string) => {
  const property = getPageProperty(response, name)

  if (property.type !== 'status') {
    throw new Error(`Property ${name} is not a status property`)
  }

  return property
}

export const getStatusPropertyValue = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getStatusProperty(response, name)
  return property.status
}

// Date
export const getDateProperty = (response: GetPageResponse, name: string) => {
  const property = getPageProperty(response, name)

  if (property.type !== 'date') {
    throw new Error(`Property ${name} is not a date property`)
  }

  return property
}

export const getDatePropertyValue = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getDateProperty(response, name)
  return property.date
}

// Email
export const getEmailProperty = (response: GetPageResponse, name: string) => {
  const property = getPageProperty(response, name)

  if (property.type !== 'email') {
    throw new Error(`Property ${name} is not a email property`)
  }

  return property
}

export const getEmailPropertyValue = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getEmailProperty(response, name)
  return property.email
}

// Phone Number
export const getPhoneNumberProperty = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getPageProperty(response, name)

  if (property.type !== 'phone_number') {
    throw new Error(`Property ${name} is not a phone_number property`)
  }

  return property
}

export const getPhoneNumberPropertyValue = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getPhoneNumberProperty(response, name)
  return property.phone_number
}

// Checkbox
export const getCheckboxProperty = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getPageProperty(response, name)

  if (property.type !== 'checkbox') {
    throw new Error(`Property ${name} is not a checkbox property`)
  }

  return property
}

export const getCheckboxPropertyValue = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getCheckboxProperty(response, name)
  return property.checkbox
}

// Files
export const getFilesProperty = (response: GetPageResponse, name: string) => {
  const property = getPageProperty(response, name)

  if (property.type !== 'files') {
    throw new Error(`Property ${name} is not a files property`)
  }

  return property
}

export const getFilesPropertyValue = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getFilesProperty(response, name)
  return property.files
}

// Created By
export const getCreatedByProperty = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getPageProperty(response, name)

  if (property.type !== 'created_by') {
    throw new Error(`Property ${name} is not a created_by property`)
  }

  return property
}

export const getCreatedByPropertyValue = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getCreatedByProperty(response, name)
  return property.created_by
}

// Created Time
export const getCreatedTimeProperty = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getPageProperty(response, name)

  if (property.type !== 'created_time') {
    throw new Error(`Property ${name} is not a created_time property`)
  }

  return property
}

export const getCreatedTimePropertyValue = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getCreatedTimeProperty(response, name)
  return property.created_time
}

// Last Edited By
export const getLastEditedByProperty = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getPageProperty(response, name)

  if (property.type !== 'last_edited_by') {
    throw new Error(`Property ${name} is not a last_edited_by property`)
  }

  return property
}

export const getLastEditedByPropertyValue = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getLastEditedByProperty(response, name)
  return property.last_edited_by
}

// Last Edited Time
export const getLastEditedTimeProperty = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getPageProperty(response, name)

  if (property.type !== 'last_edited_time') {
    throw new Error(`Property ${name} is not a last_edited_time property`)
  }

  return property
}

export const getLastEditedTimePropertyValue = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getLastEditedTimeProperty(response, name)
  return property.last_edited_time
}

// Formula
export const getFormulaProperty = (response: GetPageResponse, name: string) => {
  const property = getPageProperty(response, name)

  if (property.type !== 'formula') {
    throw new Error(`Property ${name} is not a formula property`)
  }

  return property
}

export const getFormulaPropertyValue = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getFormulaProperty(response, name)
  return property.formula
}

// Title
export const getTitleProperty = (response: GetPageResponse, name: string) => {
  const property = getPageProperty(response, name)

  if (property.type !== 'title') {
    throw new Error(`Property ${name} is not a title property`)
  }

  return property
}

export const getTitlePropertyValue = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getTitleProperty(response, name)
  return property.title
}

// Rich Text
export const getRichTextProperty = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getPageProperty(response, name)

  if (property.type !== 'rich_text') {
    throw new Error(`Property ${name} is not a rich_text property`)
  }

  return property
}

export const getRichTextPropertyValue = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getRichTextProperty(response, name)
  return property.rich_text
}

// People
export const getPeopleProperty = (response: GetPageResponse, name: string) => {
  const property = getPageProperty(response, name)

  if (property.type !== 'people') {
    throw new Error(`Property ${name} is not a people property`)
  }

  return property
}

export const getPeoplePropertyValue = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getPeopleProperty(response, name)
  return property.people
}

// Relation
export const getRelationProperty = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getPageProperty(response, name)

  if (property.type !== 'relation') {
    throw new Error(`Property ${name} is not a relation property`)
  }

  return property
}

export const getRelationPropertyValue = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getRelationProperty(response, name)
  return property.relation
}

// Rollup
export const getRollupProperty = (response: GetPageResponse, name: string) => {
  const property = getPageProperty(response, name)

  if (property.type !== 'rollup') {
    throw new Error(`Property ${name} is not a rollup property`)
  }

  return property
}

export const getRollupPropertyValue = (
  response: GetPageResponse,
  name: string,
) => {
  const property = getRollupProperty(response, name)
  return property.rollup
}

// const getNumber = (response: GetPageResponse, name: string): number =>
//   get(response, ['properties', name, 'number'], 0)
// const getRichText = (response: GetPageResponse, name: string): string =>
//   get(response, ['properties', name, 'rich_text'], [])
//     .map(({ plain_text: plainText }: { plain_text: string }) => plainText)
//     .join(' ')
// const getSelect = (
//   response: GetPageResponse,
//   name: string,
//   fallback = '',
// ): string => get(response, ['properties', name, 'select', 'name'], fallback)
// const getTitle = (response: GetPageResponse, name: string): string =>
//   get(response, ['properties', name, 'title'], [])
//     .map(({ plain_text: plainText }: { plain_text: string }) => plainText)
//     .join(' ')
