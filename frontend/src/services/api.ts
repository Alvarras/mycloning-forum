import axios from "axios"
import toast from "react-hot-toast"

const api = axios.create({
  baseURL: "http://localhost:8000",
})

// Add token to requests if it exists
const token = localStorage.getItem("token")
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

// Intercept response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || "An error occurred"

    // Don't show toast for auth errors (handled in components)
    if (!error.response?.config.url.includes("/token")) {
      toast.error(message)
    }

    return Promise.reject(error)
  },
)

export default api
