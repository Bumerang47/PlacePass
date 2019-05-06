import ComponentBase from '@/components/base/base.vue'
import ComponentAlterSignIn from '@/components/alterSignIn/alterSignIn.vue'
import * as types from '@/store/mutation-types'

export default {
  components: {
    ComponentBase,
    ComponentAlterSignIn
  },
  data() {
    return {
      activeField: '',
      email: null, first_name: null, last_name: null,
      password: null, confirm_password: null, receive_offers: null
    }
  },
  methods: {
    validateBeforeSubmit () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.signUp()
            return;
          }
        })
    },
    signUp (submitEnv) {
        const { email, first_name, last_name, password, confirm_password, receive_offers } = this
        this.$store.dispatch(types.AUTH_SIGNUP, {
          email, first_name, last_name, password, confirm_password, receive_offers
        }).then(() => {
          this.$router.push('/login')
        }).catch(err => {
          let response = JSON.parse(err.request.response)
          this.errors.clear();
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
    socialAuth: function (currentAuth) {

    },
    clearFocus: function () {
      this.activeField = ''
    },
  }
}
