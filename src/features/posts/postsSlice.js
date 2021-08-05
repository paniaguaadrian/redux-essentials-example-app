// Every componentSlice need the createSlice() method from the reduxjs/toolkit
import { createSlice, nanoid } from '@reduxjs/toolkit'

// Create an initial state for this component
const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post!', content: 'More text' },
]

// Create the postsSlice thanks to the createSlice() method
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Seems like (state, action) is something present everytime
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
          },
        }
      },
    },

    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)

      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
})

// Exporting Actions inside our reducer...
export const { postAdded, postUpdated } = postsSlice.actions

// Exporting the reducer...
// ! When we export this slice/reducer, we are exporting as well to our Store the state of this slice component
export default postsSlice.reducer
