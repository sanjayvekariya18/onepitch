<template>
    <div class="list-items inquiries upcoming" :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-show="!loading">
            <div class="table-header">
                <div class="row">
                    <div class="col title">Upcoming Inquiries - {{ inquiries.length }}</div>
                    <div class="col sorter right-align">
                        <date-range-component v-bind:inquiries="inquiries" @filtered-by-date="filteredInquiries"></date-range-component>
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
                    >
                    <th  slot="thead-tr" style="width: 80px;">Journalist</th> 
                    <th slot="thead-tr"> </th>
                    <th slot="thead-tr"> Inquiry Details </th>
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
                        <td class="status" :class="props.row['class']">{{props.row['title']}}</td>
                    </template> 
                </datatable>
              </div>
            </div>  
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
            this.$parent.setPageTitle('Inquiries');
        },
        mounted () {
            this.getInquiries();
            Bus.$on('search-query-update', searchQuery => {
                // do your thing
                this.filterInquiries(searchQuery);
            });
        },
        data () {
            return {
                sortOrder: null,
                inquiries: [],
                clonedInquiries: [],
                errors: [],
                columns: [                
                ],
                loading: true
            };
        },
        methods : {
            getInquiries: function () {
                this.loading = true;
                this.$http.get(laroute.route('admin.rest.inquiries.upcoming', {sort: 'desc'}))
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
                                title: response.data[i].statusObj.title,
                                class: response.data[i].statusObj.class                           
                            };
                        }                         
                        this.rows = formatted;
                        this.inquiries = response.data;
                        this.clonedInquiries = _.clone(this.inquiries);
                        this.loading = false;
                    }).catch(e => {
                    console.error(e);
                });
            },
            showInquiry : function (inquiry) {
                this.$router.push({ name: 'inquiries.show', params: { inquiryId: inquiry.id }});
            },
            filteredInquiries : function (filteredInquiries) {
                $('.no-result').show();
                if (filteredInquiries) {
                    this.inquiries = filteredInquiries;
                } else {
                    this.inquiries = this.clonedInquiries;
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
                this.inquiries = _.orderBy(this.inquiries, sortProperty, this.sortOrder);
            },
            filterInquiries: function (searchQuery) {
                var hitMatches = [];
                if (searchQuery) {
                    if (searchQuery[1] === 'industry') {
                        hitMatches = _.filter(this.clonedInquiries, function(inquiry) {
                            return inquiry.tags.industries.some((industry) => {
                                var industryTitle = industry.label;
                                var re = new RegExp(searchQuery[0], 'i');
                                return industryTitle.match(re);
                            });
                        });
                    } else if (searchQuery[1] === 'topic') {
                        hitMatches = _.filter(this.clonedInquiries, function(inquiry) {
                            return inquiry.tags.topics.some((topic) => {
                                var topicTitle = topic.label;
                                var re = new RegExp(searchQuery[0], 'i');
                                return topicTitle.match(re);
                            });
                        });
                    } else if (searchQuery[1] === 'full_name') {
                        hitMatches = _.filter(this.clonedInquiries, function(inquiry) {
                            var re = new RegExp(searchQuery[0], 'i');
                            return inquiry.author.full_name.match(re);
                        });
                    }
                    $('.no-result').show();
                    this.inquiries = hitMatches;
                } else {
                    this.inquiries = this.clonedInquiries;
                }
            }
        }
    }
</script>

<style lang="scss" type="text/scss">
    .inquiries.upcoming {

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