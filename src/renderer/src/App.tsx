import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { ThemeSelector } from './components/ThemeSelector'
import Home from './pages/Home' // 首页
import Login from './pages/Login' // 登陆
import About from './pages/About' // 关于

function App(): JSX.Element {
  return (
    <>
      <ConfigProvider theme={{ token: { colorPrimary: 'var(--primary-color)' } }}>
        <ThemeSelector />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </>
  )
}

export default App
