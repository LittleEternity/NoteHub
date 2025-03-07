import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import root from './index.module.scss'
import { Input, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { getNoteDetail } from '@renderer/utils/services/note'

const Note = (): React.ReactElement => {
  const { noteIds } = useParams()
  const [noteDetail, setNoteDetail] = useState<any>({})
  const [styles, setStyles] = useState<any>({})

  useEffect(() => {
    handleGetNoteDetail()
  }, [])

  // 获取笔记详情
  const handleGetNoteDetail = async () => {
    const res = await getNoteDetail({ noteId: noteIds || '' })
    const detail = res.data
    setNoteDetail(detail)
    if (detail.cover) {
      setStyles({
        backgroundImage: `url(${detail.cover})`
      })
    }
  }
  return (
    <div className={root.note}>
      <div className={root.cover} style={styles}></div>
      <div className={root.container}>
        <div className={root.header}>
          <Avatar className={root.icon} size={90} icon={<UserOutlined />} />
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
          <Input.TextArea
            classNames={{
              textarea: root.textarea
            }}
            placeholder="内容"
            variant="borderless"
            value={noteDetail.content}
            onChange={(e) => {
              setNoteDetail({
                ...noteDetail,
                content: e.target.value
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Note
