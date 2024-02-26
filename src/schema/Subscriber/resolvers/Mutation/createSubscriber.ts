import { isFullPage } from '@notionhq/client'
import type { MutationResolvers } from '../../../types.generated'
import { hubspotToken, notionClient } from '../../../utils'

export const createSubscriber: NonNullable<MutationResolvers['createSubscriber']> = async (_parent, _arg) => {
  const { input } = _arg
  const data = {
    fields: [
      {
        objectTypeId: '0-1',
        name: 'email',
        value: input.email,
      },
      {
        objectTypeId: '0-1',
        name: 'firstname',
        value: input.firstName ?? '',
      },
      {
        objectTypeId: '0-1',
        name: 'lastname',
        value: input.lastName ?? '',
      },
    ],
  }

  if (input.tourID && input.tourName) {
    data.fields.push(
      {
        objectTypeId: '0-1',
        name: 'tour_url',
        value: `https://atlantabrewerytours.com/tours/${input.tourID}`,
      },
      {
        objectTypeId: '0-1',
        name: 'tour_name',
        value: input.tourName,
      },
    )
  }

  const portalId = '40070077'
  const fromTourFormGuid = '3ecf5083-ed79-4ddb-9130-a773c69d22af'
  const fromFooterFormGuid = '408e3acf-88cf-4227-8d3d-4a1e8ea9b029'
  const formGuid =
    input.tourID && input.tourName ? fromTourFormGuid : fromFooterFormGuid

  const response = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/secure/submit/${portalId}/${formGuid}`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${hubspotToken}`,
        'Content-Type': 'application/json',
      },
    },
  )

  const result = await response.json()

  if (result.inlineMessage) {
    const subscriber = {
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
    }

    if (input.tourID && input.tourName) {
      const tour = await notionClient.pages.retrieve({
        page_id: input.tourID,
      })

      if (!isFullPage(tour)) {
        throw new Error('Could not find tour')
      }

      return { subscriber, tour }
    }

    return {
      subscriber,
    }
  }

  throw new Error('An error occurred during form submission')
}
