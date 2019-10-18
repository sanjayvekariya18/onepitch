<template>
    <div class="list-items pitches upcoming" :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-show="!loading">
            <div class="table-header">
                <div class="row">
                    <div class="col title">Upcoming Pitches - {{ pitches.length }}</div>
                    <!-- <div class="col sorter right-align">
                        <date-range-component v-bind:pitches="pitches" @filtered-by-date="filteredPitches"></date-range-component>
                    </div> -->
                </div>
            </div>
          

        <datatable
        class:tableData    
        :columns="columns"   
        :rows="rows"
        :perPage="[10, 25, 50, 100]"
        :defaultPerPage="10" 
        v-on:row-click="showPitch"  
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
            <td>{{ props.row['subject'] }} </td>          
            <td> {{props.row['uploadedFromNow']}} </td> 
            <td class="status" :class="props.row['class']">{{props.row['title']}}</td>
        </template> 

      </datatable>
        </div>
    </div>
</template>

<script type="text/babel">
    import DateRangeComponent from '../Partials/Form/DateRangeComponent.vue';
    import AvatarImageInitialsComponent from '../Partials/Page/Profile/AvatarImageInitialsComponent.vue';
    import Preloader from '../Partials/PreloaderComponent.vue';
    import $ from 'jquery';
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
                   rows: [],
                columns: [ ],
                loading: true
            };
        },
        methods : {
            getPitches: function () {
                this.loading = true;
                this.$http.get(laroute.route('admin.rest.pitches.upcoming', {sort: 'desc'}))
                    .then(response => {
                        var formatted = [];
                        let i;
                        for (let i = 0; i < response.data.length; i++) {
                            formatted[i] = {
                            id: response.data[i]["id"],
                            full_name: response.data[i].author.full_name,                           
                            hear_about: response.data[i].author.photohear_about,
                            photo:  response.data[i].author.photo,
                            uploadedFromNow: response.data[i]["uploadedFromNow"],
                            initials: response.data[i].author.initials,
                            subject: response.data[i]["subject"],
                            topicsText: response.data[i]["topicsText"],
                            title: response.data[i].statusObj.title,
                            class: response.data[i].statusObj.class,
                           
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
            td {

                &.status {
                    text-align: right;

                    &.live-soon {
                        font-family: Roboto, sans-serif;
                        font-size: 15px;
                        text-align: right;
                        color: #2abf8d;
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

  td.status.live-soon {
    font-family: Roboto, sans-serif;
    font-size: 15px;
    text-align: right;
    color: #2abf8d;
}
    }
</style>