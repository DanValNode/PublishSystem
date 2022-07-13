import { http } from '@/infrastructure/http/http'
import { PostDTO } from '@/infrastructure/http/dto/PostDTO'
import { Post } from '../../domain/models/Post'
import ApiUrls from '@/infrastructure/utils/apiUrls'

export const postRepository = {
  getPosts: async () => {
    const posts = await http.get<PostDTO[]>(ApiUrls.baseUrl + 'posts')

    return posts.map((postDto): Post => ({
      id: postDto.id,
      author: postDto.author,
      authorId: postDto.authorId,
      text: postDto.text,
      date: postDto.date
    }))
  },
  newPost: async (post: Post) => {
    const response = await http.post<PostDTO>(ApiUrls.baseUrl + 'posts', post)
    return response
  }
}
