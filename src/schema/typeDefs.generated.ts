import type { DocumentNode } from 'graphql'
export const typeDefs = {
  kind: 'Document',
  definitions: [
    {
      kind: 'ObjectTypeExtension',
      name: { kind: 'Name', value: 'Query', loc: { start: 12, end: 17 } },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blogPost',
            loc: { start: 22, end: 30 },
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: { kind: 'Name', value: 'id', loc: { start: 31, end: 33 } },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                    loc: { start: 35, end: 37 },
                  },
                  loc: { start: 35, end: 37 },
                },
                loc: { start: 35, end: 38 },
              },
              directives: [],
              loc: { start: 31, end: 38 },
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlogPost',
              loc: { start: 41, end: 49 },
            },
            loc: { start: 41, end: 49 },
          },
          directives: [],
          loc: { start: 22, end: 49 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blogPostBySlug',
            loc: { start: 52, end: 66 },
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'slug',
                loc: { start: 67, end: 71 },
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'String',
                    loc: { start: 73, end: 79 },
                  },
                  loc: { start: 73, end: 79 },
                },
                loc: { start: 73, end: 80 },
              },
              directives: [],
              loc: { start: 67, end: 80 },
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlogPost',
              loc: { start: 83, end: 91 },
            },
            loc: { start: 83, end: 91 },
          },
          directives: [],
          loc: { start: 52, end: 91 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blogPosts',
            loc: { start: 94, end: 103 },
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'BlogPost',
                    loc: { start: 106, end: 114 },
                  },
                  loc: { start: 106, end: 114 },
                },
                loc: { start: 106, end: 115 },
              },
              loc: { start: 105, end: 116 },
            },
            loc: { start: 105, end: 117 },
          },
          directives: [],
          loc: { start: 94, end: 117 },
        },
      ],
      loc: { start: 0, end: 119 },
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'BlogPostStatus',
        loc: { start: 126, end: 140 },
      },
      directives: [],
      values: [
        {
          kind: 'EnumValueDefinition',
          name: { kind: 'Name', value: 'DRAFT', loc: { start: 145, end: 150 } },
          directives: [],
          loc: { start: 145, end: 150 },
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'PUBLISHED',
            loc: { start: 153, end: 162 },
          },
          directives: [],
          loc: { start: 153, end: 162 },
        },
      ],
      loc: { start: 121, end: 164 },
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'BlogPost', loc: { start: 171, end: 179 } },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'id', loc: { start: 184, end: 186 } },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'ID',
                loc: { start: 188, end: 190 },
              },
              loc: { start: 188, end: 190 },
            },
            loc: { start: 188, end: 191 },
          },
          directives: [],
          loc: { start: 184, end: 191 },
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'title', loc: { start: 194, end: 199 } },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
                loc: { start: 201, end: 207 },
              },
              loc: { start: 201, end: 207 },
            },
            loc: { start: 201, end: 208 },
          },
          directives: [],
          loc: { start: 194, end: 208 },
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'slug', loc: { start: 211, end: 215 } },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
                loc: { start: 217, end: 223 },
              },
              loc: { start: 217, end: 223 },
            },
            loc: { start: 217, end: 224 },
          },
          directives: [],
          loc: { start: 211, end: 224 },
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'date', loc: { start: 227, end: 231 } },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
                loc: { start: 233, end: 239 },
              },
              loc: { start: 233, end: 239 },
            },
            loc: { start: 233, end: 240 },
          },
          directives: [],
          loc: { start: 227, end: 240 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'excerpt',
            loc: { start: 243, end: 250 },
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
                loc: { start: 252, end: 258 },
              },
              loc: { start: 252, end: 258 },
            },
            loc: { start: 252, end: 259 },
          },
          directives: [],
          loc: { start: 243, end: 259 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'content',
            loc: { start: 262, end: 269 },
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
                loc: { start: 271, end: 277 },
              },
              loc: { start: 271, end: 277 },
            },
            loc: { start: 271, end: 278 },
          },
          directives: [],
          loc: { start: 262, end: 278 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'imageSrc',
            loc: { start: 281, end: 289 },
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 291, end: 297 },
            },
            loc: { start: 291, end: 297 },
          },
          directives: [],
          loc: { start: 281, end: 297 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'imageAltText',
            loc: { start: 300, end: 312 },
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 314, end: 320 },
            },
            loc: { start: 314, end: 320 },
          },
          directives: [],
          loc: { start: 300, end: 320 },
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'tags', loc: { start: 323, end: 327 } },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'String',
                    loc: { start: 330, end: 336 },
                  },
                  loc: { start: 330, end: 336 },
                },
                loc: { start: 330, end: 337 },
              },
              loc: { start: 329, end: 338 },
            },
            loc: { start: 329, end: 339 },
          },
          directives: [],
          loc: { start: 323, end: 339 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'status',
            loc: { start: 342, end: 348 },
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BlogPostStatus',
                loc: { start: 350, end: 364 },
              },
              loc: { start: 350, end: 364 },
            },
            loc: { start: 350, end: 365 },
          },
          directives: [],
          loc: { start: 342, end: 365 },
        },
      ],
      loc: { start: 166, end: 367 },
    },
    {
      kind: 'ObjectTypeExtension',
      name: { kind: 'Name', value: 'Query', loc: { start: 380, end: 385 } },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'breweries',
            loc: { start: 390, end: 399 },
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'Brewery',
                    loc: { start: 402, end: 409 },
                  },
                  loc: { start: 402, end: 409 },
                },
                loc: { start: 402, end: 410 },
              },
              loc: { start: 401, end: 411 },
            },
            loc: { start: 401, end: 412 },
          },
          directives: [],
          loc: { start: 390, end: 412 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'brewery',
            loc: { start: 415, end: 422 },
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
                loc: { start: 423, end: 425 },
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                    loc: { start: 427, end: 429 },
                  },
                  loc: { start: 427, end: 429 },
                },
                loc: { start: 427, end: 430 },
              },
              directives: [],
              loc: { start: 423, end: 430 },
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Brewery',
              loc: { start: 433, end: 440 },
            },
            loc: { start: 433, end: 440 },
          },
          directives: [],
          loc: { start: 415, end: 440 },
        },
      ],
      loc: { start: 368, end: 442 },
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'Brewery', loc: { start: 449, end: 456 } },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'id', loc: { start: 461, end: 463 } },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'ID',
                loc: { start: 465, end: 467 },
              },
              loc: { start: 465, end: 467 },
            },
            loc: { start: 465, end: 468 },
          },
          directives: [],
          loc: { start: 461, end: 468 },
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'name', loc: { start: 471, end: 475 } },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 477, end: 483 },
            },
            loc: { start: 477, end: 483 },
          },
          directives: [],
          loc: { start: 471, end: 483 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'neighborhood',
            loc: { start: 486, end: 498 },
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Neighborhood',
              loc: { start: 500, end: 512 },
            },
            loc: { start: 500, end: 512 },
          },
          directives: [],
          loc: { start: 486, end: 512 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'address',
            loc: { start: 515, end: 522 },
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 524, end: 530 },
            },
            loc: { start: 524, end: 530 },
          },
          directives: [],
          loc: { start: 515, end: 530 },
        },
      ],
      loc: { start: 444, end: 532 },
    },
    {
      kind: 'ObjectTypeExtension',
      name: { kind: 'Name', value: 'Query', loc: { start: 545, end: 550 } },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'neighborhoods',
            loc: { start: 555, end: 568 },
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'filter',
                loc: { start: 569, end: 575 },
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NeighborhoodsInput',
                  loc: { start: 577, end: 595 },
                },
                loc: { start: 577, end: 595 },
              },
              directives: [],
              loc: { start: 569, end: 595 },
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'Neighborhood',
                    loc: { start: 599, end: 611 },
                  },
                  loc: { start: 599, end: 611 },
                },
                loc: { start: 599, end: 612 },
              },
              loc: { start: 598, end: 613 },
            },
            loc: { start: 598, end: 614 },
          },
          directives: [],
          loc: { start: 555, end: 614 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'neighborhood',
            loc: { start: 617, end: 629 },
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
                loc: { start: 630, end: 632 },
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                    loc: { start: 634, end: 636 },
                  },
                  loc: { start: 634, end: 636 },
                },
                loc: { start: 634, end: 637 },
              },
              directives: [],
              loc: { start: 630, end: 637 },
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Neighborhood',
              loc: { start: 640, end: 652 },
            },
            loc: { start: 640, end: 652 },
          },
          directives: [],
          loc: { start: 617, end: 652 },
        },
      ],
      loc: { start: 533, end: 654 },
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'NeighborhoodsInput',
        loc: { start: 662, end: 680 },
      },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          name: { kind: 'Name', value: 'slug', loc: { start: 685, end: 689 } },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 691, end: 697 },
            },
            loc: { start: 691, end: 697 },
          },
          directives: [],
          loc: { start: 685, end: 697 },
        },
      ],
      loc: { start: 656, end: 699 },
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Neighborhood',
        loc: { start: 706, end: 718 },
      },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'id', loc: { start: 723, end: 725 } },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'ID',
                loc: { start: 727, end: 729 },
              },
              loc: { start: 727, end: 729 },
            },
            loc: { start: 727, end: 730 },
          },
          directives: [],
          loc: { start: 723, end: 730 },
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'name', loc: { start: 733, end: 737 } },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 739, end: 745 },
            },
            loc: { start: 739, end: 745 },
          },
          directives: [],
          loc: { start: 733, end: 745 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'description',
            loc: { start: 748, end: 759 },
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 761, end: 767 },
            },
            loc: { start: 761, end: 767 },
          },
          directives: [],
          loc: { start: 748, end: 767 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'imageSrc',
            loc: { start: 770, end: 778 },
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 780, end: 786 },
            },
            loc: { start: 780, end: 786 },
          },
          directives: [],
          loc: { start: 770, end: 786 },
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'slug', loc: { start: 789, end: 793 } },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 795, end: 801 },
            },
            loc: { start: 795, end: 801 },
          },
          directives: [],
          loc: { start: 789, end: 801 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'regions',
            loc: { start: 804, end: 811 },
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'Region',
                    loc: { start: 814, end: 820 },
                  },
                  loc: { start: 814, end: 820 },
                },
                loc: { start: 814, end: 821 },
              },
              loc: { start: 813, end: 822 },
            },
            loc: { start: 813, end: 823 },
          },
          directives: [],
          loc: { start: 804, end: 823 },
        },
      ],
      loc: { start: 701, end: 825 },
    },
    {
      kind: 'ObjectTypeExtension',
      name: { kind: 'Name', value: 'Query', loc: { start: 838, end: 843 } },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'regions',
            loc: { start: 848, end: 855 },
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'Region',
                    loc: { start: 858, end: 864 },
                  },
                  loc: { start: 858, end: 864 },
                },
                loc: { start: 858, end: 865 },
              },
              loc: { start: 857, end: 866 },
            },
            loc: { start: 857, end: 867 },
          },
          directives: [],
          loc: { start: 848, end: 867 },
        },
      ],
      loc: { start: 826, end: 869 },
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'Region', loc: { start: 876, end: 882 } },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'id', loc: { start: 887, end: 889 } },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'ID',
                loc: { start: 891, end: 893 },
              },
              loc: { start: 891, end: 893 },
            },
            loc: { start: 891, end: 894 },
          },
          directives: [],
          loc: { start: 887, end: 894 },
        },
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'name', loc: { start: 897, end: 901 } },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 903, end: 909 },
            },
            loc: { start: 903, end: 909 },
          },
          directives: [],
          loc: { start: 897, end: 909 },
        },
      ],
      loc: { start: 871, end: 911 },
    },
    {
      kind: 'ObjectTypeExtension',
      name: { kind: 'Name', value: 'Mutation', loc: { start: 924, end: 932 } },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'createSubscriber',
            loc: { start: 937, end: 953 },
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'input',
                loc: { start: 954, end: 959 },
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'CreateSubscriberInput',
                    loc: { start: 961, end: 982 },
                  },
                  loc: { start: 961, end: 982 },
                },
                loc: { start: 961, end: 983 },
              },
              directives: [],
              loc: { start: 954, end: 983 },
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'CreateSubscriberResult',
                loc: { start: 986, end: 1008 },
              },
              loc: { start: 986, end: 1008 },
            },
            loc: { start: 986, end: 1009 },
          },
          directives: [],
          loc: { start: 937, end: 1009 },
        },
      ],
      loc: { start: 912, end: 1011 },
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'CreateSubscriberInput',
        loc: { start: 1019, end: 1040 },
      },
      directives: [],
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'email',
            loc: { start: 1045, end: 1050 },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
                loc: { start: 1052, end: 1058 },
              },
              loc: { start: 1052, end: 1058 },
            },
            loc: { start: 1052, end: 1059 },
          },
          directives: [],
          loc: { start: 1045, end: 1059 },
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'firstName',
            loc: { start: 1062, end: 1071 },
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 1073, end: 1079 },
            },
            loc: { start: 1073, end: 1079 },
          },
          directives: [],
          loc: { start: 1062, end: 1079 },
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'lastName',
            loc: { start: 1082, end: 1090 },
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 1092, end: 1098 },
            },
            loc: { start: 1092, end: 1098 },
          },
          directives: [],
          loc: { start: 1082, end: 1098 },
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tourName',
            loc: { start: 1101, end: 1109 },
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 1111, end: 1117 },
            },
            loc: { start: 1111, end: 1117 },
          },
          directives: [],
          loc: { start: 1101, end: 1117 },
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tourID',
            loc: { start: 1120, end: 1126 },
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 1128, end: 1134 },
            },
            loc: { start: 1128, end: 1134 },
          },
          directives: [],
          loc: { start: 1120, end: 1134 },
        },
      ],
      loc: { start: 1013, end: 1136 },
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'CreateSubscriberResult',
        loc: { start: 1143, end: 1165 },
      },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'subscriber',
            loc: { start: 1170, end: 1180 },
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Subscriber',
                loc: { start: 1182, end: 1192 },
              },
              loc: { start: 1182, end: 1192 },
            },
            loc: { start: 1182, end: 1193 },
          },
          directives: [],
          loc: { start: 1170, end: 1193 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'tour',
            loc: { start: 1196, end: 1200 },
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Tour',
              loc: { start: 1202, end: 1206 },
            },
            loc: { start: 1202, end: 1206 },
          },
          directives: [],
          loc: { start: 1196, end: 1206 },
        },
      ],
      loc: { start: 1138, end: 1208 },
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Subscriber',
        loc: { start: 1215, end: 1225 },
      },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'email',
            loc: { start: 1230, end: 1235 },
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
                loc: { start: 1237, end: 1243 },
              },
              loc: { start: 1237, end: 1243 },
            },
            loc: { start: 1237, end: 1244 },
          },
          directives: [],
          loc: { start: 1230, end: 1244 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'firstName',
            loc: { start: 1247, end: 1256 },
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 1258, end: 1264 },
            },
            loc: { start: 1258, end: 1264 },
          },
          directives: [],
          loc: { start: 1247, end: 1264 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'lastName',
            loc: { start: 1267, end: 1275 },
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 1277, end: 1283 },
            },
            loc: { start: 1277, end: 1283 },
          },
          directives: [],
          loc: { start: 1267, end: 1283 },
        },
      ],
      loc: { start: 1210, end: 1285 },
    },
    {
      kind: 'ObjectTypeExtension',
      name: { kind: 'Name', value: 'Query', loc: { start: 1298, end: 1303 } },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'tours',
            loc: { start: 1308, end: 1313 },
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'Tour',
                    loc: { start: 1316, end: 1320 },
                  },
                  loc: { start: 1316, end: 1320 },
                },
                loc: { start: 1316, end: 1321 },
              },
              loc: { start: 1315, end: 1322 },
            },
            loc: { start: 1315, end: 1323 },
          },
          directives: [],
          loc: { start: 1308, end: 1323 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'tour',
            loc: { start: 1326, end: 1330 },
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
                loc: { start: 1331, end: 1333 },
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                    loc: { start: 1335, end: 1337 },
                  },
                  loc: { start: 1335, end: 1337 },
                },
                loc: { start: 1335, end: 1338 },
              },
              directives: [],
              loc: { start: 1331, end: 1338 },
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Tour',
              loc: { start: 1341, end: 1345 },
            },
            loc: { start: 1341, end: 1345 },
          },
          directives: [],
          loc: { start: 1326, end: 1345 },
        },
      ],
      loc: { start: 1286, end: 1347 },
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'Tour', loc: { start: 1354, end: 1358 } },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: 'FieldDefinition',
          name: { kind: 'Name', value: 'id', loc: { start: 1363, end: 1365 } },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'ID',
                loc: { start: 1367, end: 1369 },
              },
              loc: { start: 1367, end: 1369 },
            },
            loc: { start: 1367, end: 1370 },
          },
          directives: [],
          loc: { start: 1363, end: 1370 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'isFeatured',
            loc: { start: 1373, end: 1383 },
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Boolean',
              loc: { start: 1385, end: 1392 },
            },
            loc: { start: 1385, end: 1392 },
          },
          directives: [],
          loc: { start: 1373, end: 1392 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'name',
            loc: { start: 1395, end: 1399 },
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 1401, end: 1407 },
            },
            loc: { start: 1401, end: 1407 },
          },
          directives: [],
          loc: { start: 1395, end: 1407 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'breweries',
            loc: { start: 1410, end: 1419 },
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'Brewery',
                    loc: { start: 1422, end: 1429 },
                  },
                  loc: { start: 1422, end: 1429 },
                },
                loc: { start: 1422, end: 1430 },
              },
              loc: { start: 1421, end: 1431 },
            },
            loc: { start: 1421, end: 1432 },
          },
          directives: [],
          loc: { start: 1410, end: 1432 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'description',
            loc: { start: 1435, end: 1446 },
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 1448, end: 1454 },
            },
            loc: { start: 1448, end: 1454 },
          },
          directives: [],
          loc: { start: 1435, end: 1454 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'distance',
            loc: { start: 1457, end: 1465 },
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Float',
              loc: { start: 1467, end: 1472 },
            },
            loc: { start: 1467, end: 1472 },
          },
          directives: [],
          loc: { start: 1457, end: 1472 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'neighborhood',
            loc: { start: 1475, end: 1487 },
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Neighborhood',
              loc: { start: 1489, end: 1501 },
            },
            loc: { start: 1489, end: 1501 },
          },
          directives: [],
          loc: { start: 1475, end: 1501 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'googleMapsLink',
            loc: { start: 1504, end: 1518 },
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 1520, end: 1526 },
            },
            loc: { start: 1520, end: 1526 },
          },
          directives: [],
          loc: { start: 1504, end: 1526 },
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'googleMapsEmbed',
            loc: { start: 1529, end: 1544 },
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
              loc: { start: 1546, end: 1552 },
            },
            loc: { start: 1546, end: 1552 },
          },
          directives: [],
          loc: { start: 1529, end: 1552 },
        },
      ],
      loc: { start: 1349, end: 1554 },
    },
    {
      kind: 'ObjectTypeDefinition',
      name: { kind: 'Name', value: 'Query', loc: { start: 1560, end: 1565 } },
      interfaces: [],
      directives: [],
      fields: [],
      loc: { start: 1555, end: 1565 },
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Mutation',
        loc: { start: 1572, end: 1580 },
      },
      interfaces: [],
      directives: [],
      fields: [],
      loc: { start: 1567, end: 1580 },
    },
  ],
  loc: { start: 0, end: 1581 },
} as unknown as DocumentNode
