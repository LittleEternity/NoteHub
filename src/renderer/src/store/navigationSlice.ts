import { createSlice } from '@reduxjs/toolkit'

export interface NavigationState {
  collapsed: boolean
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
