import Node from '../Node'
import NodeSelection from '../NodeSelection'
import root from './index.module.scss'
import { Input } from 'antd'
import { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'

interface NoteTextProps {
  index: number
  type: string
  value: string
  focus?: Boolean
  onChange: (index: number, value: string) => void
  onPressEnter: (index: number) => void
  onDeleteNode: (index: number, isSetPrevNodeFocus?: Boolean) => void
  onChangeComponent: (index: number, type: string) => void
}

function NoteText({
  index,
  type,
  value,
  focus,
  onChange,
  onPressEnter,
  onDeleteNode,
  onChangeComponent
}: NoteTextProps): JSX.Element {
  const inputRef = useRef<any>(null)
  const [showSelection, setShowSelection] = useState<Boolean>(false)

  const isUseNode = (str: string) => {
    const regex = /^\/([a-zA-Z\d\s])*$/
    return regex.test(str)
  }

  // 处理输入
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isUseNode(e.target.value)) {
      if (showSelection) setShowSelection(false)
    } else {
      if (!showSelection) setShowSelection(true)
    }
    onChange(index, e.target.value)
  }
  // 处理按键
  const handleKeyDown = (e) => {
    // 按下回车键时阻止默认行为，并触发onPressEnter创建新节点
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return // 如果同时按下 shift 不执行任何操作，允许换行等默认行为
      }
      e.preventDefault()
      if (showSelection) {
      } else {
        if (inputRef.current) {
          inputRef.current.blur()
        }
        onPressEnter(index)
      }
    }

    if (e.key === 'Backspace') {
      if (value === '') {
        if (inputRef.current) {
          inputRef.current.blur()
        }
        onDeleteNode(index, true)
      }
    }
  }

  // 选择节点组件回调
  const handleChangeComponent = (type: string) => {
    setShowSelection(false)
    onChangeComponent(index, type)
  }

  useEffect(() => {
    if (focus) {
      if (inputRef.current) {
        inputRef.current.focus()
        inputRef.current.resizableTextArea.textArea.setSelectionRange(value.length, value.length) // 将光标移动到尾部
      }
    }
  }, [focus])

  return (
    <>
      <Node type={type} onDelete={() => onDeleteNode(index)}>
        <div className={root.nodeText}>
          <NodeSelection show={showSelection} onChange={handleChangeComponent}>
            <Input.TextArea
              ref={inputRef}
              classNames={{
                textarea: classNames(root.textarea, root[type])
              }}
              placeholder={type === 'text' ? '输入文本，或按下“/”选择组件' : type}
              variant="borderless"
              value={value}
              autoSize={{
                minRows: 1,
                maxRows: 1000
              }}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
            />
          </NodeSelection>
        </div>
      </Node>
    </>
  )
}

export default NoteText
