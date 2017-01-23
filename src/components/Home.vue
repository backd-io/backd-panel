<template>
  <div class="container">
    <md-theme md-name="login">
      <md-layout style="height:100%" md-gutter><!-- this will carry with the -if- if needed -->
        <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="60" md-flex-large="60" md-flex-xlarge="70">
          <section class="text-center full-width" style="margin: auto 0">
            <p class="md-display-1">backd</p>
            <p class="md-headline">application backend server</p>
          </section>
        </md-layout>
        <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="40"  md-flex-large="40" md-flex-xlarge="30">
          <div class="full-width text-center" style="margin: auto 0">
            <div class="md-toolbar-container full-width">
              <md-toolbar class="md-transparent">
                <h2 class="md-title" style="flex: 1">log in</h2>
              </md-toolbar>
            </div>
            <form novalidate @submit.stop.prevent="submit" class="full-width padding-20">
              <md-input-container>
                <label>Domain</label>
                <md-input placeholder="domain" v-model="domain"></md-input>
              </md-input-container>

              <md-input-container>
                <label>Username</label>
                <md-input placeholder="username" v-model="username"></md-input>
              </md-input-container>

              <md-input-container md-has-password>
                <label>Password</label>
                <md-input type="password" placeholder="password" v-model="password"></md-input>
              </md-input-container>

              <md-button class="md-raised md-primary" v-on:click="login">log in</md-button>
              <md-button v-on:click="openSnack">forgot password</md-button>
              <!-- <md-button disabled>{{ err }}</md-button> -->
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
      password: '',
      err: ''
    }
  },
  methods: {
    login () {
      var that = this
      // that.$store.state.Backd.Admin().Users().Add()
      that.$store.state.Backd.Identity().Auth().Basic(that.domain, that.username, that.password)
      .then(function () {
        that.err = 'Moo!'
        that.$store.state.Backd.Identity().Domain().List()
        .then(function (response) {
          console.log('--- [0]')
          console.log(response[0])
        })
        that.$router.push({ path: '/domains' })
      })
      .catch(function (response) {
        console.log(response)
        that.err = 'Unauthorized'
      })
    },
    openSnack () {
      eventBus.$emit('alert', 'You forgot the password', true, 'retry', 10000, 'top', 'center')
    }
  }
}
</script>
