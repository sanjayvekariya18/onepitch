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
                    <datatable title="Declined Journalists" :columns="columns" :rows="rows"
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
    name: 'DeclinedJournalists',
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
        loading: true,
        datacollection: null,
        showGraph: 1,
        titleGraph: 'Declined Journalists',
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
          { id: 2, label: 'Name', field: 'full_name', numeric: false, html: false, width: 'auto' },
          { id: 3, label: 'Email', field: 'email', numeric: false, html: false, width: 'auto' },
          { id: 4, label: 'Inquiry Submitted', field: 'inquiry_submitted', numeric: false, html: false, width: 'auto' },
          {
            id: 5,
            label: 'Pitch Subscription',
            field: 'pitch_subscription_count',
            numeric: true,
            html: false,
            width: 'auto'
          },
          {
            id: 6,
            label: 'Pitch-Topic Subscription',
            field: 'pitch_topic_subscription_count',
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
        this.$http.get(laroute.route('admin.reports.journalists.declined'))
          .then(response => {
            let declinedJournalists = response.data.declinedJournalists
            this.rows = declinedJournalists
            this.loading = false

            let dataGraph = {
              journalists: declinedJournalists.length,
              inquirySubmited: declinedJournalists.filter(r => r.inquiry_submitted == 'Yes').length,
              pitchSubsCount: 0,
              pitchTopicSubsCount: 0
            }

            declinedJournalists.forEach(function (row) {
              dataGraph.pitchSubsCount += row.pitch_subscription_count
              dataGraph.pitchTopicSubsCount += row.pitch_topic_subscription_count
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
          labels: ['journalists', 'pitch subscriptions', 'pitch topics', 'inquiry submited'],
          datasets: [
            {
              label: 'Data Graph',
              borderColor: '#f87979',
              lineTension: 0.1,
              fill: false,
              data: [dataGraph.journalists, dataGraph.pitchSubsCount, dataGraph.pitchTopicSubsCount, dataGraph.inquirySubmited]
            },
          ]
        }
      },
      fillBarChart (dataGraph) {
        this.datacollection = {
          labels: ['journalists', 'pitch subscriptions', 'pitch topics', 'inquiry submited'],
          datasets: [
            {
              label: 'Data Graph',
              backgroundColor: '#2f64f8',
              data: [dataGraph.journalists, dataGraph.pitchSubsCount, dataGraph.pitchTopicSubsCount, dataGraph.inquirySubmited]
            },
          ]
        }
      },
      fillPieChart (dataGraph) {
        this.datacollection = {
          labels: ['submitted', 'not submitted'],
          datasets: [
            {
              label: 'Inquiries',
              data: [dataGraph.inquirySubmited, dataGraph.journalists - dataGraph.inquirySubmited],
              backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)']
            },
          ]
        }
      }
    }
  }
</script>

<style scoped>

</style>