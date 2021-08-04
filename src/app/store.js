import { configureStore } from '@reduxjs/toolkit'

// Importing Reducers...
// ! This also includes the state of the posts 👀
import postsReducer from '../features/posts/postsSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
  },
})
