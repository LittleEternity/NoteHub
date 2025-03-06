import root from './index.module.scss'
import { useState } from 'react'
import { DoubleLeftOutlined, DoubleRightOutlined, MenuOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCollapsed } from '@renderer/store/navigationSlice'
import { RootState } from '@renderer/store'
import classNames from 'classnames'

function Navigation(): JSX.Element {
  const [showMenuRight, setShowMenuRight] = useState(false)
  const dispatch = useDispatch()
  const collapsed = useSelector((state: RootState) => state.navigation.collapsed)

  const onChangeMenuShow = () => {
    // TODO: change menu show
    dispatch(toggleCollapsed())
  }

  return (
    <>
      <div className={root.nav}></div>
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
