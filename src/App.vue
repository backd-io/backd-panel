<template>
  <div id="app" class="container">
    <top></top>
    <router-view></router-view>
    <bottom></bottom>
  </div>
</template>

<script>
import Top from './components/common/Top'
import Bottom from './components/common/Bottom'
// components: {
//   Top,
//   Bottom
// },

export default {
  components: {
    Top,
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
    this.goIfLogged(this.$route)
  }
}

</script>
