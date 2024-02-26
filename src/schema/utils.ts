import { Client } from '@notionhq/client'

const auth = process.env.NOTION_API_KEY ?? ''

export const notionClient = new Client({ auth })

export const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN ?? ''

const toursDB = process.env.NOTION_TOURS_DATABASE_ID ?? ''
const regionsDB = process.env.NOTION_REGIONS_DATABASE_ID ?? ''
const breweriesDB = process.env.NOTION_BREWERIES_DATABASE_ID ?? ''
const blogPostsDB = process.env.NOTION_BLOG_POSTS_DATABASE_ID ?? ''
const neighborhoodsDB = process.env.NOTION_NEIGHBORHOODS_DATABASE_ID ?? ''

export const queryBlogPostsDb = async (
  args: Omit<
    Parameters<typeof notionClient.databases.query>[0],
    'database_id'
  > = {},
) =>
  notionClient.databases.query({
    database_id: blogPostsDB,
    ...args,
  })

export const queryBreweriesDb = async (
  args: Omit<
    Parameters<typeof notionClient.databases.query>[0],
    'database_id'
  > = {},
) =>
  notionClient.databases.query({
    database_id: breweriesDB,
    ...args,
  })

export const queryRegionsDb = async (
  args: Omit<
    Parameters<typeof notionClient.databases.query>[0],
    'database_id'
  > = {},
) =>
  notionClient.databases.query({
    database_id: regionsDB,
    ...args,
  })

export const queryToursDb = async (
  args: Omit<
    Parameters<typeof notionClient.databases.query>[0],
    'database_id'
  > = {},
) =>
  notionClient.databases.query({
    database_id: toursDB,
    ...args,
  })

export const queryNeighborhoodsDb = async (
  args: Omit<
    Parameters<typeof notionClient.databases.query>[0],
    'database_id'
  > = {},
) =>
  notionClient.databases.query({
    database_id: neighborhoodsDB,
    ...args,
  })
