import { http } from '@/infrastructure/http/http'
import { ReactionDTO } from '@/infrastructure/http/dto/ReactionDTO'
import { Reaction } from '@/domain/models/Reaction'
import ApiUrls from '@/infrastructure/utils/apiUrls'

export const reactionRepository = {
  getReactions: async () => {
    const reactions = await http.get<ReactionDTO[]>(ApiUrls.baseUrl + 'reactions')

    return reactions.map((reactDto): Reaction => ({
      id: reactDto.id,
      postId: reactDto.postId,
      type: reactDto.type,
      userId: reactDto.userId
    }))
  },
  newReaction: async (reaction: Reaction) => {
    const response = await http.post<ReactionDTO>(ApiUrls.baseUrl + 'reactions', reaction)
    return response
  }
}
