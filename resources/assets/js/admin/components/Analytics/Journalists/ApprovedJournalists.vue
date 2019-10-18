<template>
    <div :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-show="!loading">
            <div class="row">
                <div class="col s6">
                    <h4>{{titleGraph}}</h4>
                </div>
                <div class="col s6 right-align">
                </div>
            </div>

            <div class="row">
                <div class="col s4 offset-s4">
                    <pie-chart v-if="!loading" :chart-data="datacollection" :options="options"></pie-chart>
                </div>
            </div>

            <div class="row">
                <div class="col s3 center-align">
                    <p style="font-size: 22px">Average number of industry subscriptions</p>
                    <p style="color:#ffcc24;font-size: 30px">{{dataStats.avgIndustrySubscriptions}}</p>
                </div>
                <div class="col s3 center-align">
                    <p style="font-size: 22px">Total number of industry subscriptions</p>
                    <p style="color:#ffcc24;font-size: 30px">{{dataStats.totalInquirySubscriptions}}</p>
                </div>
                <div class="col s3 center-align">
                    <p style="font-size: 22px">Average number of topic subscriptions</p>
                    <p style="color:#ffcc24;font-size: 30px">{{dataStats.avgTopicSubscriptions}}</p>
                </div>
                <div class="col s3 center-align">
                    <p style="font-size: 22px">Total number of <br/>topic subscriptions</p>
                    <p style=" color:#ffcc24;font-size: 30px">{{dataStats.totalTopicSubscriptions}}</p>
                </div>
            </div>

            <div class="divider"></div>
            <div class="row">
                <div class="col s12">
                    <datatable title="Approved Journalists" :columns="columns" :rows="rows"
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
    name: 'ApprovedJournalists',
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
        dataStats:{
          avgIndustrySubscriptions: 0,
          totalInquirySubscriptions: 0,
          avgTopicSubscriptions: 0,
          totalTopicSubscriptions: 0
        },
        showGraph: 1,
        titleGraph: 'Journalist Subscriptions',
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
          { id: 1, label: 'ID', field: '', numeric: true, html: true, width: '70px' },
          { id: 2, label: 'Name', field: 'full_name', numeric: false, html: false, width: 'auto' },
          { id: 3, label: 'Inquiry Submitted', field: 'inquiry_submitted', numeric: false, html: false, width: 'auto' },
          {
            id: 4,
            label: 'Pitch Subscription',
            field: 'pitch_subscription_count',
            numeric: true,
            html: false,
            width: 'auto'
          },
          {
            id: 5,
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
        this.$http.get(laroute.route('admin.reports.journalists.approved'))
          .then(response => {
            let approvedJournalists = response.data.approvedJournalists
            this.rows = approvedJournalists
            this.loading = false

            let dataGraph = {
              journalists: approvedJournalists.length,
              inquirySubmited: approvedJournalists.filter(r => r.inquiry_submitted == 'Yes').length,
              pitchSubsCount: 0,
              pitchTopicSubsCount: 0
            }

            approvedJournalists.forEach(function (row) {
              dataGraph.pitchSubsCount += row.pitch_subscription_count
              dataGraph.pitchTopicSubsCount += row.pitch_topic_subscription_count
            })

            this.dataStats.avgIndustrySubscriptions = parseFloat(dataGraph.pitchSubsCount / dataGraph.journalists).toFixed(2);
            this.dataStats.totalInquirySubscriptions = dataGraph.pitchSubsCount;
            this.dataStats.totalTopicSubscriptions = dataGraph.pitchTopicSubsCount;
            this.dataStats.avgTopicSubscriptions = parseFloat(dataGraph.pitchTopicSubsCount / dataGraph.journalists).toFixed(2);

            this.fillPieChart(dataGraph);
          })
          .catch(e => {
            console.error(e)
            this.errors.push(e)
          })
      },
      fillPieChart (dataGraph) {
        this.datacollection = {
          labels: ['Have submitted', 'Have not submitted'],
          datasets: [
            {
              label: 'Inquiries',
              data: [dataGraph.inquirySubmited, dataGraph.journalists - dataGraph.inquirySubmited],
              backgroundColor: ['rgb(21, 151, 1)', 'rgb(255, 177, 9)']
            },
          ]
        }
      }
    }
  }
</script>

<style scoped>

</style>