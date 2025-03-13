import { createSlice } from '@reduxjs/toolkit'

export interface NodeState {
  deleteNodeId: string // 删除节点的id
  moveSourceId: string // 原移动节点的id
  moveTargetId: string // 移动到目标节点的id
  isMoveNode: boolean // 是否移动节点
}

const initialState: NodeState = {
  deleteNodeId: '',
  moveSourceId: '',
  moveTargetId: '',
  isMoveNode: false
}

export const nodeSlice = createSlice({
  name: 'node',
  initialState,
  reducers: {
    setMoveSource: (state, action) => {
      state.moveSourceId = action.payload
    },
    setMoveTarget: (state, action) => {
      state.moveTargetId = action.payload
    },
    setDeleteNode: (state, action) => {
      state.deleteNodeId = action.payload
    },
    setIsMoveNode: (state, action) => {
      state.isMoveNode = action.payload
    },
    setMoveFinish: (state) => {
      state.moveSourceId = ''
      state.moveTargetId = ''
      state.isMoveNode = false
    }
  }
})

export const { setMoveSource, setMoveTarget, setDeleteNode, setIsMoveNode, setMoveFinish } =
  nodeSlice.actions
export default nodeSlice.reducer
