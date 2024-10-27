import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as api from '../api/axios'
import { User } from '../types'

export type UsersState = {
  users: User[],
  status: 'idle'| 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: undefined
}

export const fetchUsers = createAsyncThunk<User[]>('users/fetchUsers', async () => {
  return await api.getUsers()
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers:{},
  extraReducers (builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default usersSlice.reducer