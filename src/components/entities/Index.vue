<template>

    <md-layout md-gutter> <!--this will carry with the -if- if needed -->
      <md-table-card class="full-width" style="-webkit-box-shadow: 0px 0px 0px 0px rgba(0,0,0,0); -moz-box-shadow: 0px 0px 0px 0px rgba(0,0,0,0); box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);">
        <md-toolbar>
          <h1 class="md-title">Users and Groups</h1>
          <md-button class="md-icon-button" id="domainAdd" @click="openDialog('domainAdd')">
            <md-icon>add</md-icon>
          </md-button>
          <md-button class="md-icon-button">
            <md-icon>search</md-icon>
          </md-button>
        </md-toolbar>

        <md-table md-sort="id" md-sort-type="desc" @select="onSelect" @sort="onSort">
          <md-table-header>
            <md-table-row>
              <md-table-head md-sort-by="id">ID</md-table-head>
              <md-table-head md-sort-by="name" md-tooltip="Name of the domain">Name</md-table-head>
              <md-table-head md-tooltip="Time to live for a token on the domain">Session Expiration Time</md-table-head>
              <md-table-head md-tooltip="Creation time">
                <md-icon>date_range</md-icon>
                <span>Created at</span>
              </md-table-head>
              <md-table-head md-tooltip="Last update">
                <md-icon>date_range</md-icon>
                <span>Updated at</span>
              </md-table-head>
              <md-table-head>
              </md-table-head>
            </md-table-row>
          </md-table-header>

          <md-table-body>
            <md-table-row v-for="(row, rowIndex) in entities" :key="rowIndex" :md-item="row" md-auto-select md-selection>
              <md-table-cell>
                {{ row.id }}
              </md-table-cell>
              <md-table-cell>
                {{ row.name }}
              </md-table-cell>
              <md-table-cell>
                {{ row.session_exp }}
              </md-table-cell>
              <md-table-cell>
                {{ formatNano(row._meta._created_at) }}
              </md-table-cell>
              <md-table-cell>
                {{ formatNano(row._meta._updated_at) }}
              </md-table-cell>
              <md-table-cell style="justify-content: flex-end;">
                <md-button class="md-icon-button" id="domainAdd" @click="openDialog('domainAdd')">
                  <md-icon>edit</md-icon>
                </md-button>
                <md-button class="md-icon-button md-accent" id="domainAdd" @click="openDialog('domainAdd')">
                  <md-icon class="md-warn">delete</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>

        <md-table-pagination
          :md-size="page.size"
          :md-total="domains.length"
          :md-page="page.page"
          md-label="Rows"
          md-separator="of"
          :md-page-options="[10, 20, 50]"
          @pagination="onPagination"></md-table-pagination>
      </md-table-card>

      <md-dialog md-open-from="#domainAdd" md-close-to="#domainAdd" ref="domainAdd">
        <md-dialog-title>Create new note</md-dialog-title>

        <md-dialog-content>
          <form>
            <md-input-container>
              <label>Note</label>
              <md-textarea></md-textarea>
            </md-input-container>
          </form>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-warn" @click="closeDialog('domainAdd')">Cancel</md-button>
          <md-button class="md-primary" @click="closeDialog('domainAdd')">Create</md-button>
        </md-dialog-actions>
      </md-dialog>

    </md-layout>

</template>

<script>
import Moment from 'moment'

export default {
  data () {
    return {
      domains: [],
      selectedData: [],
      sort: {},
      page: {
        'page': 1,
        'size': 20
      }
    }
  },
  methods: {
    onSelect (e) {
      this.selectedData = e
      this.$forceUpdate()
    },
    onSort (e) {
      this.sort = e
      this.queryDomains()
    },
    onPagination (e) {
      this.page = e
      this.queryDomains()
    },
    queryDomains () {
      var that = this
      console.log('querying....')
      that.$store.state.Backd.Identity().Domain().List(
        that.page['page'],
        '',
        '',
        that.page['size'])
        .then(function (data) {
          that.domains = data
        })
    },
    formatNano (orig) {
      return Moment(orig / 1000000).format()
    },
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    onOpen () {
      console.log('Opened')
    },
    onClose (type) {
      console.log('Closed', type)
    }
  },
  created () {
    this.queryDomains()
  }
}
</script>
