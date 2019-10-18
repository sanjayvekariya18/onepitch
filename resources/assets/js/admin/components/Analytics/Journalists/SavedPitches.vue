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
                    <line-chart v-if="!loading && showGraph === 1" :chart-data="datacollection" :options="options"></line-chart>
                    <bar-chart v-if="!loading && showGraph === 2" :chart-data="datacollection" :options="options"></bar-chart>
                    <pie-chart v-if="!loading && showGraph === 3" :chart-data="datacollection" :options="options"></pie-chart>
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
                    <datatable title="Saved Pitches" :columns="columns" :rows="rows"
                               :customButtons="customButtons"
                               :perPage="[10, 25, 50, 100]" :defaultPerPage="10">
                    </datatable>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import Preloader from '../../Partials/PreloaderComponent.vue';
    import DataTable from 'vue-materialize-datatable';
    import BarChart from '../../../plugins/BarChart.js';
    import LineChart from '../../../plugins/LineChart.js';
    import PieChart from '../../../plugins/PieChart.js';


    export default {
        name: "SavedPitches",
        components: {
            LineChart,
            BarChart,
            PieChart,
            Preloader,
            "datatable": DataTable
        },
        created() {
            this.$parent.setPageTitle('Analytics');
        },
        mounted() {
            this.getData({});
        },
        data() {
            return {
                selectedDate: null,
                loading: true,
                datacollection: null,
                showGraph: 1,
                titleGraph: 'Saved Pitches',
                customButtons: [
                    {
                        hide: true,    // Whether to hide the button
                        icon: 'search', // Materialize icon
                        onclick: function (e) {
                        }, // Click handler
                    }
                ],
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                },
                rows: [],
                columns: [
                    {id: 1, label: "ID", field: 'id', numeric: true, html: false, width: 'auto'},
                    {id: 2, label: "Pitch ID", field: 'pitch_id', numeric: true, html: false, width: 'auto'},
                    {id: 3, label: "User ID", field: 'user_id', numeric: true, html: false, width: 'auto'},
                    {id: 4, label: "Journalist Name", field: 'full_name', numeric: false, html: false, width: 'auto'},
                    {id: 5, label: "Date Saved", field: 'date_saved', numeric: false, html: false, width: 'auto'}
                ],
            };
        },
        watch: {
            selectedDate: function () {
                this.filterDate(this.selectedDate);
            }
        },
        methods: {
            loadGraph: function (graph) {
                this.showGraph = graph;
                this.getData();
            },
            clearDate: function () {
                this.selectedDate = null;
                this.getData();
            },
            filterDate: function (dateRange) {
                if (dateRange) {
                    let startDate = new Date(dateRange.start);
                    let endDate = new Date(dateRange.end);

                    let filters = {
                        startDate: this.formatDate(startDate),
                        endDate: this.formatDate(endDate),
                    };

                    this.getData(filters);
                }
            },
            formatDate: function (date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            },
            getData: function (filters) {
                this.loading = true;
                this.$http.get(laroute.route('admin.reports.journalists.saved-pitches', filters))
                    .then(response => {
                        this.rows = response.data.savedPitches;
                        this.loading = false;

                        let dataGraph = {
                            pitchIds: [],
                            userIds: [],
                        };

                        this.rows.forEach(function (value) {
                            if (dataGraph.pitchIds.indexOf(value.pitch_id) == -1) {
                                dataGraph.pitchIds.push(value.pitch_id);
                            }
                            if (dataGraph.userIds.indexOf(value.user_id) == -1) {
                                dataGraph.userIds.push(value.user_id);
                            }
                        });

                        if (this.showGraph === 1)
                            this.fillLineChart(dataGraph);
                        if (this.showGraph === 2)
                            this.fillBarChart(dataGraph);
                        if (this.showGraph === 3)
                            this.fillPieChart(dataGraph);

                    })
                    .catch(e => {
                        console.error(e);
                        this.errors.push(e)
                    });
            },
            fillLineChart(dataGraph) {
                this.datacollection = {
                    labels: ['pitches', 'users'],
                    datasets: [
                        {
                            label: 'Data Graph',
                            borderColor: '#f87979',
                            lineTension: 0.1,
                            fill: false,
                            data: [dataGraph.pitchIds.length, dataGraph.userIds.length]
                        },
                    ]
                }
            },

            fillBarChart(dataGraph) {
                this.datacollection = {
                    labels: ['pitches', 'users'],
                    datasets: [
                        {
                            label: 'Data Graph',
                            backgroundColor: '#2f64f8',
                            data: [dataGraph.pitchIds.length, dataGraph.userIds.length]
                        },
                    ]
                }
            },
            fillPieChart(dataGraph) {
                this.datacollection = {
                    labels: ['pitches', 'users'],
                    datasets: [
                        {
                            label: 'Data Graph',
                            data: [dataGraph.pitchIds.length, dataGraph.userIds.length],
                            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"]
                        },
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>