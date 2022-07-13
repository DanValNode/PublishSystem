import { profileRepository } from '@/infrastructure/repositories/profile.repository'
import { Profile } from '@/domain/models/Profile'

export const profileService = {
  getProfiles: () => {
    return profileRepository.getProfile()
  },
  newProfile: (profile: Profile) => {
    return profileRepository.newProfile(profile)
  }
}
