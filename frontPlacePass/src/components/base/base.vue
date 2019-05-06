<template name="base" lang="pug">
  div.container
    .bg
    header.header(v-if="isAuthenticated" )
      span.header-tite {{displayName}}
      button.link-button(title="Logout" @click="logout" ) logout
    .panel
      router-view
    footer.footer(v-if="isAuthenticated" )
      span © PlacePass
</template>

<script src="./base.js"></script>
<style scoped lang="scss" src="./base.scss"></style>
