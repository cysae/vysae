import Amplify, { Auth } from 'aws-amplify'
import aws_exports from '../aws-exports.js'
Amplify.configure(aws_exports)

export async function updateUserAttributes() {
  const user = await Auth.currentAuthenticatedUser();
  const result = await Auth.updateUserAttributes(user, {
    'custom:shareholderId': 'Shareholder-106bd47a-325c-46e7-a4a5-66b37d26c5cf'
  })
  console.log(result)
}
