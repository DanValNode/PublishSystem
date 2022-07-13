import { http } from '@/infrastructure/http/http'
import ApiUrls from '@/infrastructure/utils/apiUrls'
import { Profile } from '@/domain/models/Profile'
import { ProfileDTO } from '@/infrastructure/http/dto/ProfileDTO'

export const profileRepository = {
  getProfile: async () => {
    const profiles = await http.get<ProfileDTO[]>(ApiUrls.baseUrl + 'profile')

    return profiles.map((profileDto): Profile => ({
      id: profileDto.id,
      user: profileDto.user,
      name: profileDto.name
    }))
  },
  newProfile: async (profile: Profile) => {
    const response = await http.post<ProfileDTO>(ApiUrls.baseUrl + 'profile', profile)
    return response
  }
}
