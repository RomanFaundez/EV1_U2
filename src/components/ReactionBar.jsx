import { useState } from 'react'
import { REACTIONS } from '../constants/reactions'
import { addReaction } from '../services/postsService'
import { getSession } from '../services/api'

export default function ReactionBar({ postId, counts, onCountsChange }) {
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  const handleReact = async (type) => {
    const { user } = getSession() // si no hay sesión, user es null
    setSending(true)
    setMessage('')

    try {
      const { counts: newCounts } = await addReaction(postId, type, user?.id)
      onCountsChange(newCounts) // refresca contadores con la respuesta 201
    } catch (err) {
      if (err.status === 409) {
        setMessage('Ya reaccionaste a esta publicación con ese tipo.')
      } else {
        setMessage(`Error: ${err.message}`)
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">
        {REACTIONS.map(({ type, emoji, label }) => (
          <button
            key={type}
            type="button"
            title={label}
            disabled={sending}
            onClick={() => handleReact(type)}
            className="flex items-center gap-1 rounded-full border border-neutral-200 px-3 py-1 text-sm transition hover:bg-neutral-100 disabled:opacity-50"
          >
            <span>{emoji}</span>
            <span className="font-medium">{counts?.[type] ?? 0}</span>
          </button>
        ))}
      </div>
      {message && <p className="mt-2 text-sm text-amber-600">{message}</p>}
    </div>
  )
}