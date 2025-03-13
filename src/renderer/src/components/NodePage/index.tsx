import root from './index.module.scss'
import Node from '@renderer/components/Node'
import { Avatar } from 'antd'
import { ReadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

interface NodePageProps {
  nodeId: string
  type: string
  message: NodePageMessage
}

interface NodePageMessage {
  noteId: string
  title: string
  cover?: string
  updatedAt: string
}

function NodePage({ nodeId, type, message }: NodePageProps): JSX.Element {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/${message.noteId}`)
  }
  return (
    <>
      <Node nodeId={nodeId} type={type}>
        <div className={root.page} onClick={handleClick}>
          <Avatar className={root.icon} size={34} icon={<ReadOutlined />} />
          <div className={root.title}>{message.title}</div>
        </div>
      </Node>
    </>
  )
}

export default NodePage
