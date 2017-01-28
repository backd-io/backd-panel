<template>

  <md-tabs>
  <md-tab id="domains" md-label="Domains">
    <domains-index></domains-index>
  </md-tab>

  <md-tab id="entities" md-label="Users - Groups">
    <entities-index></entities-index>
  </md-tab>

  <md-tab id="apps" md-label="Applications">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
  </md-tab>

  <md-tab id="other" md-label="---">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
  </md-tab>
</md-tabs>

</template>

<script>
import DomainsIndex from '../domains/Index'
import EntitiesIndex from '../entities/Index'

export default {
  components: {
    DomainsIndex,
    EntitiesIndex
  },
  data () {
    return {
    }
  },
  methods: {

  },
  created () {
  }
}
</script>
