<template>
  <md-layout md-gutter class="full-height">

    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar class="md-accent">
        <div class="md-toolbar-container">
          <h3 class="md-title">Domains</h3>
        </div>
      </md-toolbar>
      <domains-view></domains-view>
    </md-sidenav>

    <md-layout md-hide-xsmall md-hide-small md-flex-medium="30" md-flex-large="20" md-flex-xlarge="20" class="full-height full-width">
      <md-whiteframe md-elevation="2" class="full-width">
        <domains-view></domains-view>
      </md-whiteframe>
    </md-layout>

    <md-layout md-flex-xsmall="100" md-flex-small="100" md-flex-medium="70" md-flex-large="80" md-flex-xlarge="80" class="full-height">
      <md-toolbar class="full-width md-accent">
        <md-button class="md-icon-button nav-trigger" @click="toggleLeftSidenav">
          <md-icon>menu</md-icon>
        </md-button>
        <!-- <md-button :class="{ 'md-primary': currentView === 'info' }" @click="selectView('info')">Info</md-button> -->
        <md-button :class="{ 'md-primary': currentView === 'users' }" @click="selectView('users')">Users</md-button>
        <md-button :class="{ 'md-primary': currentView === 'groups' }" @click="selectView('groups')">Groups</md-button>
        <span style="flex: 1"></span>
        <div style="width: auto">
          <md-input-container style="margin: 4px 0;" v-if="showDetailSearch" md-flex="30">
            <md-input placeholder="search..." maxlength="16" v-model="detailSearch"></md-input>
          </md-input-container>
        </div>
        <md-button class="md-icon-button" v-if="!showDetailSearch" @click="showDetailSearch = !showDetailSearch">
          <md-icon>search</md-icon>
        </md-button>
      </md-toolbar>
      <md-progress style="margin-top: -4px" class="md-warn" v-if="waiting" md-indeterminate></md-progress>
      <md-subheader v-if="detailSearch !== ''">{{ detailSearchSubheader }}<a href @click.stop.prevent="clearDetailResults()">clear results</a></md-subheader>

      <md-list class="full-width full-height">
        <template v-for="entity in entities">
        <md-list-item class="md-double-line full-width">
          <div class="md-list-text-container" v-if="currentView === 'groups'">
            <span>{{ entity.id }}</span>
            <span>{{ entity.description }}</span>
          </div>
          <div class="md-list-text-container" v-if="currentView === 'users'">
            <span>{{ entity.id }}</span>
            <span>{{ entity.name }}</span>
          </div>
          <span style="flex: 1"></span>
          <md-button class="md-icon-button">
            <md-icon>edit</md-icon>
          </md-button>
          <md-button class="md-icon-button">
            <md-icon>delete</md-icon>
          </md-button>
        </md-list-item>
        <md-divider></md-divider>
        </template>
      </md-list>
      <md-button class="md-fab md-fab-bottom-right md-warn">
        <md-icon>add</md-icon>
      </md-button>

    </md-layout>
  </md-layout>

</template>

<script>
import { eventBus } from '../../event-bus'
import Moment from 'moment'
import DomainsView from './DomainsView'

export default {
  components: {
    DomainsView
  },
  data () {
    return {
      waiting: false,
      entities: [],
      selectedData: [],
      currentDomain: '',
      currentView: 'users',
      detailPage: 1,
      detailPageSize: 20,
      detailSearch: '',
      detailSearchSubheader: '',
      detailQueryTimeout: null,
      showDetailSearch: false
    }
  },
  methods: {
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
      this.detailSearch = ''
    },
    formatNano (orig) {
      return Moment(orig / 1000000).format()
    },
    openDialog (ref) {
      this.$refs[ref].open()
    },
    toggleLeftSidenav () {
      this.$refs.leftSidenav.toggle()
    },
    clearDetailResults () {
      this.detailSearch = ''
      this.showDetailSearch = false
    }
  },
  watch: {
    currentView: function () {
      this.updateViews()
    },
    detailSearch: function () {
      var that = this
      clearTimeout(this.detailQueryTimeout)
      that.detailQueryTimeout = setTimeout(function () {
        that.updateViews()
      }, 1000)
    }
  },
  created () {
    var that = this
    eventBus.$on('currentDomain', function (id) {
      that.currentDomain = id
      that.updateViews()
    })
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
