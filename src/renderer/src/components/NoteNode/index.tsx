import root from './index.module.scss'
import { Button, Dropdown } from 'antd'
import { useState } from 'react'
import classNames from 'classnames'
import { CopyOutlined, DeleteOutlined, HolderOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

interface NoteNodeProps {
  children?: JSX.Element
  onDelete: () => void
}

const items: MenuProps['items'] = [
  {
    key: 'copy',
    label: <span>复制</span>,
    icon: <CopyOutlined />
  },
  {
    key: 'delete',
    label: <span>删除</span>,
    icon: <DeleteOutlined />
  }
]

function NoteNode({ children, onDelete }: NoteNodeProps): JSX.Element {
  const [menuShow, setMenuShow] = useState(false)
  const [showBackground, setShowBackground] = useState(false)

  const handleMenuClick = (e) => {
    switch (e.key) {
      case 'copy':
        break
      case 'delete':
        console.log('删除')
        onDelete()
        break
    }
  }

  const onMenuOpenChange = (open: boolean) => {
    if (open) {
      setShowBackground(true)
    } else {
      setShowBackground(false)
    }
  }

  return (
    <>
      <div
        className={classNames(
          root.node,
          menuShow ? root.menuShow : root.menuHide,
          showBackground ? root.showBackground : root.hideBackground
        )}
        onMouseEnter={() => {
          setMenuShow(true)
        }}
        onMouseLeave={() => {
          setMenuShow(false)
        }}
      >
        <Dropdown
          overlayClassName={root.dropdown}
          menu={{ items, onClick: handleMenuClick }}
          placement="bottomLeft"
          onOpenChange={onMenuOpenChange}
        >
          <Button className={root.menu} type="text" icon={<HolderOutlined />} />
        </Dropdown>
        <div className={root.children}>{children}</div>
      </div>
    </>
  )
}

export default NoteNode
