import React from 'react'
import FormField from 'components/elements/Form'
import ButtonComponent from 'components/elements/Button'

const PasswordProtected = () => (
  <form
    style={{ padding: '22px 0' }}
    onSubmit={(e) => {
      e.preventDefault()
      console.log('Submited')
    }}
  >
    <p>
      This content is password protected. To view it please enter your password
      below:
    </p>
    Password: <FormField component="InputField" value="" width="200px" />
    <br />
    <br />
    <ButtonComponent htmlType="submit" btnText="Enter" />
  </form>
)

export default PasswordProtected
