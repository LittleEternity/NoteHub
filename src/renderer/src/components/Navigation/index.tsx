import root from './index.module.scss'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  MenuOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCollapsed } from '@renderer/store/navigationSlice'
import { RootState } from '@renderer/store'
import classNames from 'classnames'
import SearchBar from '../SearchBar'
import { addNote } from '@renderer/utils/services/note'

function Navigation(): JSX.Element {
  const navigate = useNavigate()
  const [showMenuRight, setShowMenuRight] = useState(false)
  const dispatch = useDispatch()
  const collapsed = useSelector((state: RootState) => state.navigation.collapsed)

  const onChangeMenuShow = () => {
    // TODO: change menu show
    dispatch(toggleCollapsed())
  }

  const onSearch = () => {}

  const handleAddNote = () => {
    addNote().then((res) => {
      console.log('res', res)
      navigate(`/${res.data.noteId}`)
    })
  }

  return (
    <>
      <div className={root.nav}>
        <div className={root.navLeft}></div>
        <SearchBar />
        <div className={root.navRight}>
          <Button
            className={root.newBtn}
            type="text"
            icon={<PlusOutlined />}
            onClick={handleAddNote}
          ></Button>
        </div>
      </div>
      <div className={classNames(root.menuNav, { [root.collapsed]: collapsed })}>
        <Button
          type="text"
          icon={
            collapsed ? (
              showMenuRight ? (
                <DoubleRightOutlined />
              ) : (
                <MenuOutlined />
              )
            ) : (
              <DoubleLeftOutlined />
            )
          }
          onClick={onChangeMenuShow}
          onMouseEnter={() => {
            setShowMenuRight(true)
          }}
          onMouseLeave={() => {
            setShowMenuRight(false)
          }}
        />
      </div>
    </>
  )
}

export default Navigation
