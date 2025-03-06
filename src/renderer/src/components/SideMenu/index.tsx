import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import User from '@renderer/components/User'
import root from './index.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@renderer/store'
import classNames from 'classnames'
import { useState, useEffect } from 'react'
import { throttled } from '@renderer/utils/utils'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: 'sub1',
    label: 'Navigation 1',
    icon: <AppstoreOutlined />,
    children: [
      { key: '11', label: 'Option 1' },
      { key: '12', label: 'Option 2' },
      {
        key: 'sub11',
        label: 'Submenu',
        children: [
          { key: '111', label: 'Option 3' },
          { key: '112', label: 'Option 4' }
        ]
      }
    ]
  },
  {
    key: 'sub2',
    label: 'Navigation 2',
    icon: <AppstoreOutlined />,
    children: [
      { key: '21', label: 'Option 5' },
      { key: '22', label: 'Option 6' },
      {
        key: 'sub21',
        label: 'Submenu',
        children: [
          { key: '211', label: 'Option 7' },
          { key: '212', label: 'Option 8' }
        ]
      }
    ]
  },
  {
    key: 'sub3',
    label: 'Navigation 3',
    icon: <AppstoreOutlined />,
    children: [
      { key: '31', label: 'Option 5' },
      { key: '32', label: 'Option 6' },
      {
        key: 'sub31',
        label: 'Submenu',
        children: [
          { key: '311', label: 'Option 7' },
          { key: '312', label: 'Option 8' }
        ]
      }
    ]
  }
]

function SideMenu(): JSX.Element {
  const [expanded, setExpanded] = useState(true)
  const collapsed = useSelector((state: RootState) => state.navigation.collapsed)

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
  }

  useEffect((): void => {
    if (collapsed && expanded) {
      setExpanded(false)
    }
  }, [collapsed])

  // 鼠标进入时，如果菜单是收起状态，则展开菜单
  const handleMouseEnter = throttled(() => {
    if (collapsed) {
      setExpanded(true)
    }
  }, 150) as React.MouseEventHandler<HTMLDivElement>

  // 鼠标离开时，如果菜单是收起状态，则收起菜单
  const handleMouseLeave = throttled(() => {
    if (collapsed) {
      setExpanded(false)
    }
  }, 150) as React.MouseEventHandler<HTMLDivElement>

  return (
    <>
      <div className={classNames(root.menu, { [root.collapsed]: collapsed && !expanded })}>
        <div className={classNames(root.menuBox, { [root.collapsed]: collapsed })}>
          <div
            className={root.menuContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Menu
              onClick={onClick}
              className={root.menuPanel}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              items={items}
            />
          </div>
          <User />
        </div>
      </div>
    </>
  )
}

export default SideMenu
