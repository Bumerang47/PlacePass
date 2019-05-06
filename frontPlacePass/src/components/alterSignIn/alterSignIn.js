import { socialCallbackURL, authFacebookKey, authGoogleOAuth2Key } from '@/store/variables'

export default {
  data() {
    return {
      socialCallbackURL: socialCallbackURL,
      authFacebookKey: authFacebookKey,
      authGoogleOAuth2Key: authGoogleOAuth2Key,
    }
  },
}
