import { reactionRepository } from '@/infrastructure/repositories/reaction.repository'
import { Reaction } from '@/domain/models/Reaction'

export const reactionService = {
  getReactions: () => {
    return reactionRepository.getReactions()
  },
  newReaction: (reaction: Reaction) => {
    return reactionRepository.newReaction(reaction)
  }
}
