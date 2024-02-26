import { isFullPage } from '@notionhq/client'
import type {
  GetPageResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

type PageProperty = PageObjectResponse['properties'][string]

type PagePropertyType = PageProperty['type']

type PagePropertyOfType<T extends string> = Extract<PageProperty, { type: T }>

const getPageProperty = (
  response: GetPageResponse,
  name: string,
): PageProperty => {
  if (!isFullPage(response)) {
    throw new Error('Response is not a full page')
  }

  const property = response.properties[name]

  if (!property) {
    throw new Error(`Property ${name} does not exist`)
  }

  return property
}

type PropertyGetter<T extends PagePropertyType> = (
  responnse: GetPageResponse,
  propertyName: string,
) => PagePropertyOfType<T>

export const createPropertyGetterOfType =
  <T extends PagePropertyType>(type: T): PropertyGetter<T> =>
  (response: GetPageResponse, propertyName: string): PagePropertyOfType<T> => {
    const property = getPageProperty(response, propertyName)

    if (property.type !== type) {
      throw new Error(`Property ${propertyName} is not of type ${type}`)
    }

    return property as PagePropertyOfType<T>
  }

export type CheckboxProperty = PagePropertyOfType<'checkbox'>
export const getCheckboxProperty = createPropertyGetterOfType('checkbox')

export type CreatedByProperty = PagePropertyOfType<'created_by'>
export const getCreatedByProperty = createPropertyGetterOfType('created_by')

export type CreatedTimeProperty = PagePropertyOfType<'created_time'>
export const getCreatedTimeProperty = createPropertyGetterOfType('created_time')

export type DateProperty = PagePropertyOfType<'date'>
export const getDateProperty = createPropertyGetterOfType('date')

export type EmailProperty = PagePropertyOfType<'email'>
export const getEmailProperty = createPropertyGetterOfType('email')

export type FilesProperty = PagePropertyOfType<'files'>
export const getFilesProperty = createPropertyGetterOfType('files')

export type FormulaProperty = PagePropertyOfType<'formula'>
export const getFormulaProperty = createPropertyGetterOfType('formula')

export type LastEditedByProperty = PagePropertyOfType<'last_edited_by'>
export const getLastEditedByProperty =
  createPropertyGetterOfType('last_edited_by')

export type LastEditedTimeProperty = PagePropertyOfType<'last_edited_time'>
export const getLastEditedTimeProperty =
  createPropertyGetterOfType('last_edited_time')

export type MultiSelectProperty = PagePropertyOfType<'multi_select'>
export const getMultiSelectProperty = createPropertyGetterOfType('multi_select')

export type NumberProperty = PagePropertyOfType<'number'>
export const getNumberProperty = createPropertyGetterOfType('number')

export type PeopleProperty = PagePropertyOfType<'people'>
export const getPeopleProperty = createPropertyGetterOfType('people')

export type PhoneNumberProperty = PagePropertyOfType<'phone_number'>
export const getPhoneNumberProperty = createPropertyGetterOfType('phone_number')

export type RelationProperty = PagePropertyOfType<'relation'>
export const getRelationProperty = createPropertyGetterOfType('relation')

export type RichTextProperty = PagePropertyOfType<'rich_text'>
export const getRichTextProperty = createPropertyGetterOfType('rich_text')

export type RollupProperty = PagePropertyOfType<'rollup'>
export const getRollupProperty = createPropertyGetterOfType('rollup')

export type SelectProperty = PagePropertyOfType<'select'>
export const getSelectProperty = createPropertyGetterOfType('select')

export type StatusProperty = PagePropertyOfType<'status'>
export const getStatusProperty = createPropertyGetterOfType('status')

export type TitleProperty = PagePropertyOfType<'title'>
export const getTitleProperty = createPropertyGetterOfType('title')

export type UrlProperty = PagePropertyOfType<'url'>
export const getUrlProperty = createPropertyGetterOfType('url')
