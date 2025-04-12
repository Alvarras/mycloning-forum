"use client"

import { useState } from "react"

export default function Login({ login, navigateTo }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username || !password) {
      setError("Please fill in all fields")
      return
    }

    setLoading(true)
    setError("")

    const result = await login(username, password)

    if (result.success) {
      navigateTo("home")
    } else {
      setError(result.message)
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Login to Your Account</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <p>
            Don't have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                navigateTo("register")
              }}
            >
              Register here
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}
