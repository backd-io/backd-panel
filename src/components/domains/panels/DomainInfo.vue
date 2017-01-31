<template>
  <md-layout class="full-height" md-column>
    <form novalidate @submit.stop.prevent="submit" class="padding-16">
      <div class="text-right">
        <md-button class="md-fab md-mini md-primary" v-if="!viewMode" @click="updateDomain()">
          <md-icon>save</md-icon>
        </md-button>
        <md-button class="md-fab md-mini" @click="viewMode = !viewMode">
          <md-icon>edit</md-icon>
        </md-button>
      </div>
      <md-input-container>
        <label>ID</label>
        <md-input v-model="domain.id" :disabled="viewMode"></md-input>
      </md-input-container>
      <md-input-container>
        <label>Name</label>
        <md-input v-model="domain.name" :disabled="viewMode"></md-input>
      </md-input-container>
      <md-input-container>
        <label>Session Expiration (seconds)</label>
        <md-input v-model="domain.session_exp" :disabled="viewMode"></md-input>
      </md-input-container>
      <md-table>
        <md-table-row>
            <md-table-head>User</md-table-head>
            <md-table-head md-numeric>Permissions</md-table-head>
          </md-table-row>
        </md-table-header>
        <md-table-body>
          <md-table-row v-for="acl, entity in domain._acl">
            <md-table-cell>{{ entity }}</md-table-cell>
            <md-table-cell class="">
              <md-button-toggle class="md-primary text-right">
                <md-button v-bind:class="{ 'md-toggle': isActive(entity, 'a') }" @click="toogle(entity, 'a')" style="width: auto">admin</md-button>
                <md-button v-bind:class="{ 'md-toggle': isActive(entity, 'c') }" @click="toogle(entity, 'c')" style="width: auto">create</md-button>
                <md-button v-bind:class="{ 'md-toggle': isActive(entity, 'd') }" @click="toogle(entity, 'd')" style="width: auto">delete</md-button>
                <md-button v-bind:class="{ 'md-toggle': isActive(entity, 'l') }" @click="toogle(entity, 'l')" style="width: auto">list</md-button>
                <md-button v-bind:class="{ 'md-toggle': isActive(entity, 'm') }" @click="toogle(entity, 'm')" style="width: auto">modify</md-button>
              </md-table-cell>
            </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </form>
  </md-layout>
</template>

<script>
import { eventBus } from '../../../event-bus'
import _ from 'lodash'

export default {
  data () {
    return {
      viewMode: true,
      domain: {}
    }
  },
  methods: {
    updateDomain () {
      var that = this
      that.$store.state.Backd.Identity().Domain().Update(that.domain, {}, true)
      .then(function () {
        eventBus.$emit('alert',
        'Domain Updated',
        true, 'close', 10000, 'top', 'center')
      })
      .catch(function () {
        eventBus.$emit('alert',
        'There was an error updating the domain. Try again.',
        true, 'close', 10000, 'top', 'center')
      })
    },
    isActive (entity, t) {
      if (this.domain._acl[entity].indexOf(t) < 0) {
        return false
      } else {
        return true
      }
    },
    toogle (entity, t) {
      if (this.domain._acl[entity].indexOf(t) < 0) {
        this.domain._acl[entity].push(t)
      } else {
        _.pull(this.domain._acl[entity], t)
      }
      // console.log(this.domain._acl[entity])
      // console.log(this.domain)
    }
  },
  created () {
    var that = this
    eventBus.$on('currentDomain', function (domain) {
      that.domain = domain
    })
  }
}
</script>
