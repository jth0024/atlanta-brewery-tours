import type { SubscriberResolvers } from '../../types.generated'

export const Subscriber: SubscriberResolvers = {
  email: parent => parent.email,
  firstName: parent => parent.firstName,
  lastName: parent => parent.lastName,
}
