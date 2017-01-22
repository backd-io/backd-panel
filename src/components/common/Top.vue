<template>
  <div class="md-toolbar-container" v-if="currentUser != ''">
    <md-toolbar>
      <md-button class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title" style="flex: 1">Default</h2>

      <md-button class="md-icon-button">
        <md-icon>favorite</md-icon>
      </md-button>
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
