<template>
    <div :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-show="!loading">
            <div class="row">
                <div class="col s6">
                    <h5>{{titleGraph}}</h5>
                </div>
                <div class="col s6 right-align">
                    <a class="waves-effect waves-light btn" @click='loadGraph(1)'>
                        <i class="material-icons">show_chart</i>
                    </a>
                    <a class="waves-effect waves-light btn" @click='loadGraph(2)'>
                        <i class="material-icons">bar_chart</i>
                    </a>
                    <a class="waves-effect waves-light btn" @click='loadGraph(3)'>
                        <i class="material-icons">pie_chart</i>
                    </a>
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
                <div class="col s12">
                    <datatable title="Journalists (By Industry)" :columns="columns" :rows="rows"
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
    name: 'JournalistIndustrySubscription',
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
        datacollection: null,
        options: {
          responsive: true,
          maintainAspectRatio: false
        },
        showGraph: 1,
        titleGraph: null,
        loading: true,
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
          { id: 2, label: 'Name', field: 'full_name', numeric: false, html: false, width: 'auto' },
          { id: 3, label: 'Company', field: 'company', numeric: false, html: false, width: 'auto' },
          { id: 4, label: 'Email', field: 'email', numeric: false, html: false, width: 'auto' },
          { id: 5, label: 'Industry', field: 'industry', numeric: false, html: false, width: 'auto' }
        ],
      }
    },
    methods: {
      loadGraph: function (graph) {
        this.showGraph = graph
        this.getData()
      },
      getData: function () {
        this.loading = true
        this.$http.get(laroute.route('admin.reports.journalists.industry-subscription'))
          .then(response => {
            let rows = response.data.journalistIndustrySubscriptions
            this.rows = rows
            this.loading = false

            let labels = []
            let data = []
            let dataAvg = []
            let randomColors = []
            let totalSubscriptions = rows.length

            rows.forEach(function (value) {
              if (labels.indexOf(value.industry) === -1) {
                labels.push(value.industry)
              }
            })

            labels.forEach(function (e) {
              let o = Math.round, r = Math.random, s = 255
              let subscriptionByIndustry = rows.filter(r => r.industry == e).length

              data.push(
                subscriptionByIndustry
              )

              randomColors.push(
                'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')'
              )

              dataAvg.push(parseFloat(subscriptionByIndustry * 100 / totalSubscriptions).toFixed(2))

            })

            let dataGraph = {
              labels: labels,
              data: data,
              dataAvg: dataAvg,
              randomColors: randomColors,
            }

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
        this.titleGraph = 'Journalists by Industry'
        this.datacollection = {
          labels: dataGraph.labels,
          datasets: [
            {
              label: 'Journalists',
              borderColor: '#f87979',
              lineTension: 0.1,
              fill: false,
              data: dataGraph.data
            },
          ]
        }
      },
      fillBarChart (dataGraph) {
        this.datacollection = {
          labels: dataGraph.labels,
          datasets: [
            {
              label: 'Journalists',
              backgroundColor: '#2f64f8',
              data: dataGraph.data
            }
          ]
        }
      },
      fillPieChart (dataGraph) {
        this.datacollection = {
          labels: dataGraph.labels,
          datasets: [
            {
              label: 'Data Graph',
              data: dataGraph.dataAvg,
              backgroundColor: dataGraph.randomColors
            },
          ]
        }
      }
    }
  }
</script>

<style scoped>

</style>