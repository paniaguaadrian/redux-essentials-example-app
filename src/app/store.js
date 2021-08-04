import { configureStore } from '@reduxjs/toolkit'

// Importing Reducers...
// ! This also includes the state of the posts 👀
import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
})
