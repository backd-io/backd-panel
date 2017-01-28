<template>
  <div class="container">
    <md-theme md-name="login">
      <md-layout style="height:100%" md-gutter><!-- this will carry with the -if- if needed -->
        <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="60" md-flex-large="60" md-flex-xlarge="70">
          <section class="text-center full-width" style="margin: auto 0">
            <p class="md-display-1">backd</p>
            <p class="md-headline">backend server for applications</p>
          </section>
        </md-layout>
        <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="40"  md-flex-large="40" md-flex-xlarge="30">
          <div class="full-width text-center" style="margin: auto 0">
            <div class="md-toolbar-container full-width">
              <md-toolbar class="md-transparent">
                <h2 class="md-title" style="flex: 1">log in</h2>
              </md-toolbar>
            </div>
            <form novalidate @submit.stop.prevent="login" class="full-width padding-20">
              <md-input-container>
                <label>Domain</label>
                <md-input placeholder="domain" v-model="domain" required></md-input>
              </md-input-container>

              <md-input-container>
                <label>Username</label>
                <md-input placeholder="username" v-model="username" required></md-input>
              </md-input-container>

              <md-input-container md-has-password>
                <label>Password</label>
                <md-input type="password" placeholder="password" v-model="password" @keyup.enter="login" required></md-input>
              </md-input-container>

              <md-button class="md-primary" @click="login" :disabled="disableIfNotFilled()">log in</md-button>
              <md-button>forgot password</md-button>
            </form>
          </div>


        </md-layout>
      </md-layout>
    </md-theme>
  </div>

</template>

<script>
import { eventBus } from '../event-bus'

export default {
  data () {
    return {
      domain: '',
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      var that = this
      // that.$store.state.Backd.Admin().Users().Add()
      that.$store.state.Backd.Identity().Auth().Basic(that.domain, that.username, that.password)
      .then(function (response) {
        console.log(response)
        that.$router.push({ path: '/domains' })
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          eventBus.$emit('alert',
          'Incorrect Credentials',
          true, 'close', 10000, 'top', 'center')
        } else {
          eventBus.$emit('alert',
          'Unexpected error. HTTP Error Code' + error.response.status,
          true, 'close', 10000, 'top', 'center')
        }
      })
    },
    disableIfNotFilled () {
      if (this.domain.length < 3 || this.username.length < 3 || this.password.length < 3) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
