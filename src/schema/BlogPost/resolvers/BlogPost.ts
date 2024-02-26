import { first, toUpper } from 'lodash'
import {
  getCreatedTimeProperty,
  getFilesProperty,
  getMultiSelectProperty,
  getRichTextProperty,
  getSelectProperty,
  getTitleProperty,
} from '../../../lib/notion-utils'
import type { BlogPostResolvers, BlogPostStatus } from '../../types.generated'
import { notionClient } from '../../utils'

export const BlogPost: BlogPostResolvers = {
  async content(parent) {
    const result = await notionClient.blocks.children.list({
      block_id: parent.id,
    })
    return JSON.stringify(result)
  },
  id: parent => parent.id,
  date: parent => getCreatedTimeProperty(parent, 'Created').created_time,
  excerpt: parent =>
    getRichTextProperty(parent, 'Excerpt')
      .rich_text.map(text => text.plain_text)
      .join(' '),
  imageAltText: parent =>
    getRichTextProperty(parent, 'ImgAltText')
      .rich_text.map(text => text.plain_text)
      .join(' '),
  imageSrc: parent =>
    first(
      getFilesProperty(parent, 'ImgSrc').files.map(src => {
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
  slug: parent =>
    getRichTextProperty(parent, 'Slug')
      .rich_text.map(text => text.plain_text)
      .join(' '),
  status: parent =>
    toUpper(
      getSelectProperty(parent, 'Status').select?.name ?? 'DRAFT',
    ) as BlogPostStatus,
  tags: parent =>
    getMultiSelectProperty(parent, 'Tags').multi_select.map(({ name }) => name),
  title: parent =>
    getTitleProperty(parent, 'Title')
      .title.map(text => text.plain_text)
      .join(' '),
}
