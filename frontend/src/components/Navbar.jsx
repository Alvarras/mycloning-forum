"use client"

export default function Navbar({ navigateTo, isAuthenticated, user, logout }) {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              navigateTo("home")
            }}
          >
            <strong>Forum App</strong>
          </a>
        </div>
        <div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              navigateTo("home")
            }}
          >
            Home
          </a>

          {isAuthenticated ? (
            <>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo("create-post")
                }}
              >
                Create Post
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo("profile")
                }}
              >
                Profile
              </a>
              <span style={{ marginLeft: "16px", color: "#adb5bd" }}>Hello, {user?.username}</span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  logout()
                }}
                style={{
                  marginLeft: "16px",
                  backgroundColor: "#dc3545",
                  padding: "4px 8px",
                  borderRadius: "4px",
                }}
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo("login")
                }}
              >
                Login
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo("register")
                }}
                style={{
                  marginLeft: "16px",
                  backgroundColor: "#0d6efd",
                  padding: "4px 8px",
                  borderRadius: "4px",
                }}
              >
                Register
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
