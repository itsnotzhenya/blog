import axios from 'axios'
import { Post, User } from '../types'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

export const getPosts = async (page: number) => {
  const response = await api.get<Post[]>(`/posts`, {
    params: {
      _limit: 10,
      _page: page
    }
  })
  return {
    data: response.data,
    page
  }
}

export const getPost = async (id: number) => {
  const response = await api.get<Post>(`/posts/${id}`)
  return response.data
}

export const getUsers = async () => {
  const response = await api.get<User[]>('/users')
  return response.data
}