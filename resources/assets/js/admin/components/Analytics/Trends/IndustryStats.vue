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
                <div class="col s12">
                    <datatable title="Industry Stats" :columns="columns" :rows="rows"
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
    name: 'IndustryStats',
    components: {
      LineChart,
      BarChart,
      PieChart,
      Preloader,
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
        loading: true,
        datacollection: null,
        showGraph: 1,
        titleGraph: 'Industry Stats',
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
          { id: 1, label: 'ID', field: 'id', numeric: true, html: false, width: 'auto' },
          { id: 2, label: 'Title', field: 'title', numeric: false, html: false, width: 'auto' },
          { id: 3, label: 'Pitches Submitted', field: 'pitches_submitted', numeric: true, html: false, width: 'auto' },
          { id: 4, label: 'Pitches Drafted', field: 'pitches_drafted', numeric: true, html: false, width: 'auto' },
          { id: 5, label: 'Pitches Sent', field: 'pitches_sent', numeric: true, html: false, width: 'auto' },
          { id: 6, label: 'Pitches Rejected', field: 'pitches_rejected', numeric: true, html: false, width: 'auto' },
          { id: 7, label: 'Responses', field: 'pitches_responses', numeric: true, html: false, width: 'auto' },
          {
            id: 8,
            label: 'Journalist Subscriptions',
            field: 'journalist_subscriptions',
            numeric: true,
            html: false,
            width: 'auto'
          },
          {
            id: 9,
            label: 'Publicist Subscriptions',
            field: 'publicist_subscriptions',
            numeric: true,
            html: false,
            width: 'auto'
          }
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
        this.$http.get(laroute.route('admin.reports.trends.industry-stats'))
          .then(response => {
            let industries = response.data.industries
            this.rows = industries
            this.loading = false

            let dataGraph = {
              titles: 0,
              pitchesSubmitted: 0,
              pitchesDrafted: 0,
              pitchesSent: 0,
              pitchesRejected: 0,
              responses: 0,
              journalistsSubscriptions: 0,
              publicistSubscriptions: 0
            }

            industries.forEach(function (value) {
              dataGraph.titles = industries.length
              dataGraph.pitchesSubmitted += value.pitches_submitted
              dataGraph.pitchesDrafted += value.pitches_drafted
              dataGraph.pitchesSent += value.pitches_sent
              dataGraph.pitchesRejected += value.pitches_rejected
              dataGraph.responses += value.pitches_responses
              dataGraph.journalistsSubscriptions += value.journalist_subscriptions
              dataGraph.publicistSubscriptions += value.publicist_subscriptions
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
          labels: ['industries', 'pitches submited', 'pitches drafted', 'pitches sent', 'pitches rejected', 'responses', 'journalist subscriptions', 'publicist subscriptions'],
          datasets: [
            {
              label: 'Data Graph',
              borderColor: '#f87979',
              lineTension: 0.1,
              fill: false,
              data: [dataGraph.titles, dataGraph.pitchesSubmitted, dataGraph.pitchesDrafted, dataGraph.pitchesSent, dataGraph.pitchesRejected, dataGraph.responses, dataGraph.journalistsSubscriptions,dataGraph.publicistSubscriptions]
            },
          ]
        }
      },

      fillBarChart (dataGraph) {
        this.datacollection = {
          labels: ['industries', 'pitches submited', 'pitches drafted', 'pitches sent', 'pitches rejected', 'responses', 'journalist subscriptions', 'publicist subscriptions'],
          datasets: [
            {
              label: 'Data Graph',
              backgroundColor: '#2f64f8',
              data: [dataGraph.titles, dataGraph.pitchesSubmitted, dataGraph.pitchesDrafted, dataGraph.pitchesSent, dataGraph.pitchesRejected, dataGraph.responses, dataGraph.journalistsSubscriptions,dataGraph.publicistSubscriptions]
            },
          ]
        }
      },
      fillPieChart (dataGraph) {
        this.datacollection = {
          labels: ['pitches submited', 'pitches drafted', 'pitches sent', 'pitches rejected', 'responses', 'journalist subscriptions', 'publicist subscriptions'],
          datasets: [
            {
              label: 'Data Graph',
              data: [dataGraph.titles, dataGraph.pitchesSubmitted, dataGraph.pitchesDrafted, dataGraph.pitchesSent, dataGraph.pitchesRejected, dataGraph.responses, dataGraph.journalistsSubscriptions,dataGraph.publicistSubscriptions],
              backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(192, 83, 103)', 'rgb(71, 181, 49)', 'rgb(0, 182, 176)', 'rgb(194, 47, 50)', 'rgb(255, 56, 196)']
            },
          ]
        }
      }
    }
  }
</script>

<style scoped>

</style>