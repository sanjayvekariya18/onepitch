<template>
    <div class="list-items pitches upcoming" :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-show="!loading">
            <div class="table-header">
                <div class="row">
                    <div class="col title">Updated Pitches - {{ pitches.length }}</div>
                    <div class="col sorter right-align">
                        <date-range-component v-bind:pitches="pitches" @filtered-by-date="filteredPitches"></date-range-component>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col s12">
                    <datatable
                        class:tableData
                        :columns="columns"
                        :rows="rows"
                        :perPage="[10, 25, 50, 100]"
                        :defaultPerPage="10"
                        v-on:row-click="showPitch"
                    >
                        <th slot="thead-tr" style="width: 80px;">Publicist</th>
                        <th slot="thead-tr"></th>
                        <th slot="thead-tr">Pitch Detail</th>
                        <th slot="thead-tr">Date Uploaded</th>
                        <th slot="thead-tr"></th>
                        <template slot="tbody-tr" scope="props">
                        <td class="img fixpostion">
                            <div class="avatar">
                            <avatar-image-initials-component v-bind:small="true" v-bind:user="props.row"></avatar-image-initials-component>
                            </div>
                        </td>
                        <td style="padding-left: 10px !important;">{{props.row['full_name']}}</td>
                        <td>{{ props.row['subject'] }}</td>
                        <td>{{props.row['uploadedFromNow']}}</td>
                        <td class="status" :class="props.row['class']" >{{ props.row['title'] }}</td>
                        </template>
                    </datatable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DateRangeComponent from '../Partials/Form/DateRangeComponent.vue';
    import Preloader from '../Partials/PreloaderComponent.vue';
    import AvatarImageInitialsComponent from '../Partials/Page/Profile/AvatarImageInitialsComponent.vue';
    import moment from 'moment';
    import $ from 'jquery';
    import DataTable from "vue-materialize-datatable";

    export default {
        name: "ChangedPitchesComponent",
        components: {
            DateRangeComponent,
            AvatarImageInitialsComponent,
            Preloader,
            datatable: DataTable
        },
        created () {
            this.$parent.setPageTitle('Pitches');
        },
        mounted () {
            this.getPitches();
            Bus.$on('search-query-update', searchQuery => {
                // do your thing
                this.filterPitches(searchQuery);
            });
        },
        data () {
            return {
                sortOrder: null,
                pitches: [],
                clonedPitches: [],
                errors: [],
                rows:[],
                columns: [],
                loading: true
            };
        },        
        methods : {
            getPitches: function () {
                this.loading = true;
                this.$http.get(laroute.route('admin.rest.pitches.updated', {sort: 'desc'}))
                    .then(response => {
                        this.pitches = response.data;
                        this.clonedPitches = _.clone(this.pitches);
                        this.loading = false;

                        var formatted = [];
                        let i;

                        for (let i = 0; i < response.data.length; i++) {
                            formatted[i] = {
                            id: response.data[i].id,
                            full_name:
                                response.data[i].author != null
                                ? response.data[i].author.full_name
                                : "",                            
                            photo:
                                response.data[i].author != null
                                ? response.data[i].author.photo
                                : "",
                            uploadedFromNow: response.data[i].uploaded_at,
                            initials: response.data[i].author != null
                                ? response.data[i].author.initials
                                : "", 
                            subject: response.data[i].subject,
                            class: response.data[i].statusObj != null
                                ? response.data[i].statusObj.class
                                : "",
                            title: response.data[i].statusObj != null
                                ? response.data[i].statusObj.title
                                : "",    
                            };
                        }
                        this.rows = formatted;

                    }).catch(e => {
                    console.error(e);
                });
            },
            showPitchChanges : function (pitch) {
                this.$router.push({ name: 'pitches.compares', params: { pitchId: pitch.id }});
            },
            showPitch : function (pitch) {
                this.$router.push({ name: 'pitches.show', params: { pitchId: pitch.id }});
            },
            filteredPitches : function (filteredPitches) {
                $('.no-result').show();
                if (filteredPitches) {
                    this.pitches = filteredPitches;
                } else {
                    this.pitches = this.clonedPitches;
                }
            },
            sortBy : function (sortProperty, sortOrder) {
                sortOrder = (sortOrder === '' || sortOrder === 'asc') ? 'desc' : 'asc';
                _.map(this.columns, function (column) {
                    if (column.value === sortProperty) {
                        column.order = sortOrder;
                        return true;
                    }
                });
                this.sortOrder = sortOrder;
                this.pitches = _.orderBy(this.pitches, sortProperty, this.sortOrder);
            },
            filterPitches: function (searchQuery) {
                var hitMatches = [];
                if (searchQuery) {
                    if (searchQuery[1] === 'industry') {
                        hitMatches = _.filter(this.clonedPitches, function(pitch) {
                            return pitch.tags.industries.some((industry) => {
                                var industryTitle = industry.label;
                                var re = new RegExp(searchQuery[0], 'i');
                                return industryTitle.match(re);
                            });
                        });
                    } else if (searchQuery[1] === 'topic') {
                        hitMatches = _.filter(this.clonedPitches, function(pitch) {
                            return pitch.tags.topics.some((topic) => {
                                var topicTitle = topic.label;
                                var re = new RegExp(searchQuery[0], 'i');
                                return topicTitle.match(re);
                            });
                        });
                    } else if (searchQuery[1] === 'full_name') {
                        hitMatches = _.filter(this.clonedPitches, function(pitch) {
                            var re = new RegExp(searchQuery[0], 'i');
                            return pitch.author.full_name.match(re);
                        });
                    }
                    $('.no-result').show();
                    this.pitches = hitMatches;
                } else {
                    this.pitches = this.clonedPitches;
                }
            }
        }
    }
</script>

<style lang="scss" type="text/scss">
    .pitches.upcoming {

        table.table {
            th {
                cursor: pointer;

                -webkit-touch-callout: none; /* iOS Safari */
                -webkit-user-select: none; /* Safari */
                -khtml-user-select: none; /* Konqueror HTML */
                -moz-user-select: none; /* Firefox */
                -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                          supported by Chrome and Opera */
            }            
        }

        .status {
            text-align: right;
        }  
          
        .live-soon {
            font-family: Roboto, sans-serif;
            font-size: 15px;
            text-align: right;
            color: #2abf8d;
        }

        .no-result {
            text-align: center;
            font-size: 24px;
            padding: 50px;
        }

        tr.clickable .img.fixpostion {
            left: 0;
            width: 80px !important;
            padding-left: 10px;
        }

        tr.clickable .img.fixpostion .avatar {
            position: relative;
            background-color: #ffd731;
            border-radius: 50%;
            width: 48px;
            height: 48px;
        }
    }
</style>