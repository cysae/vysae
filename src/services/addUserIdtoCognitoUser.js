import Amplify, { Auth } from 'aws-amplify'
import aws_exports from '../aws-exports.js'
Amplify.configure(aws_exports)

const userId = '30619be4-8e34-4b4d-a9a6-88fb0a30a518'
export default async function addUserIdToCognitoUser() {
  const user = await Auth.currentAuthenticatedUser();
  const result = await Auth.updateUserAttributes(user, {
    'custom:userId': userId
  })
}
