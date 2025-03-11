import root from './index.module.scss'
import { FileTextOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { useEffect, useState } from 'react'

const items: MenuProps['items'] = [
  {
    key: 'text',
    label: '文本',
    icon: <span>T</span>
  },
  {
    key: 'page',
    label: '页面',
    icon: <FileTextOutlined />
  },
  {
    key: 'heading1',
    label: '一级标题',
    icon: <span>H1</span>,
    extra: '#'
  },
  {
    key: 'heading2',
    label: '二级标题',
    icon: <span>H2</span>,
    extra: '##'
  },
  {
    key: 'heading3',
    label: '三级标题',
    icon: <span>H3</span>,
    extra: '###'
  }
]

function NodeSelection({ children, show, onChange }): JSX.Element {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const onClick: MenuProps['onClick'] = (e) => {
    setSelectedKeys([e.key])
    onChange(e.key)
  }
  useEffect(() => {
    if (show) {
      if (items && items.length > 0) {
        setSelectedKeys([items[0]?.key as string])
      }
    }
  }, [show])
  return (
    <>
      <Dropdown menu={{ items, selectedKeys, onClick }} open={show}>
        <div>{children}</div>
      </Dropdown>
    </>
  )
}

export default NodeSelection
