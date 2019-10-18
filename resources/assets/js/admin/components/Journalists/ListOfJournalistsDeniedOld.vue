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
            <div class="table-wrapper with-header">
                <table class="table highlight striped clickable">
                    <thead>
                    <tr>
                        <th v-for="column in columns" :class="column.action" :colspan="column.extra" v-on:click="sortBy(column.value, column.order)">
                            {{ column.name }}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="user in users" v-on:click="showProfile(user)">
                        <td class="img">
                            <div class="avatar">
                                <avatar-image-initials-component v-bind:small="true" v-bind:user="user"></avatar-image-initials-component>
                            </div>
                        </td>
                        <td>{{ user.full_name }}</td>
                        <td>{{ user.company }}</td>
                        <td>{{ user.hear_about }}</td>
                        <td class="buttons purpley-grey">{{ user.whenJoining }}</td>
                        <td class="buttons">
                            <button v-on:click.stop="approveUserModal(user)" class="btn btn-yellow btn-large btn-width-96">APPROVE</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="no-declined-result" v-if="users.length < 1">Sorry, no result found...</div>
            </div>
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

    export default {
        components: {
            ApproveJournalistModal,
            DateRangeComponent,
            AvatarImageInitialsComponent,
            Preloader
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
                columns: [
                    {name: 'Journalist', value: 'full_name', order: '', extra: '2', class: ''},
                    {name: 'Company', value: 'company', order: '', extra: '*', class: ''},
                    {name: 'Hear About', value: 'hear_about', order: '', extra: '', class: ''},
                    {name: 'Date Added', value: 'created_at.date', order: '', extra: '*', class: ''},
                    {name: 'Action', value: '', order: '', extra: '', class: 'actions'}
                ],
                loading: true
            };
        },
        methods : {
            getUsers: function () {
                this.loading = true;
                this.$http.get(laroute.route('admin.rest.journalists.denied', {sort: 'desc'}))
                    .then(response => {
                        this.users = response.data;
                        this.clonedUsers = _.clone(this.users);
                        this.loading = false;
                    })
                    .catch(e => {
                        console.error(e);
                        this.errors.push(e)
                    });
            },
            showProfile: function (user) {
                this.$router.push({name: 'journalists.show', params: {userId: user.id}});
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
            approveUserModal: function (user) {
                this.$refs.approveJournalistModal.open(user);
            },
            approveUser: function (obj) {
                obj.user.approved = true;
                this.$http.put(laroute.route('admin.rest.journalists.resource', {user: obj.user.id}), {user: obj.user})
                    .then(response => {
                        this.users = this.users.filter(function (el) {
                            return el.approved === 0;
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
    }
</style>