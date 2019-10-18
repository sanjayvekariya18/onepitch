<template>
    <div :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-show="!loading">
            <div class="row">
                <div class="col s6">
                    <h5>{{titleGraph}} Users</h5>
                </div>
                <div class="col s6 right-align">
                    <a class="waves-effect waves-light btn" @click='loadGraph(1)'> <i class="material-icons">show_chart</i></a>
                    <a class="waves-effect waves-light btn" @click='loadGraph(2)'> <i class="material-icons">bar_chart</i></a>
                    <a class="waves-effect waves-light btn" @click='loadGraph(3)'> <i class="material-icons">pie_chart</i></a>
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
                    <datatable v-if="!loading" title="Users Report" :columns="columns" :rows="rows"
                               :customButtons="customButtons"
                               :perPage="[10, 25, 50, 100]" :defaultPerPage="10" v-on:row-click="onRowClick">
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
        components: {
            Preloader,
            LineChart,
            BarChart,
            PieChart,
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
                roles: [
                    {id: 90, role: 'Admin', color: "rgb(255, 99, 132)"},
                    {id: 1, role: 'Journalist', color: "rgb(54, 162, 235)"},
                    {id: 2, role: 'Publicists', color: "rgb(75, 192, 192)"},
                    {id: 0, role: 'Disabled', color: "rgb(153, 102, 255)"},
                ],
                selectedDate: null,
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
                columns: [
                    {label: "Role", field: 'role', numeric: true, html: false, width: 'auto'},
                    {label: "Name", field: 'full_name', numeric: false, html: false, width: 'auto'},
                    {label: "Company", field: 'company', numeric: false, html: false, width: 'auto'},
                    {label: "Hear About", field: 'hear_about', numeric: false, html: false, width: 'auto'},
                    {label: "Hear Other", field: 'hear_about_other', numeric: false, html: false, width: 'auto'},
                    {label: "Created At", field: 'created_at', numeric: false, html: false, width: 'auto'}
                ],
                rows: []
            };
        },
        watch: {
            selectedDate: function () {
                this.filterDate(this.selectedDate);
            }
        },
        methods: {
            loadGraph: function(graph){
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
                this.$http.get(laroute.route('admin.reports.database.users', filters))
                    .then(response => {
                        this.rows = response.data.users;
                        this.loading = false;

                        if(this.showGraph === 1)
                            this.fillLineChart(this.rows);
                        if(this.showGraph === 2)
                            this.fillBarChart(this.rows);
                        if(this.showGraph === 3)
                            this.fillPieChart(this.rows);
                    })
                    .catch(e => {
                        console.error(e);
                        this.errors.push(e)
                    });
            }, onRowClick: function (row) {
                console.log(row)
            },
            fillLineChart(rows){
                let hearOptions = [
                    "LinkedIn Group", "LinkedIn Post", "LinkedIn Ad", "Instagram", "Facebook", "Twitter", "Reddit",
                    "Slack", "Ad", "Search", "Article", "Email", "Event", "Podcast", "Referral", "Other"
                ];

                let dataSets = [];

                this.roles.forEach(function (role) {
                    let arrVals = [];
                    let roleFilter = rows.filter(r => r.role == role.id);

                    hearOptions.forEach(function (e) {
                        arrVals.push(roleFilter.filter(r => r.hear_about == e).length);
                    });

                    dataSets.push({
                        label: role.role,
                        data: arrVals,
                        fill: false,
                        borderColor: role.color,
                        lineTension: 0.1
                    });
                });

                this.titleGraph = 'Hear Options';
                this.datacollection = {
                    labels: hearOptions,
                    datasets: dataSets
                }
            },
            fillBarChart(rows) {
                let hearOptions = [
                    "LinkedIn Group", "LinkedIn Post", "LinkedIn Ad", "Instagram", "Facebook", "Twitter", "Reddit",
                    "Slack", "Ad", "Search", "Article", "Email", "Event", "Podcast", "Referral", "Other"
                ];

                let dataSets = [];

                this.roles.forEach(function (role) {
                    let arrVals = [];
                    let roleFilter = rows.filter(r => r.role == role.id);

                    hearOptions.forEach(function (e) {
                        arrVals.push(roleFilter.filter(r => r.hear_about == e).length);
                    });

                    dataSets.push({
                        label: role.role,
                        data: arrVals,
                        backgroundColor: role.color
                    });
                });

                this.titleGraph = 'Hear Options';
                this.datacollection = {
                    labels: hearOptions,
                    datasets: dataSets
                }

            },
            fillPieChart(rows) {
                let rolesAgreeTos = [];

                this.roles.forEach(function (role) {
                    let roleFilter = rows.filter(r => r.role == role.id);

                    rolesAgreeTos.push(roleFilter.filter(r => r.agree_tos == 1).length);
                });

                this.titleGraph = 'Agreed Terms of Service';
                this.datacollection = {
                    "labels": ["Admin", "Journalist", "Publicists", "Disabled"],
                    "datasets": [{
                        "label": "Accepted Terms of Service",
                        "data": rolesAgreeTos,
                        "backgroundColor": ["rgb(255, 99, 132)",
                            "rgb(54, 162, 235)", "rgb(255, 205, 86)",
                            "rgb(153, 102, 255)"]
                    }
                    ]
                };

            }
        }
    }
</script>

<style lang="scss">
    .date-picker {
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
    }
</style>