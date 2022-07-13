import { postRepository } from '@/infrastructure/repositories/post.repository'
import { Post } from '@/domain/models/Post'

export const postService = {
  getPosts: () => {
    return postRepository.getPosts()
  },
  newPost: (post: Post) => {
    return postRepository.newPost(post)
  }
}
