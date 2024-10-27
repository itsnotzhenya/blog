import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { fetchPosts, fetchUsers } from '../../store/postsSlice'
import { Post } from '../../types'

export const usePostList = (): {
    posts: Post[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    currentPage: number;
    getAuthorName: (userId: number) => string;
    handlePageChange: (page: number) => void;
  } => {
  const dispatch = useAppDispatch()
  const [ searchParams, setSearchParams ] = useSearchParams()
  const { posts, users, currentPage, status } = useAppSelector((state) => state.posts)

  useEffect(() => {
    dispatch(fetchUsers())

    const pageFromUrl = parseInt(searchParams.get('page') || '1')
    dispatch(fetchPosts(pageFromUrl))
  }, [ dispatch, searchParams ])

  const getAuthorName = (userId: number): string => {
    const user = users.find((user) => user.id === userId)
    return user ? user.name : 'Unknown Author'
  }

  const handlePageChange = (page: number): void => {
    setSearchParams({ page: page.toString() })
    window.scrollTo(0, 0)
  }

  return { posts, status, currentPage, getAuthorName, handlePageChange }
}