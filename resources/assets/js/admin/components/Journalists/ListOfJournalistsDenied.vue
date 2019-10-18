<template>
    <div class="list-items" :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-show="!loading">
            <div class="table-header">
                <div class="row">
                    <div class="col title">Denied Journalists - {{ users.length }}</div>
                    <div class="col sorter right-align">
                        <date-range-component v-bind:users="users" @filtered-by-date="filteredUsers"></date-range-component>
                    </div>
                </div>
            </div>
              

               <datatable
        class:tableData
        :columns="columns"
        :rows="rows"
        :perPage="[10, 25, 50, 100]"
        :defaultPerPage="10"
        v-on:row-click="showProfile"

      >

<th  slot="thead-tr">Actions</th>
 
        <template slot="tbody-tr" scope="props">
          <td>
            <button
              class="btn btn-yellow btn-large btn-width-96"
              @click.stop="e => approveUserModal(props.row, e)"
            >APPROVE</button>   
            </td> 

            <td class="img fixpostion"> 
              <div class="avatar">
                <avatar-image-initials-component v-bind:small="true" v-bind:user="props.row">
                 </avatar-image-initials-component>
             </div>
             </td> 
        </template> 

      </datatable>

        </div>
        <approve-journalist-modal v-on:yes="approveUser" ref="approveJournalistModal"></approve-journalist-modal>
    </div>
</template>

<script type="text/babel">
    import $ from 'jquery';
    import ApproveJournalistModal from './ApproveJournalistModal.vue';
    import DateRangeComponent from '../Partials/Form/DateRangeComponent.vue';
    import Preloader from '../Partials/PreloaderComponent.vue';
    import AvatarImageInitialsComponent from '../Partials/Page/Profile/AvatarImageInitialsComponent.vue';
    import _ from 'lodash';
    import DataTable from "vue-materialize-datatable";

    export default {
        components: {
            ApproveJournalistModal,
            DateRangeComponent,
            AvatarImageInitialsComponent,
            Preloader,
            datatable: DataTable
        },
        created () {
            this.$parent.setPageTitle('Journalists');
        },
        mounted() {
            this.$parent.setPageTitle('Journalists');
            this.getUsers();
            Bus.$on('search-query-update', searchQuery => {
                // do your thing
                this.filterJournalists(searchQuery);
            });
        },
        data() {
            return {
                sortOrder: null,
                users: [],
                clonedUsers: [],
                errors: [],               
                loading: true,
              

                onClick: function(e) {}, // Click handler
                clickable: true,  
                
                rows: [],
                columns: [
                    {
                    id: 2,
                    label: "Journalist",
                    field: "full_name",
                    numeric: true,
                    html: true,
                    width: "auto"
                    },
                    {
                    id: 3,
                    label: "Company",
                    field: "company",
                    numeric: false,
                    html: false,
                    width: "auto"
                    },
                    {
                    id: 4,
                    label: "Hear About",
                    field: "hear_about",
                    numeric: false,
                    html: false,
                    width: "auto"
                    },
                    {
                    id: 5,
                    label: "Date Added",
                    field: "whenJoining",
                    numeric: false,
                    html: false,
                    width: "auto"
                    }
                ]
            };
        },
        methods : {
            getUsers: function () {
                this.loading = true;
                this.$http.get(laroute.route('admin.rest.journalists.denied', {sort: 'desc'}))
                    .then(response => {

                                        var formatted = [];
                        let i;
                        for (let i = 0; i < response.data.length; i++) {
                            formatted[i] = {
                            id: response.data[i]["id"],
                            full_name: response.data[i]["full_name"],
                            company: response.data[i]["company"],
                            hear_about: response.data[i]["hear_about"],
                            photo:  response.data[i]["photo"],
                            whenJoining: response.data[i]["whenJoining"],
                            initials: response.data[i]["initials"]
                            };
                        }

     

                        this.rows = formatted;
                        this.users = response.data;
                        this.clonedUsers = _.clone(this.users);
                        this.loading = false;
                    })
                    .catch(e => {
                        console.error(e);
                        this.errors.push(e)
                    });
            },
            showProfile: function (row) {
                this.$router.push({name: 'journalists.show', params: {userId: row.id}});
            },
            filteredUsers : function (filteredUsers) {
                $('.no-declined-result').show();
                if (filteredUsers) {
                    this.users = filteredUsers;
                } else {
                    this.users = this.clonedUsers;
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
                this.users = _.orderBy(this.users, sortProperty, this.sortOrder);
            },
            approveUserModal: function (row) {
                this.$refs.approveJournalistModal.open(row);
            },
            approveUser: function (obj) {
                obj.user.approved = true;
                this.$http.put(laroute.route('admin.rest.journalists.resource', {user: obj.user.id}), {user: obj.user})
                    .then(response => {
                        this.rows = this.rows.filter(function (el) {
                            console.log(el.approved)
                            return el.approved != true;
                        });
                    })
                    .catch(e => {
                        console.error(e);
                        this.errors.push(e)
                    });
            },
            filterJournalists: function (searchQuery) {
                var hitMatches = [];
                if (searchQuery) {
                    if (searchQuery[1] === 'industry') {
                        hitMatches = _.filter(this.clonedUsers, function(user) {
                            return user.industries.some((industry) => {
                                var industryTitle = industry.title;
                                var re = new RegExp(searchQuery[0], 'i');
                                return industryTitle.match(re);
                            });
                        });
                    } else if (searchQuery[1] === 'company') {
                        hitMatches = _.filter(this.clonedUsers, function(user) {
                            var re = new RegExp(searchQuery[0], 'i');
                            return user.company.match(re);
                        });
                    }
                    $('.no-declined-result').show();
                    this.users = hitMatches;
                } else {
                    this.users = this.clonedUsers;
                }
            }
        }
    }
</script>

<style lang="scss">
    .list-items {
        .table-wrapper {
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

        .no-declined-result {
            display: none;
            text-align: center;
            font-size: 24px;
            padding: 50px;
        }

        tr.clickable .img.fixpostion {
      position: absolute;
      left: 0;
      width: 150px;
      padding-left: 10px;
      border: none;
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