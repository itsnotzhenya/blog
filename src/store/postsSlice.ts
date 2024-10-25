import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api/axios'
import { User, Post } from '../types'

export const fetchPosts = createAsyncThunk<
  { data: Post[]; page: number },
  number
>('posts/fetchPosts', async (page = 1) => {
  return await api.getPosts(page)
})

export const fetchUsers = createAsyncThunk(
  'posts/fetchUsers',
  async () => {
    return await api.getUsers()
  }
)

export type PostsState = {
    posts: Post[],
    users: User[],
    currentPage: number,
    status: 'idle'| 'loading' | 'succeeded' | 'failed'
    error: string | undefined
}

const initialState: PostsState = {
  posts: [],
  users: [],
  currentPage: 1,
  status: 'idle',
  error: undefined
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state)=> {
      state.status = 'loading'
    })
      .addCase(fetchPosts.fulfilled, (state, action)=> {
        state.status = 'succeeded'
        state.posts = action.payload.data
        state.currentPage = action.payload.page
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })
  }
})

export default postsSlice.reducer