import { createFileRoute, Link } from '@tanstack/react-router'
import { api } from '../../lib/api'

export const Route = createFileRoute('/articles/$id')({
  component: ArticleView,
  loader: ({ params }) => api.get(params.id),
})

function ArticleView() {
  const article = Route.useLoaderData()
  return (
    <article className="bg-white border rounded p-6 space-y-4">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">{article.title}</h1>
        <p className="text-sm text-gray-500">
          {article.status === 'published' && article.publishedAt
            ? `Published ${new Date(article.publishedAt).toLocaleString()}`
            : 'Draft'}
        </p>
      </header>
      <div className="prose">
        {article.content.split('\n\n').map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <footer className="pt-4 border-t flex items-center gap-3">
        <Link
          to="/articles/$id/edit"
          params={{ id: article.id }}
          className="text-sm bg-gray-100 px-3 py-1 rounded"
        >
          Edit
        </Link>
        <Link to="/" className="text-sm text-gray-600">← Back</Link>
      </footer>
    </article>
  )
}
