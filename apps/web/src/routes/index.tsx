import { createFileRoute, Link } from '@tanstack/react-router'
import { api, type Article } from '../lib/api'

export const Route = createFileRoute('/')({
  component: ArticleList,
  loader: () => api.list(),
})

function ArticleList() {
  const articles = Route.useLoaderData()
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Articles</h1>
      {articles.length === 0 && <p className="text-gray-500">No articles yet.</p>}
      <ul className="space-y-3">
        {articles.map((a) => (
          <li key={a.id} className="bg-white border rounded p-4">
            <div className="flex items-start justify-between">
              <Link to="/articles/$id" params={{ id: a.id }} className="font-medium hover:underline">
                {a.title}
              </Link>
              <StatusBadge status={a.status} />
            </div>
            <p className="text-sm text-gray-600 mt-1">{a.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function StatusBadge({ status }: { status: Article['status'] }) {
  const cls =
    status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
  return <span className={`text-xs px-2 py-0.5 rounded ${cls}`}>{status}</span>
}
