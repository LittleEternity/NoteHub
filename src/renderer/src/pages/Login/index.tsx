import './index.scss'
import { useNavigate } from 'react-router-dom' // 新增导入

export default function Home() {
  const navigate = useNavigate() // 获取navigate函数
  const con = (): void => console.log('111')

  return (
    <>
      <div>
        <span onClick={con}>Login</span>
      </div>
    </>
  )
}
