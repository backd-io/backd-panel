<template>
  <div class="full-height">
    <top></top>
    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar class="md-accent">
        <div class="md-toolbar-container">
          <h3 class="md-title">Domains</h3>
        </div>
      </md-toolbar>
      <domains-list></domains-list>
    </md-sidenav>
    <md-layout md-gutter class="full-height">
      <md-layout md-hide-xsmall md-hide-small md-flex-medium="30" md-flex-large="20" md-flex-xlarge="20" class="full-height" md-column>
        <md-whiteframe md-elevation="2" class="full-height">
          <domains-list></domains-list>
        </md-whiteframe>
      </md-layout>

      <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="70" md-flex-large="80" md-flex-xlarge="80" class="full-height" md-column>
        <md-toolbar class="full-width md-accent">
          <md-button class="md-icon-button nav-trigger" @click="toggleLeftSidenav">
            <md-icon>menu</md-icon>
          </md-button>
          <md-button :class="{ 'md-primary': currentView === 'info' }" @click="selectView('info')">Info</md-button>
          <md-button :class="{ 'md-primary': currentView === 'users' }" @click="selectView('users')">Users</md-button>
          <md-button :class="{ 'md-primary': currentView === 'groups' }" @click="selectView('groups')">Groups</md-button>
          <!-- <span style="flex: 1"></span>
          <div style="width: auto">
            <md-input-container style="margin: 4px 0;" v-if="showDetailSearch" md-flex="30">
              <md-input placeholder="search..." maxlength="16" v-model="detailSearch"></md-input>
            </md-input-container>
          </div>
          <md-button class="md-icon-button" v-if="!showDetailSearch" @click="showDetailSearch = !showDetailSearch">
            <md-icon>search</md-icon>
          </md-button> -->
        </md-toolbar>
        <md-progress style="margin-top: -4px" class="md-warn" v-if="waiting" md-indeterminate></md-progress>
        <domain-info v-if="currentView === 'info'"></domain-info>
      </md-layout>

    </md-layout>
  </div>
</template>

<script>
// import { eventBus } from '../../event-bus'
// import Moment from 'moment'
import DomainsList from './DomainsList'
import Top from '../common/Top'
import DomainInfo from './panels/DomainInfo'

export default {
  components: {
    Top,
    DomainsList,
    DomainInfo
  },
  data () {
    return {
      waiting: false,
      currentView: 'info'
    }
  },
  methods: {
    toggleLeftSidenav () {
      this.$refs.leftSidenav.toggle()
    },
    updateViews () {
      var that = this
      var query = ''
      var entity

      that.waiting = true
      if (that.detailSearch !== '') {
        query = '{ "_id": "' + that.detailSearch + '" }'
      }

      switch (that.currentView) {
        case 'users':
          entity = that.$store.state.Backd.Identity().Users(that.currentDomain)
          break
        case 'groups':
          entity = that.$store.state.Backd.Identity().Groups(that.currentDomain)
          break
      }

      entity.List(
        that.detailPage,
        query,
        '',
        that.detailPageSize)
        .then(function (data) {
          that.entities = data
          if (that.entities.length === 0) {
            that.detailSearchSubheader = 'Search: \'' + that.detailSearch + '\'. No results.  '
          } else {
            that.detailSearchSubheader = 'Search: \'' + that.detailSearch + '\' .  '
          }
          console.log('query: { \'domain\': \'' + that.currentDomain + '\', \'type\': \'' + that.currentView + '\', \'items\': ' + that.entities.length + ' }')
          that.waiting = false
        })
    },
    selectView (view) {
      this.currentView = view
      if (view !== 'info') {
        this.detailSearch = ''
      }
    }
  },
  watch: {
  },
  created () {
  }
}
</script>

<style>
@media (min-width: 945px) {
  .nav-trigger {
    display: none;
  }
}
</style>
