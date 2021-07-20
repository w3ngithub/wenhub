import React from 'react'
import Link from 'next/link'
import { Form, Input, Checkbox } from 'antd'
import ButtonComponent from 'components/elements/Button'
import FormField from 'components/elements/Form'
import styles from './styles.module.css'

function Login() {
  const [form] = Form.useForm()

  const onSubmit = (values) => {
    console.log(values)
  }
  return (
    <div className={styles.login_container}>
      <div className={styles.login}>
        <h1>
          <Link href="https://wordpress.org/">
            <span className={styles.logo}> Powered By Wordpress</span>
          </Link>
        </h1>
        <Form
          layout="vertical"
          form={form}
          onFinish={onSubmit}
          initialValues={{ username: '', password: '' }}
        >
          <div className={styles.login_form}>
            <Form.Item
              name="username"
              rules={[{ required: true }]}
              label="Username or Email Address"
            >
              <FormField
                component="InputField"
                width="100%"
                borderRadius="3px"
                padding="8px"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true }]}
              label="Password"
            >
              <Input.Password
                style={{ width: '100%', borderRadius: '3px', padding: '6px' }}
              />
            </Form.Item>
            <div className={styles.form_actions}>
              <Form.Item name="rememberMe" valuePropName="checked">
                <Checkbox>Remember Me</Checkbox>
              </Form.Item>
              <Form.Item>
                <ButtonComponent
                  btnText="Log In"
                  htmlType="submit"
                ></ButtonComponent>
              </Form.Item>
            </div>
          </div>
        </Form>
        <p className={styles.lost_passwrod}>
          <Link href="/">
            <span>Lost your Password?</span>
          </Link>
        </p>
        <p className={styles.lost_passwrod}>
          <Link href="/">
            <span>← Go to WENHUB RT</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
