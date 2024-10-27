import { memo } from 'react'
import { CustomLink } from '../Link'
import { usePostDetail } from './usePostDetail'
import './style.scss'

export const PostDetail: React.FC = memo(() => {
  const { post, author, status, error, fromPage } = usePostDetail()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!post || error) {
    return <div>Post not found. {error}</div>
  }

  return (
    <div className="post-detail">
      <CustomLink
        to={`/?page=${fromPage}`}
        iconType="back"
        iconPosition="left"
      >
          Back to Posts
      </CustomLink>
      <img
        src={`https://picsum.photos/1500/1500.jpg?random=${post.id}`}
        alt={post.title}
        className="post-detail__image"
        loading="lazy"
      />
      <h1 className="post-detail__title">{post.title}</h1>
      <p className="post-detail__author">By {author ? author.name : 'Unknown Author'}</p>
      <p className="post-detail__text">{post.body}</p>
    </div>
  )
})

