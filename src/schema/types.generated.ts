import { GraphQLResolveInfo } from 'graphql'
import { BlogPostMapper } from './BlogPost/schema.mappers'
import { BreweryMapper } from './Brewery/schema.mappers'
import { NeighborhoodMapper } from './Neighborhood/schema.mappers'
import { RegionMapper } from './Region/schema.mappers'
import { TourMapper } from './Tour/schema.mappers'
export type Maybe<T> = T | null | undefined
export type InputMaybe<T> = T | null | undefined
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type BlogPost = {
  __typename?: 'BlogPost'
  content: Scalars['String']['output']
  date: Scalars['String']['output']
  excerpt: Scalars['String']['output']
  id: Scalars['ID']['output']
  imageAltText?: Maybe<Scalars['String']['output']>
  imageSrc?: Maybe<Scalars['String']['output']>
  slug: Scalars['String']['output']
  status: BlogPostStatus
  tags: Array<Scalars['String']['output']>
  title: Scalars['String']['output']
}

export type BlogPostStatus = 'DRAFT' | 'PUBLISHED'

export type Brewery = {
  __typename?: 'Brewery'
  address?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  neighborhood?: Maybe<Neighborhood>
}

export type CreateSubscriberInput = {
  email: Scalars['String']['input']
  firstName?: InputMaybe<Scalars['String']['input']>
  lastName?: InputMaybe<Scalars['String']['input']>
  tourID?: InputMaybe<Scalars['String']['input']>
  tourName?: InputMaybe<Scalars['String']['input']>
}

export type CreateSubscriberResult = {
  __typename?: 'CreateSubscriberResult'
  subscriber: Subscriber
  tour?: Maybe<Tour>
}

export type Mutation = {
  __typename?: 'Mutation'
  createSubscriber: CreateSubscriberResult
}

export type MutationcreateSubscriberArgs = {
  input: CreateSubscriberInput
}

export type Neighborhood = {
  __typename?: 'Neighborhood'
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  imageSrc?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  regions: Array<Region>
  slug?: Maybe<Scalars['String']['output']>
}

export type NeighborhoodsInput = {
  slug?: InputMaybe<Scalars['String']['input']>
}

export type Query = {
  __typename?: 'Query'
  blogPost?: Maybe<BlogPost>
  blogPostBySlug?: Maybe<BlogPost>
  blogPosts: Array<BlogPost>
  breweries: Array<Brewery>
  brewery?: Maybe<Brewery>
  neighborhood?: Maybe<Neighborhood>
  neighborhoods: Array<Neighborhood>
  regions: Array<Region>
  tour?: Maybe<Tour>
  tours: Array<Tour>
}

export type QueryblogPostArgs = {
  id: Scalars['ID']['input']
}

export type QueryblogPostBySlugArgs = {
  slug: Scalars['String']['input']
}

export type QuerybreweryArgs = {
  id: Scalars['ID']['input']
}

export type QueryneighborhoodArgs = {
  id: Scalars['ID']['input']
}

export type QueryneighborhoodsArgs = {
  filter?: InputMaybe<NeighborhoodsInput>
}

export type QuerytourArgs = {
  id: Scalars['ID']['input']
}

export type Region = {
  __typename?: 'Region'
  id: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
}

export type Subscriber = {
  __typename?: 'Subscriber'
  email: Scalars['String']['output']
  firstName?: Maybe<Scalars['String']['output']>
  lastName?: Maybe<Scalars['String']['output']>
}

export type Tour = {
  __typename?: 'Tour'
  breweries: Array<Brewery>
  description?: Maybe<Scalars['String']['output']>
  distance?: Maybe<Scalars['Float']['output']>
  googleMapsEmbed?: Maybe<Scalars['String']['output']>
  googleMapsLink?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  isFeatured?: Maybe<Scalars['Boolean']['output']>
  name?: Maybe<Scalars['String']['output']>
  neighborhood?: Maybe<Neighborhood>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BlogPost: ResolverTypeWrapper<BlogPostMapper>
  String: ResolverTypeWrapper<Scalars['String']['output']>
  ID: ResolverTypeWrapper<Scalars['ID']['output']>
  BlogPostStatus: BlogPostStatus
  Brewery: ResolverTypeWrapper<BreweryMapper>
  CreateSubscriberInput: CreateSubscriberInput
  CreateSubscriberResult: ResolverTypeWrapper<
    Omit<CreateSubscriberResult, 'tour'> & {
      tour?: Maybe<ResolversTypes['Tour']>
    }
  >
  Mutation: ResolverTypeWrapper<{}>
  Neighborhood: ResolverTypeWrapper<NeighborhoodMapper>
  NeighborhoodsInput: NeighborhoodsInput
  Query: ResolverTypeWrapper<{}>
  Region: ResolverTypeWrapper<RegionMapper>
  Subscriber: ResolverTypeWrapper<Subscriber>
  Tour: ResolverTypeWrapper<TourMapper>
  Float: ResolverTypeWrapper<Scalars['Float']['output']>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BlogPost: BlogPostMapper
  String: Scalars['String']['output']
  ID: Scalars['ID']['output']
  Brewery: BreweryMapper
  CreateSubscriberInput: CreateSubscriberInput
  CreateSubscriberResult: Omit<CreateSubscriberResult, 'tour'> & {
    tour?: Maybe<ResolversParentTypes['Tour']>
  }
  Mutation: {}
  Neighborhood: NeighborhoodMapper
  NeighborhoodsInput: NeighborhoodsInput
  Query: {}
  Region: RegionMapper
  Subscriber: Subscriber
  Tour: TourMapper
  Float: Scalars['Float']['output']
  Boolean: Scalars['Boolean']['output']
}

export type BlogPostResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['BlogPost'] = ResolversParentTypes['BlogPost'],
> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  excerpt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  imageAltText?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  imageSrc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  status?: Resolver<ResolversTypes['BlogPostStatus'], ParentType, ContextType>
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type BreweryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Brewery'] = ResolversParentTypes['Brewery'],
> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  neighborhood?: Resolver<
    Maybe<ResolversTypes['Neighborhood']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type CreateSubscriberResultResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['CreateSubscriberResult'] = ResolversParentTypes['CreateSubscriberResult'],
> = {
  subscriber?: Resolver<ResolversTypes['Subscriber'], ParentType, ContextType>
  tour?: Resolver<Maybe<ResolversTypes['Tour']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  createSubscriber?: Resolver<
    ResolversTypes['CreateSubscriberResult'],
    ParentType,
    ContextType,
    RequireFields<MutationcreateSubscriberArgs, 'input'>
  >
}

export type NeighborhoodResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Neighborhood'] = ResolversParentTypes['Neighborhood'],
> = {
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  imageSrc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  regions?: Resolver<Array<ResolversTypes['Region']>, ParentType, ContextType>
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  blogPost?: Resolver<
    Maybe<ResolversTypes['BlogPost']>,
    ParentType,
    ContextType,
    RequireFields<QueryblogPostArgs, 'id'>
  >
  blogPostBySlug?: Resolver<
    Maybe<ResolversTypes['BlogPost']>,
    ParentType,
    ContextType,
    RequireFields<QueryblogPostBySlugArgs, 'slug'>
  >
  blogPosts?: Resolver<
    Array<ResolversTypes['BlogPost']>,
    ParentType,
    ContextType
  >
  breweries?: Resolver<
    Array<ResolversTypes['Brewery']>,
    ParentType,
    ContextType
  >
  brewery?: Resolver<
    Maybe<ResolversTypes['Brewery']>,
    ParentType,
    ContextType,
    RequireFields<QuerybreweryArgs, 'id'>
  >
  neighborhood?: Resolver<
    Maybe<ResolversTypes['Neighborhood']>,
    ParentType,
    ContextType,
    RequireFields<QueryneighborhoodArgs, 'id'>
  >
  neighborhoods?: Resolver<
    Array<ResolversTypes['Neighborhood']>,
    ParentType,
    ContextType,
    Partial<QueryneighborhoodsArgs>
  >
  regions?: Resolver<Array<ResolversTypes['Region']>, ParentType, ContextType>
  tour?: Resolver<
    Maybe<ResolversTypes['Tour']>,
    ParentType,
    ContextType,
    RequireFields<QuerytourArgs, 'id'>
  >
  tours?: Resolver<Array<ResolversTypes['Tour']>, ParentType, ContextType>
}

export type RegionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Region'] = ResolversParentTypes['Region'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SubscriberResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Subscriber'] = ResolversParentTypes['Subscriber'],
> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TourResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Tour'] = ResolversParentTypes['Tour'],
> = {
  breweries?: Resolver<
    Array<ResolversTypes['Brewery']>,
    ParentType,
    ContextType
  >
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  distance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  googleMapsEmbed?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  googleMapsLink?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  isFeatured?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  neighborhood?: Resolver<
    Maybe<ResolversTypes['Neighborhood']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  BlogPost?: BlogPostResolvers<ContextType>
  Brewery?: BreweryResolvers<ContextType>
  CreateSubscriberResult?: CreateSubscriberResultResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Neighborhood?: NeighborhoodResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Region?: RegionResolvers<ContextType>
  Subscriber?: SubscriberResolvers<ContextType>
  Tour?: TourResolvers<ContextType>
}
