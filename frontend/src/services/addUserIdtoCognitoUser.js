import Amplify, { Auth } from 'aws-amplify'
import aws_exports from '../aws-exports.js'
Amplify.configure(aws_exports)

const userId = '3310d472-a8e6-4978-8c9d-bb947d45c689'
export default async function addUserIdToCognitoUser() {
  const user = await Auth.currentAuthenticatedUser();
  const result = await Auth.updateUserAttributes(user, {
    'custom:userId': userId
  })
}
