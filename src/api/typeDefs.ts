import { gql } from 'graphql-tag'

export const typeDefs = gql`
  enum BlogPostStatus {
    DRAFT
    PUBLISHED
  }

  type BlogPost {
    id: ID!
    title: String!
    slug: String!
    date: String!
    excerpt: String!
    content: String!
    imageSrc: String
    imageAltText: String
    tags: [String!]!
    status: BlogPostStatus!
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

  type Region {
    id: ID!
    name: String
  }

  type Subscriber {
    email: String!
    firstName: String
    lastName: String
  }

  type Tour {
    id: ID!
    isFeatured: Boolean
    name: String
    breweries: [Brewery!]!
    description: String
    distance: Float
    neighborhood: Neighborhood
    googleMapsLink: String
    googleMapsEmbed: String
  }

  input CreateSubscriberInput {
    email: String!
    firstName: String
    lastName: String
    tourName: String
    tourID: String
  }

  type CreateSubscriberResult {
    subscriber: Subscriber!
    tour: Tour
  }

  type Mutation {
    createSubscriber(input: CreateSubscriberInput!): CreateSubscriberResult!
  }

  input NeighborhoodsInput {
    slug: String
  }

  type Query {
    blogPost(id: ID!): BlogPost
    blogPostBySlug(slug: String!): BlogPost
    blogPosts: [BlogPost!]!
    breweries: [Brewery!]!
    brewery(id: ID!): Brewery
    neighborhoods(filter: NeighborhoodsInput): [Neighborhood!]!
    neighborhood(id: ID!): Neighborhood
    regions: [Region!]!
    tours: [Tour!]!
    tour(id: ID!): Tour
  }
`
