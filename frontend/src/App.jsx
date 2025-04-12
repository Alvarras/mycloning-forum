"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CategoryPosts from "./pages/CategoryPosts"
import PostDetail from "./pages/PostDetail"
import CreatePost from "./pages/CreatePost"
import Profile from "./pages/Profile"

export default function App() {
  const [page, setPage] = useState("home")
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(null)
  const [categoryId, setCategoryId] = useState(null)
  const [postId, setPostId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [token])

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/users/me/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        // Token is invalid
        logout()
      }
    } catch (error) {
      console.error("Error fetching user:", error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (username, password) => {
    const formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)

    try {
      const response = await fetch("http://localhost:8000/token", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("token", data.access_token)
        setToken(data.access_token)
        return { success: true }
      } else {
        const error = await response.json()
        return { success: false, message: error.detail || "Login failed" }
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "Network error" }
    }
  }

  const register = async (username, email, password) => {
    try {
      const response = await fetch("http://localhost:8000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })

      if (response.ok) {
        return { success: true }
      } else {
        const error = await response.json()
        return { success: false, message: error.detail || "Registration failed" }
      }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, message: "Network error" }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
    setPage("home")
  }

  const navigateTo = (newPage, params = {}) => {
    setPage(newPage)
    if (params.categoryId) setCategoryId(params.categoryId)
    if (params.postId) setPostId(params.postId)
    window.scrollTo(0, 0)
  }

  if (loading) {
    return (
      <div className="container" style={{ textAlign: "center", marginTop: "100px" }}>
        Loading...
      </div>
    )
  }

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home navigateTo={navigateTo} />
      case "login":
        return <Login login={login} navigateTo={navigateTo} />
      case "register":
        return <Register register={register} navigateTo={navigateTo} />
      case "category":
        return <CategoryPosts categoryId={categoryId} navigateTo={navigateTo} isAuthenticated={!!user} />
      case "post":
        return <PostDetail postId={postId} navigateTo={navigateTo} user={user} token={token} />
      case "create-post":
        return <CreatePost navigateTo={navigateTo} token={token} />
      case "profile":
        return <Profile user={user} navigateTo={navigateTo} token={token} />
      default:
        return <Home navigateTo={navigateTo} />
    }
  }

  return (
    <div id="root">
      <Navbar navigateTo={navigateTo} isAuthenticated={!!user} user={user} logout={logout} />
      <div className="main-content container">{renderPage()}</div>
      <Footer />
    </div>
  )
}
