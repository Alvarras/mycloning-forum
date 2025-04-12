import { formatDistanceToNow } from "date-fns"

interface Comment {
  id: number
  content: string
  created_at: string
  author: {
    username: string
  }
}

interface CommentItemProps {
  comment: Comment
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4 last:border-0">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{comment.author.username}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
        </span>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
    </div>
  )
}
