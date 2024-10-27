import { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Post, User } from '../../types'
import { fetchPost } from '../../store/postSlice'

interface LocationState {
  fromPage?: number
}

export const usePostDetail = (): {
  post: Post | null;
  author: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | undefined,
  fromPage: number;
} => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const { fromPage = 1 } = (location.state as LocationState) || {}
  const { id } = useParams<{ id: string }>()
  const { post, author, status, error } = useAppSelector((state) => state.post)

  useEffect(() => {
    if (id) {
      dispatch(fetchPost(parseInt(id)))
    }
  }, [ dispatch, id ])

  return {
    post, author, status, error, fromPage
  }
}