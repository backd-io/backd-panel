<template lang="html">
  <div class="full-height">
    <md-toolbar class="md-accent" v-if="!domainSearchShow">
      <span style="flex: 1"></span>
      <md-button class="md-icon-button" @click="domainSearchShow = !domainSearchShow">
        <md-icon>search</md-icon>
      </md-button>
      <md-button class="md-icon-button" id="domainAdd" @click="openDialog('domainAdd')">
        <md-icon>add</md-icon>
      </md-button>
    </md-toolbar>
    <md-toolbar class="md-accent" v-if="domainSearchShow">
      <md-input-container style="margin: 4px 0;">
        <md-input placeholder="search..." maxlength="16" v-model="domainSearch"></md-input>
      </md-input-container>
    </md-toolbar>
    <md-progress style="margin-top: -4px" class="md-warn" v-if="waiting" md-indeterminate></md-progress>
    <md-subheader v-if="domainSearch !== ''"><b>{{ domainSearchSubheader }}</b><a href @click.stop.prevent="clearDomainResults()">clear results</a></md-subheader>
    <md-list class="full-height">
      <template v-for="domain in domains">
      <md-list-item @click="selectDomain(domain)">
        {{ domain.id }}
      </md-list-item>
      <md-divider></md-divider>
      </template>
    </md-list>
    <md-dialog md-open-from="#domainAdd" md-close-to="#domainAdd" ref="domainAdd">
      <md-dialog-title>New domain</md-dialog-title>

      <md-dialog-content>
        <form>
          <md-input-container>
            <label>ID</label>
            <md-textarea></md-textarea>
          </md-input-container>
        </form>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-warn" @click="closeDialog('domainAdd')">Cancel</md-button>
        <md-button class="md-primary" @click="closeDialog('domainAdd')">Create</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog md-open-from="#domainEdit" ref="domainEdit">
      <md-dialog-title>Edit domain</md-dialog-title>

      <md-dialog-content>
        <form>
          <md-input-container>
            <label>ID</label>
            <md-textarea v-model="domain.id"></md-textarea>
          </md-input-container>
          <md-input-container>
            <label>Name</label>
            <md-textarea v-model="domain.name"></md-textarea>
          </md-input-container>
          <md-input-container>
            <label>Session Expiration (seconds)</label>
            <md-textarea v-model="domain.session_exp"></md-textarea>
          </md-input-container>
        </form>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-warn" @click="closeDialog('domainEdit')">Cancel</md-button>
        <md-button class="md-primary md-raised" @click="updateDomain()">Update</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { eventBus } from '../../event-bus'

export default {
  data () {
    return {
      domain: {},
      domains: [],
      domainSearch: '',
      domainSearchShow: false,
      domainSearchSubheader: '',
      domainQueryTimeout: null
    }
  },
  methods: {
    queryDomains () {
      var that = this
      var query = ''

      that.waiting = true
      console.log('query domain ....')
      if (that.domainSearch !== '') {
        query = '{ "_id": "' + that.domainSearch + '" }'
        // query = '{ "_id": {\'$regex\': /^' + that.domainSearch + '/ }'
      }
      that.$store.state.Backd.Identity().Domain().List(
        that.currentDomainPage,
        query,
        '',
        that.currentDomainPageSize)
        .then(function (data) {
          that.domains = data
          if (that.domains.length === 0) {
            that.domainSearchSubheader = 'Search: \'' + that.domainSearch + '\'. No results.  '
          } else {
            that.domainSearchSubheader = 'Search: \'' + that.domainSearch + '\' .  '
            that.domain = data[0]
            that.selectDomain(that.domain)
          }
          that.waiting = false
        })
    },
    selectDomain (domain) {
      eventBus.domain = domain
      eventBus.$emit('currentDomain', domain)
    },
    clearDomainResults () {
      this.domainSearch = ''
      this.domainSearchShow = false
    },
    updateDomain () {
      var that = this
      that.$store.state.Backd.Identity().Domain().Update(that.domain)
      .then(function () {
        eventBus.$emit('alert',
        'Domain Updated',
        true, 'close', 10000, 'top', 'center')
        that.closeDialog('domainEdit')
      })
      .catch(function () {
        eventBus.$emit('alert',
        'There was an error updating the domain. Try again.',
        true, 'close', 10000, 'top', 'center')
      })
    }
  },
  watch: {
    domainSearch: function () {
      var that = this
      clearTimeout(this.domainQueryTimeout)
      that.domainQueryTimeout = setTimeout(function () {
        that.queryDomains()
      }, 1000)
    }
  },
  created () {
    this.queryDomains()
  }
}
</script>
