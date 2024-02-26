import type { CreateSubscriberResultResolvers } from '../../types.generated'

export const CreateSubscriberResult: CreateSubscriberResultResolvers = {
  subscriber: parent => parent.subscriber,
  tour: parent => parent.tour,
}
