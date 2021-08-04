// Every componentSlice need the createSlice() method from the reduxjs/toolkit
import { createSlice } from '@reduxjs/toolkit'

// Create an initial state for this component
const initialState = [
  { id: 1, title: 'First Post!', content: 'Hello!' },
  { id: 2, title: 'Second Post!', content: 'More text' },
]

// Create the postsSlice thanks to the createSlice() method
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload)
    },
  },
})

// Exporting Actions inside our reducer...
export const { postAdded } = postsSlice.actions

// Exporting the reducer...
// ! When we export this slice/reducer, we are exporting as well to our Store the state of this slice component
export default postsSlice.reducer
