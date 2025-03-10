import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import root from './index.module.scss'
import { Input, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { getNoteDetail, updateNote } from '@renderer/utils/services/note'
import NoteText from '@renderer/components/NoteText'
import { getUUID } from '@renderer/utils/utils'

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
  const { noteIds } = useParams<{ noteIds: string }>()
  const [noteDetail, setNoteDetail] = useState<NoteDetail>({})
  const [noteContent, setNoteContent] = useState<NoteContentItem[]>([
    {
      nodeId: '',
      key: getUUID(),
      type: 'text',
      value: ''
    }
  ])
  const [styles, setStyles] = useState<React.CSSProperties>({})

  useEffect(() => {
    handleGetNoteDetail()
  }, [])

  // 获取笔记详情
  const handleGetNoteDetail = async () => {
    try {
      const res = await getNoteDetail({ noteId: noteIds || '' })
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
    if (index === noteContent.length - 1) {
      if (value.trim() !== '') {
        const newItem: NoteContentItem = {
          nodeId: '',
          key: getUUID(),
          type: 'text',
          value: ''
        }
        setNoteContent((prevContent) => [...prevContent, newItem])
      }
    }
  }

  const onDeleteNode = (index) => {
    const newContent = [...noteContent]
    newContent.splice(index, 1)
    console.log(newContent)
    setNoteContent(newContent)
  }

  const onPressEnter = (index) => {
    const newItem: NoteContentItem = {
      nodeId: '',
      key: getUUID(),
      type: 'text',
      value: ''
    }
    const newContent = [...noteContent]
    newContent.splice(index + 1, 0, newItem)
    setNoteContent(newContent)
  }

  const handleUpdateNote = () => {
    updateNote({
      noteId: noteIds || '',
      title: noteDetail.title || '',
      cover: noteDetail.cover || '',
      content: noteContent
    })
      .then((res) => {
        console.log(res)
      })
      .catch((res) => {
        console.log(res)
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
          {noteContent.map((item, index) => (
            <React.Fragment key={item.key}>
              <NoteText
                index={index}
                value={item.value}
                onChange={onChangeText}
                onDeleteNode={onDeleteNode}
                onPressEnter={onPressEnter}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Note
