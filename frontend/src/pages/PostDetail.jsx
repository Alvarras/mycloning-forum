"use client"

import { useState, useEffect } from "react"

export default function PostDetail({ postId, navigateTo, user, token }) {
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
          fetch(`http://localhost:8000/posts/${postId}`),
          fetch(`http://localhost:8000/posts/${postId}/comments/`),
        ])

        if (!postRes.ok) {
          throw new Error("Post not found")
        }

        const postData = await postRes.json()
        const commentsData = await commentsRes.json()

        setPost(postData)
        setComments(commentsData)
      } catch (error) {
        console.error("Error fetching data:", error)
        alert("Failed to load post")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [postId])

  const handleSubmitComment = async (e) => {
    e.preventDefault()

    if (!newComment.trim()) {
      alert("Comment cannot be empty")
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch(`http://localhost:8000/posts/${postId}/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: newComment,
        }),
      })

      if (response.ok) {
        const commentData = await response.json()
        setComments([...comments, commentData])
        setNewComment("")
        alert("Comment added successfully")
      } else {
        throw new Error("Failed to add comment")
      }
    } catch (error) {
      console.error("Error adding comment:", error)
      alert("Failed to add comment")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return
    }

    try {
      const response = await fetch(`http://localhost:8000/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        alert("Post deleted successfully")
        navigateTo("home")
      } else {
        throw new Error("Failed to delete post")
      }
    } catch (error) {
      console.error("Error deleting post:", error)
      alert("Failed to delete post")
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!post) {
    return <div>Post not found</div>
  }

  const isAuthor = user && user.id === post.author_id

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            navigateTo("category", { categoryId: post.category.id })
          }}
          style={{ marginBottom: "8px", display: "inline-block" }}
        >
          &larr; Back to {post.category.name}
        </a>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>{post.title}</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            color: "#6c757d",
            marginBottom: "16px",
          }}
        >
          <span>By {post.author.username}</span>
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>

        {isAuthor && (
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            <button className="btn-secondary" onClick={() => alert("Edit functionality would go here")}>
              Edit
            </button>
            <button className="btn-danger" onClick={handleDeletePost}>
              Delete
            </button>
          </div>
        )}

        <div className="card" style={{ marginBottom: "32px" }}>
          <p style={{ whiteSpace: "pre-line" }}>{post.content}</p>
        </div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>Comments ({comments.length})</h2>
        <div className="card">
          {comments.length > 0 ? (
            <div>
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  style={{ borderBottom: "1px solid #dee2e6", padding: "16px 0", marginBottom: "16px" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontWeight: "500" }}>{comment.author.username}</span>
                    <span style={{ fontSize: "14px", color: "#6c757d" }}>
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#6c757d", padding: "16px 0" }}>No comments yet.</p>
          )}
        </div>
      </div>

      {user ? (
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>Add a Comment</h3>
          <form onSubmit={handleSubmitComment} className="card">
            <textarea
              style={{ minHeight: "100px", marginBottom: "16px" }}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
              disabled={submitting}
            ></textarea>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          </form>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <p style={{ marginBottom: "8px" }}>You need to be logged in to comment.</p>
          <button className="btn-primary" onClick={() => navigateTo("login")}>
            Login to Comment
          </button>
        </div>
      )}
    </div>
  )
}
