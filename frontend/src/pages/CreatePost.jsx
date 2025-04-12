"use client"

import { useState, useEffect } from "react"

export default function CreatePost({ navigateTo, token }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/categories/")
        const data = await response.json()
        setCategories(data)
        if (data.length > 0) {
          setCategoryId(data[0].id.toString())
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
        setError("Failed to load categories")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim() || !categoryId) {
      setError("Please fill in all fields")
      return
    }

    setSubmitting(true)
    setError("")

    try {
      const response = await fetch("http://localhost:8000/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          category_id: Number.parseInt(categoryId),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        alert("Post created successfully")
        navigateTo("post", { postId: data.id })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Failed to create post")
      }
    } catch (error) {
      console.error("Error creating post:", error)
      setError(error.message || "Failed to create post")
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Create a New Post</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={submitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={submitting}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            style={{ minHeight: "200px" }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={submitting}
          ></textarea>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? "Creating..." : "Create Post"}
          </button>
          <button type="button" className="btn-secondary" onClick={() => navigateTo("home")} disabled={submitting}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
