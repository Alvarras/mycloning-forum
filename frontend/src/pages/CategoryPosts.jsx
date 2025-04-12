"use client"

import { useState, useEffect } from "react"

export default function CategoryPosts({ categoryId, navigateTo, isAuthenticated }) {
  const [category, setCategory] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, postsRes] = await Promise.all([
          fetch("http://localhost:8000/categories/"),
          fetch(`http://localhost:8000/categories/${categoryId}/posts/`),
        ])

        const categoriesData = await categoriesRes.json()
        const postsData = await postsRes.json()

        const foundCategory = categoriesData.find((cat) => cat.id === Number.parseInt(categoryId))
        setCategory(foundCategory || null)
        setPosts(postsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [categoryId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!category) {
    return <div>Category not found</div>
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>{category.name}</h1>
          <p>{category.description}</p>
        </div>

        {isAuthenticated && (
          <button className="btn-primary" onClick={() => navigateTo("create-post")}>
            Create Post
          </button>
        )}
      </div>

      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
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
                <span>By {post.author.username}</span>
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
              <p>{post.content.substring(0, 150)}...</p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <p style={{ marginBottom: "16px" }}>No posts in this category yet.</p>
          {isAuthenticated && (
            <button className="btn-primary" onClick={() => navigateTo("create-post")}>
              Create the first post
            </button>
          )}
        </div>
      )}
    </div>
  )
}
