import { createSlice } from '@reduxjs/toolkit'

export interface NavigationState {
  collapsed: boolean // 导航栏是否折叠
}

const initialState: NavigationState = {
  collapsed: false
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed
    },
    setCollapsed: (state, action) => {
      state.collapsed = action.payload
    }
  }
})

export const { toggleCollapsed, setCollapsed } = navigationSlice.actions
export default navigationSlice.reducer
