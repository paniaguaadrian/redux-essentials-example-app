// React Components
import React from 'react'
import { Link } from 'react-router-dom'
// Redux Components
import { useSelector } from 'react-redux'

// Custom Components
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'

export const PostsList = () => {
  const posts = useSelector((state) => state.posts)

  const renderedPosts = posts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <p>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ))

  return (
    <section className="post-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
