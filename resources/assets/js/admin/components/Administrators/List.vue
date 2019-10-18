<template>
    <div class="list-items" :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-show="!loading">
            <div class="table-header">
                <div class="row">
                    <div class="col title">Administrators - {{ users.length }}</div>
                    <div class="col sorter right-align">
                        <button v-on:click="addingNewUser = true" class="btn btn-yellow btn-large">CREATE NEW ADMIN</button>
                    </div>
                </div>
            </div>
            <div class="table-wrapper with-header">
                <table class="table striped highlight">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th class="buttons" colspan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr-new-administrator-component v-if="addingNewUser" v-on:administrator-added="administratorAdded" v-bind:modeEditing="true"></tr-new-administrator-component>
                        <tr-new-administrator-component v-for="user in users" :key="user.id" v-on:administrator-deleting="administratorDeleting" v-bind:user="user"></tr-new-administrator-component>
                    </tbody>
                </table>
            </div>
        </div>
        <new-admin-created-modal ref="newAdminCreatedModal"></new-admin-created-modal>
        <delete-admin-modal ref="deleteAdminModal" v-on:yes="deleteUser"></delete-admin-modal>
    </div>
</template>

<script type="text/babel">

    import SelectComponent from '../Partials/Form/SelectComponent.vue';
    import TrNewAdministratorComponent from './TrNewAdministratorComponent.vue';
    import NewAdminCreatedModal from '../Modals/NewAdminCreatedModal.vue';
    import DeleteAdminModal from '../Modals/DeleteAdminModal.vue';
    import Preloader from '../Partials/PreloaderComponent.vue';

    export default {
        components: {
            SelectComponent,
            TrNewAdministratorComponent,
            NewAdminCreatedModal,
            DeleteAdminModal,
            Preloader
        },
        mounted() {
            this.$parent.setPageTitle('Administrators');
            this.getUsers();
        },
        data() {
            return {
                addingNewUser: false,
                sort: 'desc',
                users: [],
                errors: [],
                values: [
                    {title: 'Oldest First', value: 'asc'},
                    {title: 'Newest First', value: 'desc'}
                ],
                loading: true
            };
        },
        methods : {
            getUsers: function () {
                this.loading = true;
                this.$http.get(laroute.route('admin.rest.administrators.'))
                .then(response => {
                    this.users = response.data;
                    this.loading = false;
                })
                .catch(e => {
                    console.error(e);
                    this.errors.push(e)
                });
            },
            administratorAdded: function(user) {
                this.addingNewUser = false;
                this.users.unshift(user);
                this.$refs.newAdminCreatedModal.setName(user.full_name);
                this.$refs.newAdminCreatedModal.open(user.full_name);
            },
            administratorDeleting: function(user) {
                this.$refs.deleteAdminModal.setUser(user);
                this.$refs.deleteAdminModal.open();
            },
            deleteUser: function(user) {
                this.$http.delete(laroute.route('admin.rest.administrators.resource', { user: user.id })).then(() => {
                    this.users = this.users.filter(function(el) {
                        return el.id !== user.id;
                    });

                    console.log(this.users);
                });

            }
        }
    }
</script>