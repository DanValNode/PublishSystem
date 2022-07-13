import { http } from '@/infrastructure/http/http'
import { CommentDTO } from '@/infrastructure/http/dto/CommentDTO'
import { Comment } from '@/domain/models/Comment'
import ApiUrls from '@/infrastructure/utils/apiUrls'

export const commentRepository = {
  getComments: async () => {
    const comments = await http.get<CommentDTO[]>(ApiUrls.baseUrl + 'comments')

    return comments.map((commentDto): Comment => ({
      id: commentDto.id,
      author: commentDto.author,
      authorId: commentDto.authorId,
      date: commentDto.date,
      body: commentDto.body,
      postId: commentDto.postId
    }))
  },
  newComment: async (comment: Comment) => {
    const response = await http.post<CommentDTO>(ApiUrls.baseUrl + 'comments', comment)
    return response
  }
}
