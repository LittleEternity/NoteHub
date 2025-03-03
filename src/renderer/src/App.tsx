import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // 新增
import About from './pages/About'; // 新增

function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
