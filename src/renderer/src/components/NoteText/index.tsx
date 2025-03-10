import NoteNode from '../NoteNode'
import root from './index.module.scss'
import { Input } from 'antd'

interface NoteTextProps {
  index: number
  value: string
  onChange: (index: number, value: string) => void
  onPressEnter: (index: number) => void
  onDeleteNode: (index: number) => void
}

function NoteText({
  index,
  value,
  onChange,
  onPressEnter,
  onDeleteNode
}: NoteTextProps): JSX.Element {
  return (
    <>
      <NoteNode onDelete={() => onDeleteNode(index)}>
        <Input.TextArea
          classNames={{
            textarea: root.textarea
          }}
          placeholder=""
          variant="borderless"
          value={value}
          autoSize={{
            minRows: 1,
            maxRows: 1000
          }}
          onChange={(e) => {
            onChange(index, e.target.value)
          }}
          onPressEnter={() => {
            onPressEnter(index)
          }}
        />
      </NoteNode>
    </>
  )
}

export default NoteText
