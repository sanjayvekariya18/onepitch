<template>
    <div class="login-information left-side-block">
        <h4>Login Information</h4>
        <ul>
            <li class="email">
                {{ user.email }} <button v-on:click="showModalEditEmail"><i class="material-icons md-14">edit</i></button>
            </li>
        </ul>
        <edit-email-modal ref="modalEmail" v-on:edited="editEmail"></edit-email-modal>
    </div>
</template>

<script type="text/babel">
    import EditEmailModal from '../../../Modals/EditEmailModal.vue';

    export default {
        components: {
            EditEmailModal
        },
        props: ['user'],
        methods: {
            showModalEditEmail: function () {
                this.$refs.modalEmail.open();
            },
            editEmail: function (newEmail) {
                this.user.email = newEmail;
                this.$parent.saveProfile();
            },
        }
    }
</script>

<style lang="scss">
    .login-information {
        li.email {
            position: relative;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-right: 16px;

            button {
                position: absolute;
                right: 0;
                top: 4px;
            }
        }
    }
</style>