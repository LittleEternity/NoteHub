import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import root from './index.module.scss'
import { Input, Avatar, Empty } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { getNoteDetail, updateNote } from '@renderer/utils/services/note'
import { getUUID } from '@renderer/utils/utils'
import commaLeft from '@renderer/assets/imgs/comma_left.jpg'
import commaRight from '@renderer/assets/imgs/comma_right.jpg'
import NodeText from '@renderer/components/NodeText'

interface NoteDetail {
  id?: string
  title?: string
  cover?: string
  content?: NoteContentItem[]
}

interface NoteContentItem {
  nodeId: string
  key: string
  type: string
  value: string
}

const Note = (): React.ReactElement => {
  const { noteId } = useParams<{ noteId: string }>()
  const [noteDetail, setNoteDetail] = useState<NoteDetail>({})
  const [noteContent, setNoteContent] = useState<NoteContentItem[]>([])
  const [styles, setStyles] = useState<React.CSSProperties>({})
  const [focusNodeId, setFocusNodeId] = useState<string>('')
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
  const onChangeText = (index, value) => {
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
      console.log(newContent)
      if (index) {
        handleSetFoucusNodeId(noteContent[index - 1].key)
      } else if (newContent.length > 0) {
        handleSetFoucusNodeId(noteContent[0].key)
      }
    }
    setNoteContent(newContent)
  }

  // 按下回车键回调
  const onPressEnter = (index) => {
    handleAddNode(index)
  }

  // 点击空白区域回调
  const handleClickBlock = () => {
    if (!noteContent.length || noteContent[noteContent.length - 1].value !== '') {
      handleAddNode(noteContent.length - 1)
    } else {
      let key = noteContent[noteContent.length - 1].key
      handleSetFoucusNodeId(key)
    }
  }

  // 处理聚焦节点
  const handleSetFoucusNodeId = (key) => {
    setFocusNodeId('')
    clearTimeout(setFoucusNodeTimer)
    setFoucusNodeTimer = setTimeout(() => {
      setFocusNodeId(key)
    }, 100)
  }

  const handleSelectComponent = (index: number, type: string) => {
    console.log('选择组件', type)
    const newContent = [...noteContent]
    newContent[index].type = type
    newContent[index].value = ''
    setNoteContent(newContent)
    handleSetFoucusNodeId(newContent[index].key)
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
          <Avatar className={root.icon} size={76} icon={<UserOutlined />} />
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
                  index={index}
                  type={item.type}
                  focus={item.key === focusNodeId}
                  value={item.value}
                  onChange={onChangeText}
                  onDeleteNode={onDeleteNode}
                  onPressEnter={onPressEnter}
                  onChangeComponent={handleSelectComponent}
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
