import { memo } from 'react'
import { CustomLink } from '../Link'
import './style.scss'

type PostCardProps = {
    id: number;
    title: string;
    author: string;
    currentPage: number;
}

export const PostCard = memo(({ id, title, author, currentPage }: PostCardProps) => {
  return (
    <article className="post-list__card">
      <img
        src={`https://picsum.photos/1500/1500.jpg?random=${id}`}
        alt={title}
        className="post-list__image"
      />
      <div className="post-list__content">
        <div>
          <h2>{title}</h2>
          <p className="author">By {author}</p>
        </div>
        <CustomLink
          className="link"
          to={`/post/${id}`}
          state={{ fromPage: currentPage }}
          iconType="forward"
        >
                    Read More
        </CustomLink>
      </div>
    </article>)
})