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
                    <p style="font-size: 22px">Total number of pitches submitted</p>
                    <p style="color:#ffcc24;font-size: 30px">{{dataStats.pitchesSubmitted}}</p>
                </div>
                <div class="col s3 center-align">
                    <p style="font-size: 22px">Avg number of pitches submitted by user</p>
                    <p style="color:#ffcc24;font-size: 30px">{{dataStats.avgUserPitches}}</p>
                </div>
                <div class="col s3 center-align">
                    <p style="font-size: 22px">Number of approved pitches</p>
                    <p style="color:#ffcc24;font-size: 30px">{{dataStats.approvedPitches}}</p>
                </div>
                <div class="col s3 center-align">
                    <p style="font-size: 22px">Total % of rejected pitches</p>
                    <p style=" color:#ffcc24;font-size: 30px">{{dataStats.rejectedPitchesPerc}} %</p>
                </div>
            </div>
            <div class="row" v-show="pitchDetails.length">
                <div class="col s12">
                    <table>
                        <tr>
                            <td>Journalist Name</td>
                            <td>Opens</td>
                            <td>Clicks</td>
                            <td>Responses</td>
                            <td>Saves</td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="divider"></div>
            <div class="row">
                <div class="col s12">
                    <datatable title="Pitches Published" :columns="columns" :rows="rows"
                               :customButtons="customButtons"
                               :perPage="[10, 25, 50, 100]" :defaultPerPage="10"
                               v-on:row-click="onRowClick">
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
    name: 'PitchMailStatistics',
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
      this.getData({})
    },
    data () {
      return {
        selectedDate: null,
        loading: true,
        datacollection: null,
        dataStats: [],
        showGraph: 1,
        options: {
          responsive: true,
          maintainAspectRatio: false
        },
        titleGraph: 'Pitch Mail',
        customButtons: [
          {
            hide: true,    // Whether to hide the button
            icon: 'search', // Materialize icon
            onclick: function (e) {
            }, // Click handler
          }
        ],
        pitchDetails: [],
        rows: [],
        columns: [
          { label: 'Pitch ID', field: 'id', numeric: true, html: false, width: 'auto' },
          { label: 'Pitch Subject Title', field: 'subject', numeric: false, html: false, width: 'auto' },
          { label: 'Created', field: 'created_at', numeric: false, html: false, width: 'auto' },
          { label: 'Sent', field: 'sent', numeric: true, html: false, width: 'auto' },
          { label: 'Opens', field: 'opens', numeric: true, html: false, width: 'auto' },
          { label: 'Clicks', field: 'clicks', numeric: true, html: false, width: 'auto' },
          { label: 'Saves', field: 'saves', numeric: true, html: false, width: 'auto' },
          { label: 'Responses', field: 'responses', numeric: true, html: false, width: 'auto' }
        ],
      }
    },
    watch: {
      selectedDate: function () {
        this.filterDate(this.selectedDate)
      }
    },
    methods: {
      onRowClick: function (row) {
        //row contains the clicked object from `rows`
        console.log(row)
        this.pitchDetails.push({
          journalist: 'servando',
          open: 1,
          clicks: 10,
          responses: 100,
          saves: 15,
        })

      },
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
        this.$http.get(laroute.route('admin.reports.publicists.pitches', filters))
          .then(response => {
            let dataStats = []
            let pitches = response.data.pitches
            let approvedPitches = pitches.filter(r => r.status === 3)
            let rejectedPitches = pitches.filter(r => r.status === 10)
            let uniqueUserPitch = [];
            let sumPitchesUser = 0;

            this.rows = approvedPitches
            this.loading = false

            pitches.forEach(function (value) {
              if (uniqueUserPitch.indexOf(value.user_id) === -1) {
                uniqueUserPitch.push(value.user_id)
              }
            })

            uniqueUserPitch.forEach(function (value) {
                sumPitchesUser += pitches.filter(r => r.user_id === value).length;
            });

            dataStats.pitchesSubmitted = pitches.length
            dataStats.avgUserPitches = parseFloat(sumPitchesUser / uniqueUserPitch.length).toFixed(2)
            dataStats.approvedPitches = approvedPitches.length
            dataStats.rejectedPitchesPerc = parseFloat(rejectedPitches.length * 100 / dataStats.pitchesSubmitted).toFixed(2)

            this.dataStats = dataStats
          })
          .catch(e => {
            console.error(e)
            this.errors.push(e)
          })
      },
      fillLineChart (dataGraph) {
        this.datacollection = {
          labels: ['pitches', 'publicists', 'journalists'],
          datasets: [
            {
              label: 'Data Graph',
              borderColor: '#f87979',
              lineTension: 0.1,
              fill: false,
              data: [dataGraph.pitchIds.length, dataGraph.publicistIds.length, dataGraph.journalistsIds.length]
            },
          ]
        }
      },

      fillBarChart (dataGraph) {
        this.datacollection = {
          labels: ['pitches', 'publicists', 'journalists'],
          datasets: [
            {
              label: 'Data Graph',
              backgroundColor: '#2f64f8',
              data: [dataGraph.pitchIds.length, dataGraph.publicistIds.length, dataGraph.journalistsIds.length]
            },
          ]
        }
      },
      fillPieChart (dataGraph) {
        this.datacollection = {
          labels: ['pitches', 'publicists', 'journalists'],
          datasets: [
            {
              label: 'Data Graph',
              data: [dataGraph.pitchIds.length, dataGraph.publicistIds.length, dataGraph.journalistsIds.length],
              backgroundColor: ['rgb(255, 99, 132)',
                'rgb(54, 162, 235)', 'rgb(255, 205, 86)']
            },
          ]
        }
      }

    }
  }
</script>

<style lang="scss">

    .picker {
        min-width: 220px;
        z-index: 5;
    }

    .cancel-button {
        float: right;
        height: 46px;
        padding: 13px 10px;
        background: #FFD731;
        cursor: pointer;
    }

</style>