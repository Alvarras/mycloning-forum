"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../services/api"
import LoadingSpinner from "../components/LoadingSpinner"
import toast from "react-hot-toast"

interface Category {
  id: number
  name: string
}

interface Post {
  id: number
  title: string
  content: string
  category_id: number
  author_id: number
}

export default function EditPost() {
  const { postId } = useParams<{ postId: string }>()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, categoriesRes] = await Promise.all([api.get(`/posts/${postId}`), api.get("/categories/")])

        const post = postRes.data
        setTitle(post.title)
        setContent(post.content)
        setCategoryId(post.category_id.toString())
        setCategories(categoriesRes.data)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Failed to load post")
        navigate("/")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [postId, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim() || !categoryId) {
      toast.error("Please fill in all fields")
      return
    }

    setSubmitting(true)

    try {
      await api.put(`/posts/${postId}`, {
        title,
        content,
        category_id: Number.parseInt(categoryId),
      })
      toast.success("Post updated successfully")
      navigate(`/post/${postId}`)
    } catch (error) {
      console.error("Error updating post:", error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>

      <form onSubmit={handleSubmit} className="card">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={submitting}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block mb-1 font-medium">
            Category
          </label>
          <select
            id="category"
            className="input"
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

        <div className="mb-6">
          <label htmlFor="content" className="block mb-1 font-medium">
            Content
          </label>
          <textarea
            id="content"
            className="input min-h-[200px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={submitting}
          ></textarea>
        </div>

        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Updating..." : "Update Post"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(`/post/${postId}`)}
            disabled={submitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
