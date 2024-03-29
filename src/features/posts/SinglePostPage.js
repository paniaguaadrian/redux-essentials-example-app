import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'

// Custom Components
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  const post = useSelector((state) => selectPostById(state, postId))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <p>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
        <Link to={`/editpost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}
