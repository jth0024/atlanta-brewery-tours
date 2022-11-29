const upperWestsideImg = '/images/upper-westside.jpg'
const grantParkImg = '/images/grant-park.jpg'
const inmanParkImg = '/images/inman-park.jpg'
const westEndImg = '/images/west-end.jpg'
const decaturImg = '/images/decatur.jpg'
const avondaleEstatesImg = '/images/avondale-estates.jpg'

type ID = number

export interface Brewery {
  id: ID
  name: string
  neighborhoodId: ID
}

export interface Neighborhood {
  id: ID
  name: string
  description: string
  imageSrc: string
  slug: string
  regionIds: ID[]
}

export interface Tour {
  id: ID
  isFeatured?: boolean
  name: string
  breweryIds: number[]
  description: string
  distance: number
  neighborhoodId: ID
}

export interface Region {
  id: ID
  name: string
}

export const regions = new Map<ID, Region>([
  [
    0,
    {
      id: 0,
      name: 'Northwest',
    },
  ],
  [
    1,
    {
      id: 1,
      name: 'Northeast',
    },
  ],
  [
    2,
    {
      id: 2,
      name: 'Southeast',
    },
  ],
  [
    3,
    {
      id: 3,
      name: 'Southwest',
    },
  ],
  [
    4,
    {
      id: 4,
      name: 'ITP',
    },
  ],
  [
    5,
    {
      id: 5,
      name: 'OTP',
    },
  ],
])

export const breweries = new Map<ID, Brewery>([
  // Grant Park
  [
    0,
    {
      name: 'Elsewhere Brewing',
      id: 0,
      neighborhoodId: 0,
    },
  ],
  [
    1,
    {
      name: 'Eventide Brewing Co.',
      id: 1,
      neighborhoodId: 1,
    },
  ],
  [
    2,
    {
      name: 'Halfway Crooks',
      id: 2,
      neighborhoodId: 1,
    },
  ],
  [
    3,
    {
      name: 'Hippin Hops Brewery',
      id: 3,
      neighborhoodId: 1,
    },
  ],
  [
    4,
    {
      name: `Red's Beer Garden`,
      id: 4,
      neighborhoodId: 1,
    },
  ],
])

export const tours = new Map<ID, Tour>([
  [
    0,
    {
      id: 0,
      name: 'Grant Park Walk/Scoot Tour',
      isFeatured: true,
      distance: 2.35,
      breweryIds: [3, 0, 1, 2],
      neighborhoodId: 1,
      description: `The Grant Park Walk/Scoot Tour takes you
      on a route through the lovely Grant Park/Summerhill area.
      Visit 4 of this neighborhood's hottest new breweries!`,
    },
  ],
  [
    1,
    {
      id: 1,
      name: 'West End Walking Tour',
      isFeatured: true,
      distance: 0.34,
      breweryIds: [],
      neighborhoodId: 3,
      description: `The West End Walking Tour takes you on a route
      through Atlanta's up and coming West End! If you're up for a tour,
      but don't want to walk too far, this is the one for you!`,
    },
  ],
])

export const neighborhoods = new Map<ID, Neighborhood>([
  [
    0,
    {
      name: 'Upper Westside',
      id: 0,
      slug: 'upper-westside',
      regionIds: [0, 4],
      imageSrc: upperWestsideImg,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat.`,
    },
  ],
  [
    1,
    {
      name: 'Grant Park',
      id: 1,
      regionIds: [2, 4],
      slug: 'grant-park',
      imageSrc: grantParkImg,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat.`,
    },
  ],
  [
    2,
    {
      name: 'Inman Park',
      id: 2,
      regionIds: [1, 4],
      slug: 'inman-park',
      imageSrc: inmanParkImg,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat.`,
    },
  ],
  [
    3,
    {
      name: 'West End',
      id: 3,
      slug: 'west-end',
      regionIds: [3, 4],
      imageSrc: westEndImg,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat.`,
    },
  ],
  [
    4,
    {
      name: 'Decatur',
      id: 4,
      slug: 'decatur',
      imageSrc: decaturImg,
      regionIds: [1, 4],
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat.`,
    },
  ],
  [
    5,
    {
      name: 'Avondale Estates',
      id: 5,
      slug: 'avondale-estates',
      regionIds: [1, 4],
      imageSrc: avondaleEstatesImg,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat.`,
    },
  ],
])
