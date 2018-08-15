import Amplify, { Auth } from 'aws-amplify'
import aws_exports from '../aws-exports.js'
Amplify.configure(aws_exports)

export async function updateUserAttributes() {
  const user = await Auth.currentAuthenticatedUser();
  const result = await Auth.updateUserAttributes(user, {
    'custom:shareholderId': 'Shareholder-d6b4b830-7a39-4eba-aeba-d0af62373b52'
  })
  console.log(result)
}
