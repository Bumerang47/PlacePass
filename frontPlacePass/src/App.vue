<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
import store from '@/store'
import * as types from '@/store/mutation-types'

export default {
  name: 'App',
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(types.AUTH_LOGOUT)
        }
        throw err
      })
    })

    if (store.getters.isAuthenticated) {
      this.$store.dispatch(types.USER_REQUEST)
        .catch(() => {
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style>
body, html {
  height: 100%;
  padding: 0;
  margin: 0;
}
input {
  outline: none;
}
a {
  text-decoration: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
  /*margin-top: 60px;*/
}
.content {
  display: flex;
  flex-direction: column;
}
</style>
