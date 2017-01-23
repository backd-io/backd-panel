<template>
  <div id="app" class="container">
    <router-view></router-view>
    <bottom></bottom>
  </div>
</template>

<script>
// <top></top>
// import Top from './components/common/Top'
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
      console.log('goIfLogged: loggedIn=' + this.$store.state.Backd.LoggedIn)
      if (this.$store.state.Backd.LoggedIn === false) {
        console.log(to.path)
        if (to.path !== '') {
          console.log('redirecting to /')
          this.$router.push('')
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
