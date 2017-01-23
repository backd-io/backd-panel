<template>
  <div class="md-toolbar-container" v-if="$store.state.Backd.LoggedIn">

    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <h2 class="md-title" style="flex: 1">backd</h2>

        <span style="flex: 1;"></span>

        <md-button class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>

        <md-button class="md-icon-button">
          <md-icon>filter_list</md-icon>
        </md-button>
      </div>

      <div class="md-toolbar-container">
        <router-link tag="md-button" to="/" v-if="!$store.state.Backd.LoggedIn">Home</router-link>
        <template v-if="$store.state.Backd.LoggedIn">
          <router-link tag="md-button" to="/domains">Domains</router-link>
        </template>
      </div>
    </md-toolbar>

  </div>
</template>

<script>
export default {
  data () {
    return {
      currentUser: ''
    }
  }
}
</script>

<style>
</style>
