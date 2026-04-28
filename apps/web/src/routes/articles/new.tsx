import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { api } from '../../lib/api'

export const Route = createFileRoute('/articles/new')({
  component: NewArticle,
})

function NewArticle() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const created = await api.create({ title, slug, excerpt, content, status })
      void navigate({ to: '/articles/$id', params: { id: created.id } })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-white border rounded p-6">
      <h1 className="text-2xl font-semibold">New article</h1>
      <Field label="Title" value={title} onChange={setTitle} required />
      <Field label="Slug" value={slug} onChange={setSlug} required />
      <Field label="Excerpt" value={excerpt} onChange={setExcerpt} />
      <Textarea label="Content" value={content} onChange={setContent} rows={8} />
      <Select
        label="Status"
        value={status}
        onChange={(v) => setStatus(v as 'draft' | 'published')}
        options={['draft', 'published']}
      />
      <button
        type="submit"
        disabled={submitting}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {submitting ? 'Creating…' : 'Create'}
      </button>
    </form>
  )
}

function Field({
  label,
  value,
  onChange,
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        className="mt-1 block w-full border rounded px-3 py-2"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </label>
  )
}

function Textarea({
  label,
  value,
  onChange,
  rows,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <textarea
        className="mt-1 block w-full border rounded px-3 py-2 font-mono text-sm"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <select
        className="mt-1 block w-full border rounded px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}
