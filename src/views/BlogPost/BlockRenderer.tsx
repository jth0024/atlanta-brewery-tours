import { Heading, Link, Text } from '@chakra-ui/react'
import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
// import NextImage from 'next/image'

interface RichTextProps {
  content: RichTextItemResponse
}

const RichText = ({ content }: RichTextProps) => {
  let result: JSX.Element | null = null

  if (content.type === 'text') {
    result = (
      <Text
        as="span"
        textDecoration={content.annotations.italic ? 'italics' : 'none'}
        fontWeight={content.annotations.bold ? 'bold' : 'normal'}
      >
        {content.text.content}
      </Text>
    )

    if (content.text.link) {
      result = (
        <Link
          display="inline-block"
          color="tertiary"
          href={content.text.link.url}
        >
          {result}
        </Link>
      )
    }
  }

  return result
}

interface BlockRendererProps {
  block: BlockObjectResponse | PartialBlockObjectResponse
}

export const BlockRenderer = ({ block }: BlockRendererProps) => {
  if (!('type' in block)) return null

  const toRichText = (items: RichTextItemResponse[]) =>
    items.map(content => (
      <RichText key={content.plain_text.slice(0, 15)} content={content} />
    ))

  switch (block.type) {
    case 'heading_1':
      return (
        <Heading as="h1" size="xl">
          {toRichText(block.heading_1?.rich_text ?? [])}
        </Heading>
      )
    case 'heading_2':
      return (
        <Heading as="h2" size="lg">
          {toRichText(block.heading_2?.rich_text ?? [])}
        </Heading>
      )
    case 'heading_3':
      return (
        <Heading as="h3" size="md">
          {toRichText(block.heading_3?.rich_text ?? [])}
        </Heading>
      )
    // case 'image':
    //   return block.image.type === 'external' ? (
    //     <Image
    //       as={NextImage}
    //       borderRadius="lg"
    //       // alt={block.image. ?? ''}
    //       src={block.image.external.url ?? ''}
    //       width="100%"
    //     />
    //   ) : (
    //     <Image
    //       as={NextImage}
    //       borderRadius="lg"
    //       // alt={block.image.caption ?? ''}
    //       src={block.image.file.url}
    //       width="100%"
    //     />
    //   )

    case 'paragraph':
      return (
        <Text as="p">
          {block.paragraph?.rich_text
            // eslint-disable-next-line camelcase
            .map(content => (
              <RichText
                key={content.plain_text.slice(0, 15)}
                content={content}
              />
            ))}
        </Text>
      )
    default: {
      console.warn(`Unsupported block type: ${block.type}`)
      return null
    }
  }
}
