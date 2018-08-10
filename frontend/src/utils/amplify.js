import Amplify, { Auth } from 'aws-amplify'
import aws_exports from '../aws-exports.js'
Amplify.configure(aws_exports)

export async function updateUserAttributes() {
  const user = await Auth.currentAuthenticatedUser();
  const result = await Auth.updateUserAttributes(user, {
    'custom:shareholderId': 'Shareholder-e199e636-5cff-4293-94c4-3e2e996a6ea8'
  })
  console.log(result)
}
