<template>
  <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
    <span>{{ msg }}</span>
    <md-button class="md-accent" md-theme="orange" @click="$refs.snackbar.close()" v-if="close_button">{{ close_msg }}</md-button>
  </md-snackbar>
</template>

<script>
import { eventBus } from '../../event-bus'

export default {
  data () {
    return {
      vertical: '',
      horizontal: '',
      duration: 5000,
      msg: '',
      close_button: false,
      close_msg: ''
    }
  },
  created () {
    var that = this
    eventBus.$on('alert', function (msg, closeButton = false, closeMsg = '', duration = 5000, vertical = 'bottom', horizontal = 'center') {
      that.msg = msg
      that.close_button = closeButton
      that.close_msg = closeMsg
      that.duration = duration
      that.vertical = vertical
      that.horizontal = horizontal
      that.$refs.snackbar.open()
    })
  }
}
</script>
