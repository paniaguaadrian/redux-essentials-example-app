// Every componentSlice need the createSlice() method from the reduxjs/toolkit
import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'

// API
import { client } from '../../api/client'

// * import { sub } from 'date-fns'

// Create an initial state for this component
const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

// Fetch Data from AJAX API
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.posts // result: {posts: []}
})

// Send a new post yo our backend server
export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  // The payload creator receives the partial `{title, content, user}` object
  async (initialPost) => {
    // We send the initial data to the fake API server
    const response = await client.post('/fakeApi/posts', { post: initialPost })
    // The response includes the complete post object, including unique ID
    return response.post
  }
)

// Create the postsSlice thanks to the createSlice() method
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Seems like (state, action) is something present everytime
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        }
      },
    },

    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },

    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find((post) => post.id === id)

      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.posts = state.posts.concat(action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewPost.fulfilled]: (state, action) => {
      // We can directly add the new post object to our posts array
      state.posts.push(action.payload)
    },
  },
})

// Exporting Actions inside our reducer...
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

// Exporting the reducer...
// ! When we export this slice/reducer, we are exporting as well to our Store the state of this slice component
export default postsSlice.reducer

// Extracting Reusable Posts Selectors
export const selectAllPosts = (state) => state.posts.posts
export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId)
