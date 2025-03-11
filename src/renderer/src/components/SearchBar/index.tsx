import root from './index.module.scss'
import { useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'

function SearchBar(): JSX.Element {
  return (
    <>
      <Input className={root.search} placeholder="页面标题或内容" prefix={<SearchOutlined />} />
    </>
  )
}

export default SearchBar
