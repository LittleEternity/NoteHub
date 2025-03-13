import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import root from './index.module.scss'
import { Input, Avatar, Empty } from 'antd'
import { ReadOutlined } from '@ant-design/icons'
import { getNoteDetail, updateNote, addNote } from '@renderer/utils/services/note'
import { getUUID } from '@renderer/utils/utils'
import { RootState } from '@renderer/store'
import { useDispatch, useSelector } from 'react-redux'
import commaLeft from '@renderer/assets/imgs/comma_left.jpg'
import commaRight from '@renderer/assets/imgs/comma_right.jpg'
import NodeText from '@renderer/components/NodeText'
import NodePage from '@renderer/components/NodePage'
import { setMoveFinish } from '@renderer/store/nodeSlice'

interface NoteDetail {
  noteId?: string
  title?: string
  cover?: string
  content?: NoteContentItem[]
}

interface NoteContentItem {
  nodeId: string
  key: string
  type: string
  value: any
}

const Note = (): React.ReactElement => {
  const dispatch = useDispatch()
  const { noteId } = useParams<{ noteId: string }>()
  const [noteDetail, setNoteDetail] = useState<NoteDetail>({})
  const [noteContent, setNoteContent] = useState<NoteContentItem[]>([])
  const [styles, setStyles] = useState<React.CSSProperties>({})
  const [focusNodeId, setFocusNodeId] = useState<string>('')
  const [cursorPosition, setCursorPosition] = useState<number>(0)
  const deleteNodeId = useSelector((state: RootState) => state.node.deleteNodeId) // 是否移动节点
  const isMoveNode = useSelector((state: RootState) => state.node.isMoveNode) // 是否移动节点
  const moveSourceId = useSelector((state: RootState) => state.node.moveSourceId) // 移动原节点 ID
  const moveTargetId = useSelector((state: RootState) => state.node.moveTargetId) // 移动目标节点 ID
  const navigate = useNavigate()
  let setFoucusNodeTimer

  const init = () => {
    setNoteDetail({})
    setNoteContent([])
    setStyles({})
    setFocusNodeId('')
  }

  useEffect(() => {
    init()
    handleGetNoteDetail()
  }, [noteId])

  // 获取笔记详情
  const handleGetNoteDetail = async () => {
    try {
      const res = await getNoteDetail({ noteId: noteId || '' })
      const detail = res.data as NoteDetail
      setNoteDetail(detail)
      if (detail.content && Array.isArray(detail.content) && detail.content.length > 0) {
        let content = detail.content.map((item) => {
          return {
            key: item.nodeId,
            nodeId: item.nodeId,
            type: item.type,
            value: item.value
          }
        })
        setNoteContent(content)
      }

      if (detail.cover) {
        setStyles({
          backgroundImage: `url(${detail.cover})`
        })
      }
    } catch (error) {
      console.error('获取笔记详情失败:', error)
    }
  }

  // 默认的文本域修改回调
  const onChangeText = (index: number, value: any): void => {
    const newContent = [...noteContent]
    newContent[index].value = value
    setNoteContent(newContent)
  }

  // 新增节点
  const handleAddNode = (index: number = noteContent.length - 1) => {
    const key = getUUID()
    const newItem: NoteContentItem = {
      nodeId: '',
      key,
      type: 'text',
      value: ''
    }
    const newContent = [...noteContent]
    newContent.splice(index + 1, 0, newItem)
    setNoteContent(newContent)
    handleSetFoucusNodeId(key)
  }

  // 删除节点
  const onDeleteNode = (index, isSetPrevNodeFocus) => {
    const newContent = [...noteContent]
    newContent.splice(index, 1)
    if (isSetPrevNodeFocus) {
      if (index) {
        handleSetFoucusNodeId(noteContent[index - 1].key)
      } else if (newContent.length > 0) {
        handleSetFoucusNodeId(noteContent[0].key)
      }
    }
    setNoteContent(newContent)
  }

  useEffect(() => {
    if (deleteNodeId) {
      const index = noteContent.findIndex((item) => item.key === deleteNodeId)
      if (index !== -1) {
        onDeleteNode(index, false)
      }
    }
  }, [deleteNodeId])

  // 按下回车键回调
  const onPressEnter = (index): void => {
    handleAddNode(index)
  }

  // 点击空白区域回调
  const handleClickBlock = (): void => {
    if (!noteContent.length || noteContent[noteContent.length - 1].value !== '') {
      handleAddNode(noteContent.length - 1)
    } else {
      let key = noteContent[noteContent.length - 1].key
      handleSetFoucusNodeId(key)
    }
  }

  // 处理聚焦节点
  const handleSetFoucusNodeId = (key: string): void => {
    setFocusNodeId('')
    clearTimeout(setFoucusNodeTimer)
    setFoucusNodeTimer = setTimeout(() => {
      setFocusNodeId(key)
    }, 100)
  }

  // 处理选择组件回调
  const handleSelectComponent = async (index: number, type: string) => {
    const newContent = [...noteContent]
    newContent[index].type = type

    setNoteContent(newContent)
    if (type === 'page') {
      const res = await addNote({ parentNoteId: noteId })
      const newNote = res.data as NoteDetail
      newContent[index].value = {
        noteId: newNote.noteId
      }
      handleUpdateNote()
      navigate(`/${newNote.noteId}`)
    } else {
      newContent[index].value = ''
      handleSetFoucusNodeId(newContent[index].key)
    }
  }

  // 处理聚焦节点
  const handleChangeFocus = (index: number, position: number = -1) => {
    let i = index > noteContent.length - 1 ? noteContent.length - 1 : index
    handleSetFoucusNodeId(noteContent[i].key)
    setCursorPosition(position)
  }

  // 更新笔记
  const handleUpdateNote = () => {
    updateNote({
      noteId: noteId || '',
      title: noteDetail.title || '',
      cover: noteDetail.cover || '',
      content: noteContent
    })
  }

  // 移动节点位置
  const handleChangePosition = (source: string, target: string) => {
    // 找到 key 为 target 的项目的索引
    const sourceIndex = noteContent.findIndex((item) => item.key === source)
    const targetIndex = noteContent.findIndex((item) => item.key === target)
    if (sourceIndex === -1 || targetIndex === -1) {
      return
    }
    // 创建一个新的 noteContent 副本
    const newContent = [...noteContent]
    const [item] = newContent.splice(sourceIndex, 1)
    newContent.splice(targetIndex, 0, item)
    // 更新 noteContent 状态
    setNoteContent(newContent)
    dispatch(setMoveFinish())
  }

  // 处理移动节点
  useEffect(() => {
    if (isMoveNode) {
      handleChangePosition(moveSourceId, moveTargetId)
    }
  }, [isMoveNode])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault()
        handleUpdateNote()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleUpdateNote])

  return (
    <div className={root.note}>
      <div className={root.cover} style={styles}></div>
      <div className={root.container}>
        <div className={root.header}>
          <Avatar className={root.icon} size={76} icon={<ReadOutlined />} />
          <Input
            classNames={{
              input: root.input
            }}
            placeholder="标题"
            variant="borderless"
            value={noteDetail.title}
            onChange={(e) => {
              setNoteDetail({
                ...noteDetail,
                title: e.target.value
              })
            }}
          />
        </div>
        <div className={root.content}>
          <img className={root.commaLeft} src={commaLeft} />
          <img className={root.commaRight} src={commaRight} />
          {noteContent.map((item, index) => (
            <React.Fragment key={item.key}>
              {(item.type === 'text' || item.type.includes('heading')) && (
                <NodeText
                  nodeId={item.key}
                  index={index}
                  type={item.type}
                  focus={item.key === focusNodeId}
                  cursorPosition={cursorPosition}
                  value={item.value}
                  onChange={onChangeText}
                  onDeleteNode={onDeleteNode}
                  onPressEnter={onPressEnter}
                  onChangeComponent={handleSelectComponent}
                  onChangeFocus={handleChangeFocus}
                />
              )}
              {item.type === 'page' && (
                <NodePage
                  nodeId={item.key}
                  index={index}
                  type={item.type}
                  message={item.value}
                  onDeleteNode={onDeleteNode}
                />
              )}
            </React.Fragment>
          ))}
          <div className={root.block} onClick={handleClickBlock}>
            {noteContent.length === 0 && <Empty description="还没有写任何内容呢～" />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Note
