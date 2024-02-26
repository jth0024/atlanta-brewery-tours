/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BlogPost = {
  __typename?: 'BlogPost';
  content: Scalars['String'];
  date: Scalars['String'];
  excerpt: Scalars['String'];
  id: Scalars['ID'];
  imageAltText?: Maybe<Scalars['String']>;
  imageSrc?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  status: BlogPostStatus;
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
};

export enum BlogPostStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export type Brewery = {
  __typename?: 'Brewery';
  address?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  neighborhood?: Maybe<Neighborhood>;
};

export type CreateSubscriberInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  tourID?: InputMaybe<Scalars['String']>;
  tourName?: InputMaybe<Scalars['String']>;
};

export type CreateSubscriberResult = {
  __typename?: 'CreateSubscriberResult';
  subscriber: Subscriber;
  tour?: Maybe<Tour>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createSubscriber: CreateSubscriberResult;
};


export type MutationCreateSubscriberArgs = {
  input: CreateSubscriberInput;
};

export type Neighborhood = {
  __typename?: 'Neighborhood';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageSrc?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  regions: Array<Region>;
  slug?: Maybe<Scalars['String']>;
};

export type NeighborhoodsInput = {
  slug?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  blogPost?: Maybe<BlogPost>;
  blogPostBySlug?: Maybe<BlogPost>;
  blogPosts: Array<BlogPost>;
  breweries: Array<Brewery>;
  brewery?: Maybe<Brewery>;
  neighborhood?: Maybe<Neighborhood>;
  neighborhoods: Array<Neighborhood>;
  regions: Array<Region>;
  tour?: Maybe<Tour>;
  tours: Array<Tour>;
};


export type QueryBlogPostArgs = {
  id: Scalars['ID'];
};


export type QueryBlogPostBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryBreweryArgs = {
  id: Scalars['ID'];
};


export type QueryNeighborhoodArgs = {
  id: Scalars['ID'];
};


export type QueryNeighborhoodsArgs = {
  filter?: InputMaybe<NeighborhoodsInput>;
};


export type QueryTourArgs = {
  id: Scalars['ID'];
};

export type Region = {
  __typename?: 'Region';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Subscriber = {
  __typename?: 'Subscriber';
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type Tour = {
  __typename?: 'Tour';
  breweries: Array<Brewery>;
  description?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['Float']>;
  googleMapsEmbed?: Maybe<Scalars['String']>;
  googleMapsLink?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isFeatured?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  neighborhood?: Maybe<Neighborhood>;
};

export type CreateSubscriberMutationVariables = Exact<{
  input: CreateSubscriberInput;
}>;


export type CreateSubscriberMutation = { __typename?: 'Mutation', createSubscriber: { __typename?: 'CreateSubscriberResult', subscriber: { __typename?: 'Subscriber', email: string } } };

export type BlogQueryVariables = Exact<{ [key: string]: never; }>;


export type BlogQuery = { __typename?: 'Query', blogPosts: Array<{ __typename?: 'BlogPost', date: string, excerpt: string, id: string, imageSrc?: string | null, imageAltText?: string | null, status: BlogPostStatus, slug: string, tags: Array<string>, title: string }> };

export type BlogPostQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type BlogPostQuery = { __typename?: 'Query', blogPost?: { __typename?: 'BlogPost', content: string, date: string, excerpt: string, id: string, imageSrc?: string | null, imageAltText?: string | null, slug: string, status: BlogPostStatus, title: string, tags: Array<string> } | null };

export type HomeQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeQuery = { __typename?: 'Query', tours: Array<{ __typename?: 'Tour', id: string, distance?: number | null, description?: string | null, name?: string | null, isFeatured?: boolean | null, breweries: Array<{ __typename?: 'Brewery', id: string }>, neighborhood?: { __typename?: 'Neighborhood', id: string, name?: string | null, regions: Array<{ __typename?: 'Region', id: string }> } | null }>, regions: Array<{ __typename?: 'Region', id: string, name?: string | null }> };

export type CreateSubscriberFromTourMutationVariables = Exact<{
  input: CreateSubscriberInput;
}>;


export type CreateSubscriberFromTourMutation = { __typename?: 'Mutation', createSubscriber: { __typename?: 'CreateSubscriberResult', tour?: { __typename?: 'Tour', id: string } | null } };

export type NeighborhoodQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type NeighborhoodQuery = { __typename?: 'Query', neighborhoods: Array<{ __typename?: 'Neighborhood', id: string, imageSrc?: string | null, name?: string | null, slug?: string | null }>, tours: Array<{ __typename?: 'Tour', id: string, name?: string | null, description?: string | null, distance?: number | null, breweries: Array<{ __typename?: 'Brewery', id: string }>, neighborhood?: { __typename?: 'Neighborhood', id: string } | null }> };

export type TourQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TourQuery = { __typename?: 'Query', tour?: { __typename?: 'Tour', id: string, name?: string | null, distance?: number | null, description?: string | null, googleMapsLink?: string | null, googleMapsEmbed?: string | null, breweries: Array<{ __typename?: 'Brewery', id: string, name?: string | null, address?: string | null }>, neighborhood?: { __typename?: 'Neighborhood', id: string } | null } | null };


export const CreateSubscriberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSubscriber"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSubscriberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSubscriber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscriber"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<CreateSubscriberMutation, CreateSubscriberMutationVariables>;
export const BlogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Blog"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blogPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageSrc"}},{"kind":"Field","name":{"kind":"Name","value":"imageAltText"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<BlogQuery, BlogQueryVariables>;
export const BlogPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BlogPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"blogPost"},"name":{"kind":"Name","value":"blogPostBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageSrc"}},{"kind":"Field","name":{"kind":"Name","value":"imageAltText"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]} as unknown as DocumentNode<BlogPostQuery, BlogPostQueryVariables>;
export const HomeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Home"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tours"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"distance"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"breweries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isFeatured"}},{"kind":"Field","name":{"kind":"Name","value":"neighborhood"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"regions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"regions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<HomeQuery, HomeQueryVariables>;
export const CreateSubscriberFromTourDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSubscriberFromTour"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSubscriberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSubscriber"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tour"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateSubscriberFromTourMutation, CreateSubscriberFromTourMutationVariables>;
export const NeighborhoodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Neighborhood"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"neighborhoods"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageSrc"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tours"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"distance"}},{"kind":"Field","name":{"kind":"Name","value":"breweries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"neighborhood"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<NeighborhoodQuery, NeighborhoodQueryVariables>;
export const TourDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tour"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tour"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"distance"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"googleMapsLink"}},{"kind":"Field","name":{"kind":"Name","value":"googleMapsEmbed"}},{"kind":"Field","name":{"kind":"Name","value":"breweries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}},{"kind":"Field","name":{"kind":"Name","value":"neighborhood"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<TourQuery, TourQueryVariables>;