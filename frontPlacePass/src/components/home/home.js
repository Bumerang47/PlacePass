
import ComponentBase from '@/components/base/base.vue'

export default {
  components: {
    ComponentBase
  },
  computed: {
      isAuthenticated () {
          return this.$store.getters.isAuthenticated
      }
  }
}
