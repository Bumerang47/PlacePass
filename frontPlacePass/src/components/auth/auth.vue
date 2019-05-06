<template lang="pug">
  .content
    .registration-title sign up with
    ComponentAlterSignIn
    .separate
      span.separate__txt or
    form.signup-form(@submit.prevent="validateBeforeSubmit")
      span.form-non.field_errors {{ errors.first('non_field_errors') }}
      .form-item(
        @click="setFocus('first_name')"
        v-bind:class="{'--active': activeField === 'first_name', '--fill': Boolean(this.first_name), '--error': this.errors.has('first_name')}"
       )
        span.form-item__placeholder
          i.material-icons.form-item__placeholder-icon perm_identity
          span.form-item__placeholder-text First Name
        input.form-item__input(
          name="first_name" id="first_name" ref="first_name"
          v-validate="'required'" v-model="first_name"
          @blur="clearFocus()"
        )
        span.form-item__error {{ errors.first('first_name') }}

      .form-item(
        @click="setFocus('last_name')"
        v-bind:class="{'--active': activeField === 'last_name','--fill': Boolean(this.last_name),'--error': this.errors.has('last_name')}"
      )
        span.form-item__placeholder
          i.material-icons.form-item__placeholder-icon perm_identity
          span.form-item__placeholder-text Last Name
        input.form-item__input(
          name="last_name" id="last_name" ref="last_name"
          v-model="last_name"
          @blur="clearFocus()"
        )
        span.form-item__error {{ errors.first('last_name') }}
      .form-item(
        @click="setFocus('email')"
        v-bind:class="{'--active': activeField === 'email','--fill': Boolean(this.email),'--error': this.errors.has('email')}"
      )
        span.form-item__placeholder
          i.material-icons.form-item__placeholder-icon mail_outline
          span.form-item__placeholder-text E-mail
        input.form-item__input(
          name="email" id="email" ref="email"
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
          type="password" name="password" id="password" ref="password"
          v-validate="{ required: true }" v-model="password"
          @blur="clearFocus()"
        )
        span.form-item__error {{ errors.first('password') }}
      .form-item(
        @click="setFocus('confirm_password')"
        v-bind:class="{'--active': activeField === 'confirm_password','--fill': Boolean(this.confirm_password),'--error': this.errors.has('confirm_password')}"
      )
        span.form-item__placeholder
          i.material-icons.form-item__placeholder-icon lock_open
          span.form-item__placeholder-text Confirm password
        input.form-item__input(
          type="password" name="confirm_password" id="confirm_password"
          v-validate="{ is: password, required: true}" v-model="confirm_password"
          @blur="clearFocus()" ref="confirm_password"
        )
        span.form-item__error {{ errors.first('confirm_password') }}
      .form-item.form-item-checkbox
        input(
          type="checkbox", name="receive_offers" id="receive_offers",
          v-model="receive_offers"
        )
        label(for="receive_offers") I'd like to receive PlacePass news and offers
      p.description
        span  By signing up. I agree to the PlasePass
        a(href="#" title="Terms of Service")  Terms of Service
        span  and
        a(href="#" title="Privacy Policy")  Privacy Policy
      input.form-item__button(type="submit" value="Register")
      .have-account
        span.have-account Already have an account?
        router-link.link-button( to="login" title="Log in") log in
</template>

<script src="./auth.js"></script>
<style scoped lang="scss" src="./auth.scss"></style>
