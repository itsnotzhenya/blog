import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { fetchPosts } from '../../store/postsSlice'
import { fetchUsers } from '../../store/usersSlice'
import { Post } from '../../types'

export const usePostList = (): {
    posts: Post[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    currentPage: number;
    error: string | undefined;
    getAuthorName: (userId: number) => string;
    handlePageChange: (page: number) => void;
  } => {
  const dispatch = useAppDispatch()
  const [ searchParams, setSearchParams ] = useSearchParams()
  const { posts, currentPage, status, error } = useAppSelector((state) => state.posts)
  const { users } = useAppSelector((state) => state.users)

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page') || '1')
    dispatch(fetchPosts(pageFromUrl))
    dispatch(fetchUsers())
  }, [ dispatch, searchParams ])

  const getAuthorName = (userId: number): string => {
    const user = users.find((user) => user.id === userId)
    return user ? user.name : 'Unknown Author'
  }

  const handlePageChange = (page: number): void => {
    setSearchParams({ page: page.toString() })
    window.scrollTo(0, 0)
  }

  return { posts, status, currentPage, error, getAuthorName, handlePageChange }
}