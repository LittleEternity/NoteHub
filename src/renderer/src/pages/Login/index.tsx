import { useNavigate } from 'react-router-dom' // 新增导入
import root from './index.module.scss'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'
import type { FormProps } from 'antd'
import { login } from '@renderer/utils/services/user'
import register_bg from '@renderer/assets/imgs/register_bg.png'

export default function Home() {
  type FieldType = {
    account?: string
    password?: string
    remember?: string
  }
  const navigate = useNavigate() // 新增导航器
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    login({
      account: values.account,
      password: values.password
    })
      .then((res) => {
        const { userId, email, name, avatar, token, tokenType, refreshToken } = res.data
        localStorage.setItem('tokenType', tokenType)
        localStorage.setItem('token', token.trim())
        localStorage.setItem('refreshToken', refreshToken.trim())
        localStorage.setItem('userInfo', JSON.stringify({ userId, email, name, avatar }))
        navigate('/')
      })
      .catch((res) => {
        console.log(res)
      })
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <div className={root.login} style={{ backgroundImage: `url(${register_bg})` }}>
        <div className={root.loginBox}>
          <h1 className={root.title}>心之所思，琢之成器</h1>
          <h3 className={root.subtitle}>请先登录，开始书写你的篇章</h3>
          <Form
            size="large"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="account"
              rules={[{ required: true, message: '账户名不能为空！' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入邮箱或用户名" />
            </Form.Item>
            <Form.Item<FieldType>
              name="password"
              rules={[{ required: true, message: '密码不能为空！' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入密码"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block htmlType="submit">
                登陆
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}
