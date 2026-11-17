import ReactionBar from './ReactionBar'

export default function PostCard({ post, onReactionsChange }) {
  const fecha = new Date(post.createdAt).toLocaleString('es-CL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <article className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-neutral-900">{post.title}</h2>
      <p className="mt-1 text-sm text-neutral-500">
        {post.author?.name ?? 'Anónimo'} · {fecha}
      </p>
      <p className="mt-3 flex-1 whitespace-pre-line text-neutral-700">{post.content}</p>

      <ReactionBar
        postId={post.id}
        counts={post.reactions}
        onCountsChange={(newCounts) => onReactionsChange(post.id, newCounts)}
      />
    </article>
  )
}