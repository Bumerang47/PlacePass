import * as types from '@/store/mutation-types'

export default {
  methods: {
    logout () {
      this.$store.dispatch(types.AUTH_LOGOUT)
        .then(() => this.$router.push('/login'))
        .catch(err => console.error(err))
    }
  },
  computed: {
    displayName () {
      if (this.$store.getters.user) {
        return this.$store.getters.user.full_name
      }
      return ''
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  }
}
