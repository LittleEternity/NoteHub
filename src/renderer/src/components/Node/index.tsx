import root from './index.module.scss'
import { Button, Dropdown } from 'antd'
import { useState } from 'react'
import classNames from 'classnames'
import { CopyOutlined, DeleteOutlined, HolderOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useDispatch } from 'react-redux'
import {
  setMoveSource,
  setMoveTarget,
  setDeleteNode,
  setIsMoveNode
} from '@renderer/store/nodeSlice'

interface NoteNodeProps {
  nodeId: string
  children?: JSX.Element
  type?: string
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
let sourceId = ''
let targetId = ''

function NoteNode({ nodeId, type, children }: NoteNodeProps): JSX.Element {
  const dispatch = useDispatch()
  const [menuShow, setMenuShow] = useState(false)
  const [isDrag, setIsDrag] = useState(false)
  const [showBackground, setShowBackground] = useState(false)

  const handleMenuClick = (e) => {
    switch (e.key) {
      case 'copy':
        break
      case 'delete':
        dispatch(setDeleteNode(nodeId))
        break
    }
  }

  // 菜单打开关闭处理事件
  const onMenuOpenChange = (open: boolean) => {
    if (open) {
      setShowBackground(true)
    } else {
      setShowBackground(false)
    }
  }

  //  拖拽开始处理事件
  const handleDragStart = (event) => {
    console.log(event)
    sourceId = event.target.dataset.nodeId
    dispatch(setMoveSource(sourceId))
    setTimeout(() => {
      setIsDrag(true)
    }, 0)
  }

  // 拖拽进入目标处理事件
  const handleDragEnter = (event) => {
    // 向上查找包含 data-node-id 属性的节点
    let target = event.target
    while (target && !target.dataset.nodeId) {
      target = target.parentNode
    }

    let _targetId = target.dataset.nodeId
    if (!_targetId || _targetId === sourceId) {
      targetId = ''
    } else {
      targetId = _targetId
    }
    dispatch(setMoveTarget(targetId))
    // onShowDragDivide(targetId)
  }

  const handleDragEnd = (e) => {
    e.preventDefault()
    if (sourceId && targetId) {
      // onDrag(sourceId, targetId)
      dispatch(setIsMoveNode(true))
      // 重置 sourceId 和 targetId
      sourceId = ''
      targetId = ''
    }
    setIsDrag(false)
  }

  return (
    <>
      <div
        className={classNames(
          root.node,
          menuShow ? root.menuShow : root.menuHide,
          showBackground ? root.showBackground : root.hideBackground,
          isDrag && root.drag
        )}
        data-node-id={nodeId}
        onMouseEnter={() => {
          setMenuShow(true)
        }}
        onMouseLeave={() => {
          setMenuShow(false)
        }}
        draggable
        onDragStart={handleDragStart}
        onDragEnter={handleDragEnter}
        onDragEnd={handleDragEnd}
      >
        <Dropdown
          overlayClassName={root.dropdown}
          menu={{ items, onClick: handleMenuClick }}
          placement="bottomLeft"
          trigger={['click']}
          onOpenChange={onMenuOpenChange}
        >
          <div data-node-id={nodeId} className={classNames(root.menu, root[type || 'base'])}>
            <Button className={root.menuBtn} type="text" icon={<HolderOutlined />} />
          </div>
        </Dropdown>
        <div className={root.children}>{children}</div>
      </div>
    </>
  )
}

export default NoteNode
