<template>
    <div :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-show="!loading">
            <div class="row">
                <div class="col s6">
                    <h5>{{titleGraph}} Stats</h5>
                </div>
                <div class="col s6 right-align">
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
            </div>
            <div class="row">
                <div class="col s3 center-align">
                    <p style="font-size: 22px">Total number of inquiries submitted</p>
                    <p style="color:#ffcc24;font-size: 30px">{{dataStats.inquiriesSubmitted}}</p>
                </div>
                <div class="col s3 center-align">
                    <p style="font-size: 22px">Avg number of inquiries submitted by user</p>
                    <p style="color:#ffcc24;font-size: 30px">{{dataStats.avgUserInquiries}}</p>
                </div>
                <div class="col s3 center-align">
                    <p style="font-size: 22px">Number of approved inquiries</p>
                    <p style="color:#ffcc24;font-size: 30px">{{dataStats.approvedInquiries}}</p>
                </div>
                <div class="col s3 center-align">
                    <p style="font-size: 22px">Total % of rejected inquiries</p>
                    <p style=" color:#ffcc24;font-size: 30px">{{dataStats.rejectedInquiriesPerc}} %</p>
                </div>
            </div>
            <div class="divider"></div>
            <div class="row">
                <div class="col s12">
                    <datatable title="Inquiry Mail Stats" :columns="columns" :rows="rows"
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
    name: 'InquiryMailStatistics',
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
        selectedDate: null,
        loading: true,
        datacollection: null,
        dataStats: [],
        showGraph: 1,
        titleGraph: 'Inquiry Mail',
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
          { label: 'Inquiry ID', field: 'id', numeric: true, html: false, width: 'auto' },
          { label: 'Inquiry Subject Title', field: 'subject', numeric: true, html: false, width: 'auto' },
          { label: 'Created', field: 'created_at', numeric: false, html: false, width: 'auto' },
          { label: 'Sent', field: 'sent', numeric: true, html: false, width: 'auto' },
          { label: 'Opens', field: 'opens', numeric: true, html: false, width: 'auto' },
          { label: 'Clicks', field: 'clicks', numeric: true, html: false, width: 'auto' },
          { label: 'Saves', field: 'saves', numeric: true, html: false, width: 'auto' },
          { label: 'Responses', field: 'responses', numeric: true, html: false, width: 'auto' },
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
        this.$http.get(laroute.route('admin.reports.journalists.inquiries', filters))
          .then(response => {
            let dataStats = []
            let inquiries = response.data.inquiries
            let approvedInquiries = inquiries.filter(r => r.status === 3)
            let rejectedInquiries = inquiries.filter(r => r.status === 10)
            let uniqueUserInquiry = []
            let sumInquiriesUser = 0

            this.rows = approvedInquiries
            this.loading = false

            inquiries.forEach(function (value) {
              if (uniqueUserInquiry.indexOf(value.user_id) === -1) {
                uniqueUserInquiry.push(value.user_id)
              }
            })

            uniqueUserInquiry.forEach(function (value) {
              sumInquiriesUser += inquiries.filter(r => r.user_id === value).length
            })

            dataStats.inquiriesSubmitted = inquiries.length
            dataStats.avgUserInquiries = parseFloat(sumInquiriesUser / uniqueUserInquiry.length).toFixed(2)
            dataStats.approvedInquiries = approvedInquiries.length
            dataStats.rejectedInquiriesPerc = parseFloat(rejectedInquiries.length * 100 / dataStats.inquiriesSubmitted).toFixed(2)

            this.dataStats = dataStats
          })
          .catch(e => {
            console.error(e)
            this.errors.push(e)
          })
      },
      fillLineChart (dataGraph) {
        this.datacollection = {
          labels: ['inquiries', 'journalists', 'publicists'],
          datasets: [
            {
              label: 'Data Graph',
              borderColor: '#f87979',
              lineTension: 0.1,
              fill: false,
              data: [dataGraph.inquiries.length, dataGraph.journalists.length, dataGraph.publicists.length]
            },
          ]
        }
      },

      fillBarChart (dataGraph) {
        this.datacollection = {
          labels: ['inquiries', 'journalists', 'publicists'],
          datasets: [
            {
              label: 'Data Graph',
              backgroundColor: '#2f64f8',
              data: [dataGraph.inquiries.length, dataGraph.journalists.length, dataGraph.publicists.length]
            },
          ]
        }
      },
      fillPieChart (dataGraph) {
        this.datacollection = {
          labels: ['inquiries', 'journalists', 'publicists'],
          datasets: [
            {
              label: 'Data Graph',
              data: [dataGraph.inquiries.length, dataGraph.journalists.length, dataGraph.publicists.length],
              backgroundColor: ['rgb(255, 99, 132)',
                'rgb(54, 162, 235)', 'rgb(255, 205, 86)']
            },
          ]
        }
      }
    }
  }
</script>

<style scoped>

</style>