import { Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"

interface Post {
  id: number
  title: string
  content: string
  created_at: string
  author: {
    username: string
  }
  category: {
    name: string
  }
}

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link to={`/post/${post.id}`} className="block">
      <div className="card hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span>By {post.author.username}</span>
          <span>Category: {post.category.name}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-2">{post.content}</p>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
        </div>
      </div>
    </Link>
  )
}
