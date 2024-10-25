import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { fetchPosts, fetchUsers } from '../../store/postsSlice'
import { PostCard } from '../PostCard'
import './style.scss'

export const PostList: React.FC = () => {
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
    // dispatch(fetchPosts(page));
    setSearchParams({ page: page.toString() })
    window.scrollTo(0, 0)
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error loading posts</div>
  }

  return(
    <div>
      <h1>Blog articles</h1>
      <section className="post-list">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            author={getAuthorName(post.userId)}
            currentPage={currentPage}
          />
        ))}
      </section>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
                    Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
        >
                    Next
        </button>
      </div>
    </div>
  )
}