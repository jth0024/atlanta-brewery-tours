import {
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
  Skeleton,
  Spacer,
} from '@chakra-ui/react'

export const TourCardSkeleton = (props: CardProps) => (
  <Card variant="outline" backgroundColor="white" {...props}>
    <CardHeader>
      <Skeleton height="20px" width="200px" />
      <Spacer height="2" />
      <Skeleton height="24px" width="100px" />
    </CardHeader>
    <CardBody>
      <Skeleton height="150px" />
    </CardBody>
    <CardFooter justifyContent="flex-end">
      <ButtonGroup>
        <Skeleton height="40px" width="144px" />
      </ButtonGroup>
    </CardFooter>
  </Card>
)
