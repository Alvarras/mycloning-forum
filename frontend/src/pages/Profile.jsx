"use client"

import { useState, useEffect } from "react"

export default function Profile({ user, navigateTo, token }) {
  const [userPosts, setUserPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        // This is a workaround since the API doesn't have a dedicated endpoint for user posts
        const response = await fetch("http://localhost:8000/posts/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await response.json()
        // Filter posts by the current user
        const filteredPosts = data.filter((post) => post.author.username === user.username)
        setUserPosts(filteredPosts)
      } catch (error) {
        console.error("Error fetching user posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserPosts()
  }, [user, token])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Your Profile</h1>
        <div className="card">
          <div>
            <p style={{ fontSize: "18px", fontWeight: "500", marginBottom: "8px" }}>Username: {user.username}</p>
            <p style={{ marginBottom: "8px" }}>Email: {user.email}</p>
            <p style={{ fontSize: "14px", color: "#6c757d" }}>
              Member since: {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Your Posts</h2>
          <button className="btn-primary" onClick={() => navigateTo("create-post")}>
            Create New Post
          </button>
        </div>

        {userPosts.length > 0 ? (
          <div>
            {userPosts.map((post) => (
              <div
                key={post.id}
                className="card"
                onClick={() => navigateTo("post", { postId: post.id })}
                style={{ cursor: "pointer" }}
              >
                <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>{post.title}</h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    color: "#6c757d",
                    marginBottom: "8px",
                  }}
                >
                  <span>Category: {post.category.name}</span>
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                <p>{post.content.substring(0, 150)}...</p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <p style={{ marginBottom: "16px" }}>You haven't created any posts yet.</p>
            <button className="btn-primary" onClick={() => navigateTo("create-post")}>
              Create your first post
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
