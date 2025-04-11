import root from './index.module.scss'
import { Button, Dropdown } from 'antd'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { CopyOutlined, DeleteOutlined, HolderOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { RootState } from '@renderer/store'
import { useDispatch, useSelector } from 'react-redux'
import {
  setMoveSource,
  setMoveTarget,
  setDeleteNode,
  setIsMoveNode
} from '@renderer/store/nodeSlice'
import { useDrag, useDrop } from 'react-dnd'

interface NoteNodeProps {
  nodeId: string
  nodeIdList: Array<string>
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
let targetId = ''
let idList: string[] = []

function NoteNode({ nodeId, nodeIdList, type, children }: NoteNodeProps): JSX.Element {
  const dispatch = useDispatch()
  const [showBackground, setShowBackground] = useState<Boolean>(false)
  const [topOfBottom, setTopOfBottom] = useState<String>('')
  const moveTargetId = useSelector((state: RootState) => state.node.moveTargetId) // 移动目标节点 ID
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'node',
    item: {
      id: nodeId
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))
  const [, drop] = useDrop(() => ({
    accept: 'node',
    collect: (monitor) => ({
      isOver: monitor.isOver()
    }),
    hover: (item, monitor) => {
      if (item.id === nodeId) return
      if (targetId !== nodeId) {
        targetId = nodeId
        dispatch(setMoveTarget(nodeId))
        const sourceIndex = idList.findIndex((id) => id === item.id)
        const targetIndex = idList.findIndex((id) => id === nodeId)
        setTopOfBottom(targetIndex > sourceIndex ? 'bottom' : 'top')
      }
    },
    drop: (item: any) => {
      dispatch(setMoveTarget(nodeId))
      dispatch(setMoveSource(item.id))
      dispatch(setIsMoveNode(true))
      targetId = ''
    }
  }))

  useEffect(() => {
    idList = nodeIdList
  }, [JSON.stringify(nodeIdList)])

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

  return (
    <>
      <div
        className={classNames(
          root.node,
          showBackground ? root.showBackground : root.hideBackground,
          isDragging && root.drag,
          moveTargetId === nodeId && root.hover,
          topOfBottom === 'top' && root.hoverTop,
          topOfBottom === 'bottom' && root.hoverBottom
        )}
      >
        <div ref={(node) => drag(drop(node))}>
          <Dropdown
            overlayClassName={root.dropdown}
            menu={{ items, onClick: handleMenuClick }}
            placement="bottomLeft"
            trigger={['click']}
            onOpenChange={onMenuOpenChange}
          >
            <div className={classNames(root.menu, root[type || 'base'])}>
              <Button className={root.menuBtn} type="text" icon={<HolderOutlined />} />
            </div>
          </Dropdown>
        </div>
        <div className={root.children} ref={dragPreview}>
          {children}
        </div>
      </div>
    </>
  )
}

export default NoteNode
