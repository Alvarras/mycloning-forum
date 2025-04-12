import { Link } from "react-router-dom"

interface Category {
  id: number
  name: string
  description: string
}

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link to={`/category/${category.id}`} className="block">
      <div className="card hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-bold mb-2">{category.name}</h3>
        <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
      </div>
    </Link>
  )
}
