/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { BlogPost } from './BlogPost/resolvers/BlogPost';
import    { Brewery } from './Brewery/resolvers/Brewery';
import    { CreateSubscriberResult } from './Subscriber/resolvers/CreateSubscriberResult';
import    { createSubscriber as Mutation_createSubscriber } from './Subscriber/resolvers/Mutation/createSubscriber';
import    { Neighborhood } from './Neighborhood/resolvers/Neighborhood';
import    { blogPost as Query_blogPost } from './BlogPost/resolvers/Query/blogPost';
import    { blogPostBySlug as Query_blogPostBySlug } from './BlogPost/resolvers/Query/blogPostBySlug';
import    { blogPosts as Query_blogPosts } from './BlogPost/resolvers/Query/blogPosts';
import    { breweries as Query_breweries } from './Brewery/resolvers/Query/breweries';
import    { brewery as Query_brewery } from './Brewery/resolvers/Query/brewery';
import    { neighborhood as Query_neighborhood } from './Neighborhood/resolvers/Query/neighborhood';
import    { neighborhoods as Query_neighborhoods } from './Neighborhood/resolvers/Query/neighborhoods';
import    { regions as Query_regions } from './Region/resolvers/Query/regions';
import    { tour as Query_tour } from './Tour/resolvers/Query/tour';
import    { tours as Query_tours } from './Tour/resolvers/Query/tours';
import    { Region } from './Region/resolvers/Region';
import    { Subscriber } from './Subscriber/resolvers/Subscriber';
import    { Tour } from './Tour/resolvers/Tour';
    export const resolvers: Resolvers = {
      Query: { blogPost: Query_blogPost,blogPostBySlug: Query_blogPostBySlug,blogPosts: Query_blogPosts,breweries: Query_breweries,brewery: Query_brewery,neighborhood: Query_neighborhood,neighborhoods: Query_neighborhoods,regions: Query_regions,tour: Query_tour,tours: Query_tours },
      Mutation: { createSubscriber: Mutation_createSubscriber },
      
      BlogPost: BlogPost,
Brewery: Brewery,
CreateSubscriberResult: CreateSubscriberResult,
Neighborhood: Neighborhood,
Region: Region,
Subscriber: Subscriber,
Tour: Tour
    }