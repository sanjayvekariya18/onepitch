<template>
    <div class="list-items pitches pitches-new" :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-show="!loading">
            <div class="table-header">
                <div class="row">
                    <div class="col title">Needs review - {{ pitches.length }}</div>
                    <div class="col sorter right-align">
                        <date-range-component v-bind:pitches="pitches" @filtered-by-date="filteredPitches"></date-range-component>
                    </div>
                </div>
            </div>


      <datatable
        class:tableData    
        :columns="columns"   
        :rows="rows"
        :perPage="[10, 25, 50, 100]"
        :defaultPerPage="10"   
      >

<th  slot="thead-tr" style="width: 80px;">Publicist</th> 
<th slot="thead-tr"> </th>
<th slot="thead-tr"> Pitch Detail </th>
<th slot="thead-tr"> Date Uploaded </th>
<th slot="thead-tr"> </th>
        <template slot="tbody-tr" scope="props">

             <td class="img fixpostion"> 
              <div class="avatar">
                <avatar-image-initials-component v-bind:small="true" v-bind:user="props.row">
                 </avatar-image-initials-component>
             </div>
             </td>

            <td style="padding-left: 10px !important;">
              {{props.row['full_name']}}            
            </td> 
            <td>
                  <div class="subject">{{ props.row['subject'] }}</div>
                  <div class="topics">{{ props.row['topicsText'] }}</div>
            </td>
            <td> {{props.row['uploadedFromNow']}} </td> 
            <td class="buttons">
                            <button class="btn btn-yellow btn-large btn-width-160" @click="showPitch(props.row)">REVIEW</button>                           
            </td>
        </template> 

      </datatable>
          
               
                
        </div>
    </div>
</template>

<script type="text/babel">
    import $ from 'jquery';
    import DateRangeComponent from '../Partials/Form/DateRangeComponent.vue';
    import Preloader from '../Partials/PreloaderComponent.vue';
    import AvatarImageInitialsComponent from '../Partials/Page/Profile/AvatarImageInitialsComponent.vue';
    import DataTable from "vue-materialize-datatable";

    export default {
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
                loading: true, 
                rows: [],
                 columns: [                   
                   
                ]
                
            };
        },
        methods : {
            getPitches: function () {
                this.loading = true;
                this.$http.get(laroute.route('admin.rest.pitches.new', {sort: 'desc'}))
                    .then(response => {

                        var formatted = [];
                        let i;
                        for (let i = 0; i < response.data.length; i++) {
                            formatted[i] = {
                            id: response.data[i]["id"],
                            full_name: response.data[i].author.full_name,                           
                            hear_about: response.data[i].author.hear_about,
                            photo:  response.data[i].author.photo,
                            uploadedFromNow: response.data[i]["uploadedFromNow"],
                            initials: response.data[i].author.initials,
                            subject: response.data[i]["subject"],
                            topicsText: response.data[i]["topicsText"],
                            
                            };
                        }

                          this.rows = formatted;
                        this.pitches = response.data;
                        this.clonedPitches = _.clone(this.pitches);
                        this.loading = false;
                    }).catch(e => {
                        console.error(e);
                });
            },
            showPitch : function (row) {
                this.$router.push({ name: 'pitches.show', params: { pitchId: row.id }});
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
    .pitches.pitches-new {

        .table-wrapper {
            padding: 0 30px 0 35px;

            table.table.table-pitches-new {
                thead {
                    tr {
                        th {
                            cursor: pointer;

                            -webkit-touch-callout: none; /* iOS Safari */
                            -webkit-user-select: none; /* Safari */
                            -khtml-user-select: none; /* Konqueror HTML */
                            -moz-user-select: none; /* Firefox */
                            -ms-user-select: none; /* Internet Explorer/Edge */
                            user-select: none; /* Non-prefixed version, currently
                                          supported by Chrome and Opera */

                            &:first-child {
                                padding-left: 0;
                            }
                        }
                    }
                }
                tbody {
                    tr {
                        border-bottom: solid 1px #ffd831;
                        height: 74px;

                        &:hover {
                            cursor: default;
                        }

                    }
                    td {
                        &:first-child {
                            padding-left: 0;
                        }

                        .name {
                            font-family: Roboto, sans-serif;
                            font-size: 15px;
                            line-height: 1.2;
                            text-align: left;
                            color: #414745;
                            margin-bottom: 9px;
                        }

                        .date {
                            font-family: Roboto, sans-serif;
                            font-size: 12px;
                            text-align: left;
                            color: #9b9b9b;
                        }

                        .subject {
                            font-family: Roboto, sans-serif;
                            font-size: 15px;
                            line-height: 1.2;
                            text-align: left;
                            color: #414745;
                            margin-bottom: 8px;
                        }

                        .topics {
                            font-family: Roboto, sans-serif;
                            font-size: 12px;
                            font-style: italic;
                            line-height: 1.25;
                            text-align: left;
                            color: #414745;
                        }

                    }
                }
            }

            .no-result {
                display: none;
                text-align: center;
                font-size: 24px;
                padding: 50px;
            }


            
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