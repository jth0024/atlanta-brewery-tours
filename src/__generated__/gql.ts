/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  mutation CreateSubscriber($input: CreateSubscriberInput!) {\n    createSubscriber(input: $input) {\n      subscriber {\n        email\n      }\n    }\n  }\n": types.CreateSubscriberDocument,
    "\n  query Blog {\n    blogPosts {\n      date\n      excerpt\n      id\n      imageSrc\n      imageAltText\n      status\n      slug\n      tags\n      title\n    }\n  }\n": types.BlogDocument,
    "\n  query BlogPost($slug: String!) {\n    blogPost: blogPostBySlug(slug: $slug) {\n      content\n      date\n      excerpt\n      id\n      imageSrc\n      imageAltText\n      slug\n      status\n      title\n      tags\n    }\n  }\n": types.BlogPostDocument,
    "\n  query Home {\n    tours {\n      id\n      distance\n      description\n      breweries {\n        id\n      }\n      name\n      isFeatured\n      neighborhood {\n        id\n        name\n        regions {\n          id\n        }\n      }\n    }\n    regions {\n      id\n      name\n    }\n  }\n": types.HomeDocument,
    "\n  mutation CreateSubscriberFromTour($input: CreateSubscriberInput!) {\n    createSubscriber(input: $input) {\n      tour {\n        id\n      }\n    }\n  }\n": types.CreateSubscriberFromTourDocument,
    "\n  query Neighborhood($slug: String!) {\n    neighborhoods(filter: { slug: $slug }) {\n      id\n      imageSrc\n      name\n      slug\n    }\n    tours {\n      id\n      name\n      description\n      distance\n      breweries {\n        id\n      }\n      neighborhood {\n        id\n      }\n    }\n  }\n": types.NeighborhoodDocument,
    "\n  query Tour($id: ID!) {\n    tour(id: $id) {\n      id\n      name\n      distance\n      description\n      googleMapsLink\n      googleMapsEmbed\n      breweries {\n        id\n        name\n        address\n      }\n      neighborhood {\n        id\n      }\n    }\n  }\n": types.TourDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateSubscriber($input: CreateSubscriberInput!) {\n    createSubscriber(input: $input) {\n      subscriber {\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSubscriber($input: CreateSubscriberInput!) {\n    createSubscriber(input: $input) {\n      subscriber {\n        email\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Blog {\n    blogPosts {\n      date\n      excerpt\n      id\n      imageSrc\n      imageAltText\n      status\n      slug\n      tags\n      title\n    }\n  }\n"): (typeof documents)["\n  query Blog {\n    blogPosts {\n      date\n      excerpt\n      id\n      imageSrc\n      imageAltText\n      status\n      slug\n      tags\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query BlogPost($slug: String!) {\n    blogPost: blogPostBySlug(slug: $slug) {\n      content\n      date\n      excerpt\n      id\n      imageSrc\n      imageAltText\n      slug\n      status\n      title\n      tags\n    }\n  }\n"): (typeof documents)["\n  query BlogPost($slug: String!) {\n    blogPost: blogPostBySlug(slug: $slug) {\n      content\n      date\n      excerpt\n      id\n      imageSrc\n      imageAltText\n      slug\n      status\n      title\n      tags\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Home {\n    tours {\n      id\n      distance\n      description\n      breweries {\n        id\n      }\n      name\n      isFeatured\n      neighborhood {\n        id\n        name\n        regions {\n          id\n        }\n      }\n    }\n    regions {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query Home {\n    tours {\n      id\n      distance\n      description\n      breweries {\n        id\n      }\n      name\n      isFeatured\n      neighborhood {\n        id\n        name\n        regions {\n          id\n        }\n      }\n    }\n    regions {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateSubscriberFromTour($input: CreateSubscriberInput!) {\n    createSubscriber(input: $input) {\n      tour {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSubscriberFromTour($input: CreateSubscriberInput!) {\n    createSubscriber(input: $input) {\n      tour {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Neighborhood($slug: String!) {\n    neighborhoods(filter: { slug: $slug }) {\n      id\n      imageSrc\n      name\n      slug\n    }\n    tours {\n      id\n      name\n      description\n      distance\n      breweries {\n        id\n      }\n      neighborhood {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query Neighborhood($slug: String!) {\n    neighborhoods(filter: { slug: $slug }) {\n      id\n      imageSrc\n      name\n      slug\n    }\n    tours {\n      id\n      name\n      description\n      distance\n      breweries {\n        id\n      }\n      neighborhood {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Tour($id: ID!) {\n    tour(id: $id) {\n      id\n      name\n      distance\n      description\n      googleMapsLink\n      googleMapsEmbed\n      breweries {\n        id\n        name\n        address\n      }\n      neighborhood {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query Tour($id: ID!) {\n    tour(id: $id) {\n      id\n      name\n      distance\n      description\n      googleMapsLink\n      googleMapsEmbed\n      breweries {\n        id\n        name\n        address\n      }\n      neighborhood {\n        id\n      }\n    }\n  }\n"];

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function gql(source: string): unknown;

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;