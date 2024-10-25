import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../store/store'
import { Post } from '../../types'
import * as api from '../../api/axios'
import { CustomLink } from '../Link'
import './style.scss'

interface LocationState {
  fromPage?: number
}

export const PostDetail: React.FC = () => {
  const location = useLocation()
  const { fromPage = 1 } = (location.state as LocationState) || {}
  const { id } = useParams<{ id: string }>()
  const [ post, setPost ] = useState<Post | null>(null)
  const [ loading, setLoading ] = useState(true)
  const users = useAppSelector((state) => state.posts.users)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (id) {
          const data = await api.getPost(parseInt(id))
          setPost(data)
        }
      } catch (error) {
        console.error('Failed to fetch post:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [ id ])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!post) {
    return <div>Post not found</div>
  }

  const author = users.find((user) => user.id === post.userId)

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
      />
      <h1 className="post-detail__title">{post.title}</h1>
      <p className="post-detail__author">By {author ? author.name : 'Unknown Author'}</p>
      <p className="post-detail__text">{post.body}</p>
    </div>
  )
}

