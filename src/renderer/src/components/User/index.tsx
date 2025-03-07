import root from './index.module.scss'
import { useEffect, useState } from 'react'
import { Avatar, Dropdown } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { getUserinfo } from '@renderer/utils/services/user'
import { useNavigate } from 'react-router-dom'
import default_avatar from '@renderer/assets/imgs/default_avatar.png'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <span>个人中心</span>,
    icon: <UserOutlined />
  },
  {
    key: '2',
    label: <span>退出登录</span>,
    icon: <LogoutOutlined />
  }
]

function User(): JSX.Element {
  const [userInfo, setUserInfo] = useState<any>({})
  const navigate = useNavigate()

  useEffect(() => {
    getUserinfo().then((res) => {
      setUserInfo(res.data)
    })
  }, [])

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case '1': // 个人中心
        navigate(`/user`)
        break
      case '2': // 退出登录
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        navigate('/login')
        break
    }
  }
  return (
    <>
      <Dropdown
        overlayClassName={root.dropdown}
        menu={{ items, onClick: handleMenuClick }}
        placement="top"
      >
        <div className={root.user}>
          <Avatar size={24} src={userInfo.avatar || default_avatar} />
          <span className={root.name}>{userInfo.name}</span>
        </div>
      </Dropdown>
    </>
  )
}

export default User
