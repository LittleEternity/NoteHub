import "./index.scss"
import { useNavigate } from 'react-router-dom' // 新增导入
import Versions from '../../components/Versions'
import electronLogo from '../../assets/electron.svg'

export default function Home() {
    const navigate = useNavigate() // 获取navigate函数
    const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
    const onAbout = ():void => {
      navigate('/about') // 实现路由跳转
    }
  
    return (
      <>
        <img alt="logo" className="logo" src={electronLogo} />
        <div className="creator">Powered by electron-vite</div>
        <div className="text">
          Build an Electron app with <span className="react">React</span>
          &nbsp;and <span className="ts">TypeScript</span>
        </div>
        <p className="tip">
          Please try pressing <code>F12</code> to open the devTool
        </p>
        <div className="actions">
          <div className="action">
            <a className="btn" href="https://electron-vite.org/" target="_blank" rel="noreferrer">
              Documentation
            </a>
          </div>
          <div className="action">
            <a className="btn" target="_blank" rel="noreferrer" onClick={ipcHandle}>
              Send IPC
            </a>
          </div>
          <div className="action">
            <span  className="btn" onClick={onAbout}>About</span>
          </div>
        </div>
        <Versions></Versions>
      </>
    )
  }