<template>
  <md-layout md-gutter><!-- this will carry with the -if- if needed -->
    <md-table-card class="full-width">
      <md-toolbar>
        <h1 class="md-title">Domains</h1>
        <md-button class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>
      </md-toolbar>

      <md-table md-sort="id" md-sort-type="desc" @select="onSelect" @sort="onSort">
        <md-table-header>
          <md-table-row>
            <md-table-head md-sort-by="id">ID</md-table-head>
            <md-table-head md-sort-by="name" md-tooltip="Name of the domain">Name</md-table-head>
            <md-table-head>Exp</md-table-head>
            <md-table-head>
              <md-icon>date_range</md-icon>
              <span>Created</span>
            </md-table-head>
            <md-table-head>
              <md-icon>date_range</md-icon>
              <span>Update At</span>
            </md-table-head>
          </md-table-row>
        </md-table-header>

        <md-table-body>
          <md-table-row v-for="(row, rowIndex) in domains" :key="rowIndex" :md-item="row" md-auto-select md-selection>
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
          </md-table-row>
        </md-table-body>
      </md-table>

      <md-table-pagination
        :md-size="page.size"
        :md-total="domains.length"
        :md-page="page.page"
        md-label="Rows"
        md-separator="of"
        :md-page-options="[10, 25, 50]"
        @pagination="onPagination"></md-table-pagination>
    </md-table-card>
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
      page: {}
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
    }
  },
  created () {
    this.page = {
      'page': 1,
      'size': 10
    }
    this.queryDomains()
  }
}
</script>
