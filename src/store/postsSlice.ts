import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import * as api from '../api/axios'
import { Post } from '../types'

export type PostsState = {
  posts: Post[],
  currentPage: number,
  status: 'idle'| 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}

const initialState: PostsState = {
  posts: [],
  currentPage: 1,
  status: 'idle',
  error: undefined
}

export const fetchPosts = createAsyncThunk<
  { data: Post[]; page: number },
  number
>('posts/fetchPosts', async (page = 1) => {
  return await api.getPosts(page)
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state)=> {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<{ data: Post[], page: number }>)=> {
        state.status = 'succeeded'
        state.posts = action.payload.data
        state.currentPage = action.payload.page
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default postsSlice.reducer