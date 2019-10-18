<template>
    <div :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-show="!loading">
            <div class="row">
                <div class="col s6">
                    <h5>{{titleGraph}}</h5>
                </div>
                <div class="col s6 right-align">
                    <a class="waves-effect waves-light btn" @click='loadGraph(1)'> <i
                            class="material-icons">show_chart</i></a>
                    <a class="waves-effect waves-light btn" @click='loadGraph(2)'> <i
                            class="material-icons">bar_chart</i></a>
                    <a class="waves-effect waves-light btn" @click='loadGraph(3)'> <i
                            class="material-icons">pie_chart</i></a>
                </div>
            </div>
            <div class="row">
                <div class="col s12">
                    <line-chart v-if="!loading && showGraph === 1" :chart-data="datacollection"
                                :options="options"></line-chart>
                    <bar-chart v-if="!loading && showGraph === 2" :chart-data="datacollection"
                               :options="options"></bar-chart>
                    <pie-chart v-if="!loading && showGraph === 3" :chart-data="datacollection"
                               :options="options"></pie-chart>
                </div>
            </div>
            <div class="divider"></div>
            <div class="row">
                <div class="col s12 right-align">
                    <v-date-picker
                            class='picker'
                            mode='range'
                            v-model='selectedDate'
                            is-expanded>
                    </v-date-picker>
                    <div class="cancel-button" v-if="selectedDate" @click='clearDate'>
                        Clear
                    </div>
                </div>
                <div class="col s12">
                    <datatable title="Brand Index Search Log" :columns="columns" :rows="rows"
                               :customButtons="customButtons"
                               :perPage="[10, 25, 50, 100]" :defaultPerPage="10">
                    </datatable>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
  import Preloader from '../../Partials/PreloaderComponent.vue'
  import DataTable from 'vue-materialize-datatable'
  import BarChart from '../../../plugins/BarChart.js'
  import LineChart from '../../../plugins/LineChart.js'
  import PieChart from '../../../plugins/PieChart.js'

  export default {
    name: 'BrandIndexSearchLogs',
    components: {
      Preloader,
      LineChart,
      BarChart,
      PieChart,
      'datatable': DataTable
    },
    created () {
      this.$parent.setPageTitle('Analytics')
    },
    mounted () {
      this.getData()
    },
    data () {
      return {
        selectedDate: null,
        loading: true,
        datacollection: null,
        showGraph: 1,
        titleGraph: 'Brand Index Search Logs',
        options: {
          responsive: true,
          maintainAspectRatio: false
        },
        customButtons: [
          {
            hide: true,    // Whether to hide the button
            icon: 'search', // Materialize icon
            onclick: function (e) {
            }, // Click handler
          }
        ],
        rows: [],
        columns: [
          { id: 1, label: 'ID', field: 'id', numeric: true, html: true, width: 'auto' },
          { id: 2, label: 'User ID', field: 'user_id', numeric: true, html: false, width: 'auto' },
          { id: 3, label: 'Journalist Name', field: 'full_name', numeric: false, html: false, width: 'auto' },
          { id: 4, label: 'Search Term', field: 'term', numeric: false, html: false, width: 'auto' },
          { id: 5, label: 'Industry Title', field: 'title', numeric: false, html: false, width: 'auto' },
          { id: 6, label: 'Topic Title', field: 'industry_title', numeric: false, html: false, width: 'auto' },
          { id: 7, label: 'Date Searched', field: 'created_at', numeric: false, html: false, width: 'auto' }
        ],
      }
    },
    watch: {
      selectedDate: function () {
        this.filterDate(this.selectedDate)
      }
    },
    methods: {
      loadGraph: function (graph) {
        this.showGraph = graph
        this.getData()
      },
      clearDate: function () {
        this.selectedDate = null
        this.getData()
      },
      filterDate: function (dateRange) {
        if (dateRange) {
          let startDate = new Date(dateRange.start)
          let endDate = new Date(dateRange.end)

          let filters = {
            startDate: this.formatDate(startDate),
            endDate: this.formatDate(endDate),
          }

          this.getData(filters)
        }
      },
      formatDate: function (date) {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
      },
      getData: function (filters) {
        this.loading = true
        this.$http.get(laroute.route('admin.reports.journalists.brand-index-sl', filters))
          .then(response => {
            let brandIndexSearchLogs = response.data.brandIndexSearchLogs
            this.rows = brandIndexSearchLogs
            this.loading = false

            let dataGraph = {
              users: [],
              terms: [],
              industries: [],
              topics: [],
            }

            brandIndexSearchLogs.forEach(function (value) {
              if (dataGraph.users.indexOf(value.user_id) == -1) {
                dataGraph.users.push(value.user_id)
              }
              if (dataGraph.terms.indexOf(value.term) == -1 && value.term != '' && value.term != 'NULL') {
                dataGraph.terms.push(value.term)
              }
              if (dataGraph.industries.indexOf(value.title) == -1 && value.title != '' && value.title != 'NULL') {
                dataGraph.industries.push(value.title)
              }
              if (dataGraph.topics.indexOf(value.industry_title) == -1 && value.industry_title != '' && value.industry_title != 'NULL') {
                dataGraph.topics.push(value.industry_title)
              }
            })

            if (this.showGraph === 1)
              this.fillLineChart(dataGraph)
            if (this.showGraph === 2)
              this.fillBarChart(dataGraph)
            if (this.showGraph === 3)
              this.fillPieChart(dataGraph)

          })
          .catch(e => {
            console.error(e)
            this.errors.push(e)
          })
      },
      fillLineChart (dataGraph) {
        this.datacollection = {
          labels: ['users', 'terms', 'industry', 'topic'],
          datasets: [
            {
              label: 'Data Graph',
              borderColor: '#f87979',
              lineTension: 0.1,
              fill: false,
              data: [dataGraph.users.length, dataGraph.terms.length, dataGraph.industries.length, dataGraph.topics.length]
            },
          ]
        }
      },

      fillBarChart (dataGraph) {
        this.datacollection = {
          labels: ['users', 'terms', 'industry', 'topic'],
          datasets: [
            {
              label: 'Data Graph',
              backgroundColor: '#2f64f8',
              data: [dataGraph.users.length, dataGraph.terms.length, dataGraph.industries.length, dataGraph.topics.length]
            },
          ]
        }
      },
      fillPieChart (dataGraph) {
        this.datacollection = {
          labels: ['users', 'terms', 'industry', 'topic'],
          datasets: [
            {
              label: 'Data Graph',
              data: [dataGraph.users.length, dataGraph.terms.length, dataGraph.industries.length, dataGraph.topics.length],
              backgroundColor: ['rgb(255, 99, 132)',
                'rgb(54, 162, 235)', 'rgb(255, 205, 86)',
                'rgb(153, 102, 255)']
            },
          ]
        }
      }
    }
  }
</script>

<style scoped>

</style>