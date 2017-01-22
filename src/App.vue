<template>
  <div id="app" class="container">
    <router-view></router-view>
    <top></top>
    <bottom></bottom>
  </div>
</template>

<script>
import Top from './components/common/Top'
import Bottom from './components/common/Bottom'

export default {
  components: {
    Top,
    Bottom
  },
  methods: {
    goIfLogged (to) {
      if (!this.$store.state.Backd.loggedIn()) {
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
      this.goIfLogged(to.path)
    }
  },
  created () {
    this.goIfLogged(this.$route.path)
  }
}

</script>
