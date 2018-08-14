import Amplify, { Auth } from 'aws-amplify'
import aws_exports from '../aws-exports.js'
Amplify.configure(aws_exports)

export async function updateUserAttributes() {
  const user = await Auth.currentAuthenticatedUser();
  const result = await Auth.updateUserAttributes(user, {
    'custom:shareholderId': 'Shareholder-993946e3-d983-4729-85fa-69b0b6eb28f2'
  })
  console.log(result)
}
