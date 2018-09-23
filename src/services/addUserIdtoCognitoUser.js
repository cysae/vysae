import Amplify, { Auth } from 'aws-amplify'
import aws_exports from '../aws-exports.js'
Amplify.configure(aws_exports)

const userId = '42739029-aa7a-4bb2-b45b-c33a69589065'
export default async function addUserIdToCognitoUser() {
  const user = await Auth.currentAuthenticatedUser();
  const result = await Auth.updateUserAttributes(user, {
    'custom:userId': userId
  })
}
