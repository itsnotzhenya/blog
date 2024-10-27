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
    <article className="post-card">
      <img
        src={`https://picsum.photos/1500/1500.jpg?random=${id}`}
        alt={title}
        className="post-card__image"
        loading="lazy"
      />
      <div className="post-card__content">
        <div>
          <h2 className="post-card__title">{title}</h2>
          <p className="post-card__author">By {author}</p>
        </div>
        <CustomLink
          className="post-card__link"
          to={`/post/${id}`}
          state={{ fromPage: currentPage }}
          iconType="forward"
        >
          Read More
        </CustomLink>
      </div>
    </article>
  )
})