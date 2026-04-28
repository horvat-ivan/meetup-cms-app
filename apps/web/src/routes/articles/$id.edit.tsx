import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { api } from '../../lib/api'

export const Route = createFileRoute('/articles/$id/edit')({
  component: EditArticle,
  loader: ({ params }) => api.get(params.id),
})

function EditArticle() {
  const initial = Route.useLoaderData()
  const navigate = useNavigate()
  const [title, setTitle] = useState(initial.title)
  const [excerpt, setExcerpt] = useState(initial.excerpt)
  const [content, setContent] = useState(initial.content)
  const [status, setStatus] = useState(initial.status)
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.update(initial.id, { title, excerpt, content, status })
      void navigate({ to: '/articles/$id', params: { id: initial.id } })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-white border rounded p-6">
      <h1 className="text-2xl font-semibold">Edit article</h1>
      <label className="block">
        <span className="text-sm font-medium">Title</span>
        <input
          className="mt-1 block w-full border rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Excerpt</span>
        <input
          className="mt-1 block w-full border rounded px-3 py-2"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Content</span>
        <textarea
          className="mt-1 block w-full border rounded px-3 py-2 font-mono text-sm"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Status</span>
        <select
          className="mt-1 block w-full border rounded px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
        >
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
      </label>
      <button
        type="submit"
        disabled={submitting}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {submitting ? 'Saving…' : 'Save'}
      </button>
    </form>
  )
}
