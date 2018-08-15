import Amplify, { Auth } from 'aws-amplify'
import aws_exports from '../aws-exports.js'
Amplify.configure(aws_exports)

const shareholderId = 'Shareholder-36f6290c-23b1-4803-b59f-fbc511aef417';
export async function updateUserAttributes() {
  const user = await Auth.currentAuthenticatedUser();
  const result = await Auth.updateUserAttributes(user, {
    'custom:shareholderId': shareholderId
  })
  console.log(result)
}
