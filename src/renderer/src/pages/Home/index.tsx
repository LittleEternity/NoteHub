import './index.scss'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom' // 新增导入
import { getUserinfo } from '@renderer/utils/services/user'

export default function Home() {
  useEffect(() => {
    getUserinfo({}).then((res) => {
      console.log(res)
    })
  }, [])
  const navigate = useNavigate() // 获取navigate函数
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const onAbout = (): void => {
    navigate('/about') // 实现路由跳转
  }

  return (
    <>
      <div>
        <span onClick={ipcHandle}>Ping</span>
        <span onClick={onAbout}>About</span>
      </div>
    </>
  )
}
