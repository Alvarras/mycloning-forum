"use client"

import { useState, useEffect } from "react"

export default function Home({ navigateTo }) {
  const [categories, setCategories] = useState([])
  const [recentPosts, setRecentPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, postsRes] = await Promise.all([
          fetch("http://localhost:8000/categories/"),
          fetch("http://localhost:8000/posts/?limit=5"),
        ])

        const categoriesData = await categoriesRes.json()
        const postsData = await postsRes.json()

        setCategories(categoriesData)
        setRecentPosts(postsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <section className="mb-4">
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Welcome to the Forum</h1>
        <p style={{ marginBottom: "16px" }}>
          Join discussions, share your thoughts, and connect with others in our community.
        </p>
      </section>

      <section className="mb-4">
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>Categories</h2>
        <div className="grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className="card"
              onClick={() => navigateTo("category", { categoryId: category.id })}
              style={{ cursor: "pointer" }}
            >
              <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>{category.name}</h3>
              <p>{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>Recent Posts</h2>
        {recentPosts.length > 0 ? (
          <div>
            {recentPosts.map((post) => (
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
                  <span>Category: {post.category.name}</span>
                </div>
                <p style={{ marginBottom: "8px" }}>{post.content.substring(0, 150)}...</p>
                <div style={{ fontSize: "14px", color: "#6c757d" }}>
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts yet.</p>
        )}
      </section>
    </div>
  )
}
