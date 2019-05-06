import ComponentBase from '@/components/base/base.vue'
import ComponentAlterSignIn from '@/components/alterSignIn/alterSignIn.vue'
import * as types from '@/store/mutation-types'
import { socialCallbackURL } from '@/store/variables'

export default {
  components: {
    ComponentBase,
    ComponentAlterSignIn
  },
  created() {
    if (this.$route.query.code && this.$route.query.provider) {
      let code = this.$route.query.code;
      let provider = this.$route.query.provider;
      let redirect = this.fbCallbackURL;
      this.$store.dispatch(types.AUTH_SOCIAL, {code, provider, redirect} )
        .then(() => {
          this.$router.push('/')
        })
        .catch(err => {
          console.error(err.request.response)
        })
    }
  },
  data() {
    return {
      signUp: false, activeField: '',
      email: null, firstName: null, lastName: null,
      password: null, confirmPassword: null, receiveOffers: null,
      socialCallbackURL: socialCallbackURL
    }
  },
  methods: {
    validateBeforeSubmit () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.signIn()
            return;
          }
        })
    },
    signIn (submitEnv) {
        this.errors.clear();

        const { email, password } = this
        this.$store.dispatch(types.AUTH_REQUEST, { email, password }).then(() => {
          this.$router.push('/')
        }).catch(err => {
          let response = JSON.parse(err.request.response)
          // this.errors.clear();
          Object.entries(response).forEach((field) => {
            field.reduce((key, values) => {
              if (key === 'detail') {
                this.errors.add({field: 'non_field_errors', msg: values})
              } else {
                this.errors.add({field: key, msg: values.join(', ')})
              }
            })
          })
        })
    },
    setFocus: function (currentField) {
      this.activeField = currentField
      this.$refs[currentField].focus()
    },
    clearFocus: function () {
      this.activeField = ''
    },
  }
}
