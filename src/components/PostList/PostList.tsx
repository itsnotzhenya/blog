import { memo } from 'react'
import { PostCard } from '../PostCard'
import { usePostList } from './usePostList'
import './style.scss'

export const PostList: React.FC = memo(() => {
  const { posts, status, currentPage, error, getAuthorName, handlePageChange } = usePostList()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error loading posts. {error && error}</div>
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
          <span>Previous</span>
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <span>Next</span>
        </button>
      </div>
    </div>
  )
})