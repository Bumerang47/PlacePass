<template lang="pug">
  .content
    .login-title sign in with
    ComponentAlterSignIn
    .separate
      span.separate__txt or
    form.signin-form(@submit.prevent="validateBeforeSubmit")
      span.form-non_field_errors {{ errors.first('non_field_errors') }}
      .form-item(
        @click="setFocus('email')"
        v-bind:class="{'--active': activeField === 'email','--fill': Boolean(this.email),'--error': this.errors.has('email')}"
      )
        span.form-item__placeholder
          i.material-icons.form-item__placeholder-icon mail_outline
          span.form-item__placeholder-text E-mail
        input.form-item__input(
          name="email" id="email" ref="email" autocomplete="username"
          v-validate="'required|email'" v-model="email"
          @blur="clearFocus()"
        )
        span.form-item__error {{ errors.first('email') }}
      .form-item(
        @click="setFocus('password')"
        v-bind:class="{'--active': activeField === 'password','--fill': Boolean(this.password),'--error': this.errors.has('password')}"
      )
        span.form-item__placeholder
          i.material-icons.form-item__placeholder-icon lock_open
          span.form-item__placeholder-text Password
        input.form-item__input(
          type="password" name="password" id="password" ref="password" autocomplete="current-password"
          v-validate="{ required: true }" v-model="password"
          @blur="clearFocus()"
        )
        span.form-item__error {{ errors.first('password') }}
      input.form-item__button(type="submit" value="Login")
      .havent-account
        span.havent-account Are you haven't an account?
        router-link.link-button(to="registration" title="Sign Up") Sign Up
</template>

<script src="./login.js"></script>
<style scoped lang="scss" src="./login.scss"></style>
