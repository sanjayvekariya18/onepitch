<template>
    <div class="date-picker">
        <v-date-picker
                class='picker'
                mode='range'
                v-model='selectedDate'
                is-expanded>
        </v-date-picker>
        <div class="cancel-button" v-if="selectedDate" @click='selectedDate = null'>
            Clear
        </div>
    </div>

</template>

<script>
    import _ from 'lodash';
    import collect from 'collect.js';

    export default {
        data() {
            return {
                selectedDate: null,
                filteredResults: []
            };
        },
        props: ['users', 'publicists', 'journalists', 'pitches', 'topics', 'industries', 'publishedPitches'],
        watch: {
            selectedDate: function () {
                this.filterDate(this.selectedDate);
            }
        },
        methods: {
            filterDate: function(dateRange) {
                if (dateRange) {
                    var startDate = new Date(dateRange.start);
                    var endDate = new Date(dateRange.end);
                    var hitDateMatches = null;

                    if (this.users) {
                        hitDateMatches = _.filter(this.users, function(user) {
                            var date = new Date(user.created_at.date);
                            return date >= startDate && date <= endDate
                        });
                        this.$emit('filtered-by-date', hitDateMatches);
                    } else if (this.publicists) {
                        console.log(this.$parent.$refs.sorter.val());
                        this.loading = true;
                        this.$http.get(laroute.route('admin.rest.publicists.filtered', {sort: 'desc', startDate: this.formatDate(startDate), endDate: this.formatDate(endDate), column: this.$parent.$refs.sorter.val()}))
                            .then((response) => {
                                this.$emit('filtered-by-date', response.data);
                                this.loading = false;
                            })
                            .catch((e) => {
                                    console.error(e);
                                this.errors.push(e)
                            });
                    } else if (this.journalists) {
                        this.loading = true;
                        this.$http.get(laroute.route('admin.rest.journalists.filtered', {sort: 'desc', startDate: this.formatDate(startDate), endDate: this.formatDate(endDate), column: this.$parent.$refs.sorter.val()}))
                            .then((response) => {
                                this.$emit('filtered-by-date', response.data);
                                this.loading = false;
                            })
                            .catch((e) => {
                                    console.error(e);
                                this.errors.push(e)
                            });
                    } else if (this.pitches) {
                        hitDateMatches = _.filter(this.pitches, function(pitch) {
                            var date = new Date(pitch.uploaded_at);
                            return date >= startDate && date <= endDate
                        });
                        this.$emit('filtered-by-date', hitDateMatches);
                    } else if (this.publishedPitches) {
                        this.loading = true;
                        this.$http.get(laroute.route('admin.rest.pitches.filtered', {sort: 'desc', startDate: this.formatDate(startDate), endDate: this.formatDate(endDate)}))
                            .then((response) => {
                                this.$emit('filtered-by-date', response.data);
                                this.loading = false;
                            })
                            .catch((e) => {
                                    console.error(e);
                                this.errors.push(e)
                            });
                    } else if (this.topics) {
                        hitDateMatches = _.filter(this.topics, function(topic) {
                            var date = new Date(topic.created_at);
                            return date >= startDate && date <= endDate
                        });
                        this.$emit('filtered-by-date', hitDateMatches);
                    } else if (this.industries) {
                        hitDateMatches = _.filter(this.industries, function(industry) {
                            var date = new Date(industry.created_at);
                            return date >= startDate && date <= endDate
                        });
                        this.$emit('filtered-by-date', hitDateMatches);
                    }
                } else {
                    this.$emit('filtered-by-date', null);
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
            }
        }
    };
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