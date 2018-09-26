// amplify
import { API, graphqlOperation } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { CreateMeeting, CreateMeetingAgreement } from '../../../../../graphql/mutations'
import Promise from 'bluebird'

export default (companyId, meeting, agreements) => {
  return API.graphql(graphqlOperation(gqlToString(CreateMeeting), {
    input: { meetingCompanyId: companyId, ...meeting }
  })).then(({ data: { createMeeting }}) => {
    const promises = agreements.map((agreement) => {
      return API.graphql(graphqlOperation(gqlToString(CreateMeetingAgreement), {
        input: {
          meetingAgreementMeetingId: createMeeting.id,
          ...agreement
        }
      }))
    })
    return Promise.all(promises)
  })
}
