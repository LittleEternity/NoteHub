import root from './index.module.scss'
import SideMenu from '@renderer/components/SideMenu'
import Navigation from '@renderer/components/Navigation'
import { Routes, Route, Outlet } from 'react-router-dom'
import User from '@renderer/pages/User' // 用户
import { useSelector } from 'react-redux'
import { RootState } from '@renderer/store'
import classNames from 'classnames'
import { Layout } from 'antd'
const { Header, Footer, Content } = Layout

export default function Home() {
  const collapsed = useSelector((state: RootState) => state.navigation.collapsed)

  return (
    <>
      <div className={root.home}>
        <SideMenu />
        <div className={classNames(root.menu, { [root.collapsed]: collapsed })}></div>
        <Layout className={root.layout}>
          <Header className={root.header}>
            <Navigation />
          </Header>
          <Content className={root.content}>
            <Outlet />
            <Routes>
              <Route path="user" element={<User />} />
            </Routes>
          </Content>
        </Layout>
      </div>
    </>
  )
}
