<template name="alter-sign-in" lang="pug">
  .content
    .alter-signin
      a.alter-signin__link.alter-signin__facebook(
        :href="`https://www.facebook.com/v3.3/dialog/oauth?" +
          "client_id=${ authFacebookKey }" +
          "&redirect_uri=${ this.socialCallbackURL }?provider=facebook" +
          "&state={st=state123abc,ds=123456789}`"
        )
        img.alter-signin__logo(src="@//assets//facebook-logo.svg")
        | facebook
      span  /
      a.alter-signin__link.alter-signin__google(
        :href="`https://accounts.google.com/o/oauth2/v2/auth?" +
        "client_id=${ authGoogleOAuth2Key }&" +
        "response_type=code&" +
        "scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&" +
        "access_type=offline&" +
        "redirect_uri=${this.socialCallbackURL}?provider=google-oauth2&" +
        "include_granted_scopes=true&" +
        "state=state_parameter_passthrough_value`"
        )
        img.alter-signin__logo(src="@//assets//google-logo.svg")
        |  google
</template>

<script src="./alterSignIn.js"></script>
<style scoped lang="scss" src="./alterSignIn.scss"></style>
