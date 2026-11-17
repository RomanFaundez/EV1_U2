import { useEffect, useState } from 'react'
import { getPosts } from '../services/postsService'
import PostCard from '../components/PostCard'

export default function PostsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  // Actualiza los contadores de un post cuando alguien reacciona (se usa en el Paso 7)
  const updateReactions = (postId, newCounts) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, reactions: newCounts } : p))
    )
  }

  if (loading) return <p className="text-center text-neutral-500">Cargando publicaciones...</p>
  if (error) return <p className="text-center text-red-600">{error}</p>
  if (posts.length === 0) return <p className="text-center text-neutral-500">Aún no hay publicaciones.</p>

  return (
    <section>
      <h1 className="mb-6 text-2xl font-bold">Publicaciones</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onReactionsChange={updateReactions} />
        ))}
      </div>
    </section>
  )
}