import { apiRequest } from './api';

export async function getPosts() {
  const data = await apiRequest('/posts');
  return data.posts;
}

export async function createPost({ title, content }, token) {
  const data = await apiRequest('/posts', {
    method: 'POST',
    body: { title, content },
    token,
  });
  return data.post;
}

// Si userId es undefined, JSON.stringify lo omite y la reacción queda anónima
export function addReaction(postId, type, userId) {
  return apiRequest(`/posts/${postId}/reactions`, {
    method: 'POST',
    body: userId ? { type, userId } : { type },
  });
  // Devuelve { reaction, counts }
}