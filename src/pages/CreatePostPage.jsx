import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../services/postsService'
import { getSession } from '../services/api'

export default function CreatePostPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', content: '' })
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { token } = getSession()
    if (!token) {
      setError('Debes iniciar sesión para publicar.')
      return
    }
    setSending(true)
    setError('')
    try {
      await createPost(form, token) // 201 Created
      navigate('/posts')
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-lg flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Nueva publicación</h1>
      <input
        name="title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Título"
        required
        className="rounded-lg border border-neutral-200 p-2"
      />
      <textarea
        name="content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        placeholder="Contenido"
        rows={5}
        required
        className="rounded-lg border border-neutral-200 p-2"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={sending}
        className="rounded-lg bg-violet-600 p-2 font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
      >
        {sending ? 'Publicando...' : 'Publicar'}
      </button>
    </form>
  )
}