import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Post, User } from '../types'
import * as api from '../api/axios'

type PostState = {
  post: Post | null,
  author: User | null,
  status: 'idle' | 'loading'| 'succeeded' | 'failed',
  error: string | undefined
}

const initialState: PostState = {
  post: null,
  author: null,
  status: 'idle',
  error: undefined
}

export const fetchPost = createAsyncThunk<{post: Post, author: User}, number>('post/fetchPost', async (postId) => {
  const postResponse = await api.getPost(postId)
  const userResponse = await api.getUser(postResponse.userId)
  return { post: postResponse, author: userResponse }
})

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers:{},
  extraReducers (builder) {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.post = action.payload.post
        state.author = action.payload.author
      })
      .addCase(fetchPost.rejected, (state, action) => {
        console.log(action)
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default postSlice.reducer