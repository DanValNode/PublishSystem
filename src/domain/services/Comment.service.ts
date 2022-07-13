import { commentRepository } from '@/infrastructure/repositories/comment.repository'
import { Comment } from '@/domain/models/Comment'

export const commentService = {
  getComments: () => {
    return commentRepository.getComments()
  },
  newComment: (comment: Comment) => {
    return commentRepository.newComment(comment)
  }
}
