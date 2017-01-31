<template>
  <div id="app" class="container">
    <router-view></router-view>
    <bottom></bottom>
  </div>
</template>

<script>
import Bottom from './components/common/Bottom'
// components: {
//   Top,
//   Bottom
// },

export default {
  components: {
    Bottom
  },
  methods: {
    goIfLogged (to) {
      if (this.$store.state.Backd.LoggedIn === false) {
        console.log('user not logged in')
        console.log(this.$store.state.Backd)
        if (to.path !== '/') {
          console.log('redirecting to /')
          this.$router.push('/')
        }
      }
    }
  },
  watch: {
    '$route' (to, from) {
      console.log('from.path: ' + from.path + ' to.path: ' + to.path)
      this.goIfLogged(to)
    }
  },
  created () {
    this.$store.state.Backd.security['token'] = this.$localStorage.get('token')
    this.$store.state.Backd.security['refresh_token'] = this.$localStorage.get('refresh_token')
    this.$store.state.Backd.security['expires_at'] = this.$localStorage.get('expires_at')
    this.goIfLogged(this.$route)
  }
}

</script>
