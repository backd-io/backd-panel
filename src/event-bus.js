import Vue from 'vue'
// eventBus
export const eventBus = new Vue({
  data: {
    logs: []
  },
  methods: {
    logAdd (logData) {
      this.logs.unshift(logData)
      eventBus.$emit('log', logData)
    }
  }
})
