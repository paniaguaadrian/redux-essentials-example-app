// React Components
import React from 'react'
import { Link } from 'react-router-dom'
// Redux Components
import { useSelector } from 'react-redux'

// Custom Components
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'

export const PostsList = () => {
  const posts = useSelector((state) => state.posts)

  // Sort post in reverse chronological order by datetime string
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <p>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </p>

      <ReactionButtons post={post} />

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
