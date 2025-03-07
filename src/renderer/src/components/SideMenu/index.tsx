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
import { getNoteCatalog } from '@renderer/utils/services/note'
import { useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number] & {
  children?: MenuItem[]
}

function SideMenu(): JSX.Element {
  const [menuItems, setMenuItems] = useState<any>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([''])
  const [expanded, setExpanded] = useState(true)
  const collapsed = useSelector((state: RootState) => state.navigation.collapsed)
  const navigate = useNavigate()

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    handleSelect(e.key)
  }
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    console.log('onOpenChange ', keys)
  }

  const handleSelect = (key: string) => {
    console.log('key', key)
    navigate(`/${key}`)
  }

  // 获取笔记目录
  const handleGetNoteCatalog = async (): Promise<void> => {
    try {
      const res: any = await getNoteCatalog()
      const menuItems: MenuItem[] = handleGetMenuItems(res.data)
      if (res.data.length > 0) {
        setSelectedKeys([res.data[0].noteId])
        setMenuItems(menuItems)
      }
    } catch (error) {
      console.error('获取笔记目录失败:', error)
    }
  }
  // 递归获取菜单
  const handleGetMenuItems = (list: any[]): MenuItem[] => {
    return list.map((itemData: any): MenuItem => {
      const item: MenuItem = {
        key: itemData.noteId,
        label: itemData.title || '未命名',
        icon: <AppstoreOutlined />
      }

      if (itemData.children && itemData.children.length > 0) {
        item.children = handleGetMenuItems(itemData.children)
      }

      return item
    })
  }

  useEffect(() => {
    handleGetNoteCatalog()
  }, [])

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
              className={root.menuPanel}
              selectedKeys={selectedKeys}
              mode="inline"
              items={menuItems}
              onClick={onClick}
              onOpenChange={onOpenChange}
            />
            <User />
          </div>
        </div>
      </div>
    </>
  )
}

export default SideMenu
