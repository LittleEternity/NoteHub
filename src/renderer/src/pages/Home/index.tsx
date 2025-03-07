import React from 'react'
import root from './index.module.scss'
import SideMenu from '@renderer/components/SideMenu'
import Navigation from '@renderer/components/Navigation'
import { Routes, Route, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@renderer/store'
import classNames from 'classnames'
import { Layout } from 'antd'
const { Header, Content } = Layout
import User from '@renderer/pages/User' // 用户
import Note from '@renderer/pages/Note' // 笔记

export default function Home(): React.ReactElement {
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
              <Route path=":noteIds/*" element={<Note />} />
            </Routes>
          </Content>
        </Layout>
      </div>
    </>
  )
}
