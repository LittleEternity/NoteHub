import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home' // 首页
import Login from './pages/Login' // 登陆
import About from './pages/About' // 关于

function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
