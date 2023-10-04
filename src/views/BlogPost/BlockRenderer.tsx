import { Card, CardBody, Link, Text } from '@chakra-ui/react'
import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

interface RichTextProps {
  content: RichTextItemResponse
}

const RichText = ({ content }: RichTextProps) => {
  let result: JSX.Element | null = null

  if (content.type === 'text') {
    result = (
      <Text
        textDecoration={content.annotations.italic ? 'italics' : 'none'}
        fontWeight={content.annotations.bold ? 'bold' : 'normal'}
      >
        {content.text.content}
      </Text>
    )

    if (content.text.link) {
      result = (
        <Link color="tertiary" href={content.text.link.url}>
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

  switch (block.type) {
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
    default:
      return (
        <Card variant="filled">
          <CardBody>
            <Text>This content is not supported</Text>
          </CardBody>
        </Card>
      )
  }
}
