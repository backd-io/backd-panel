<template>
  <div class="md-toolbar-container" v-if="$store.state.Backd.LoggedIn">
    <md-toolbar>
        <h2 class="md-title" style="flex: 1">backd</h2>

        <span style="flex: 1;"></span>

        <router-link tag="md-button" to="/domains">Domains</router-link>
        <router-link tag="md-button" to="/applications">Applications</router-link>
        <md-button class="md-icon-button" @click="signOut()"><md-icon>exit_to_app</md-icon></md-button>
    </md-toolbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    signOut () {
      this.$store.state.Backd.Identity().Auth().LogOut()
    }
  }

}
</script>

<style>
</style>
