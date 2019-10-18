<template>
    <div class="reset-password">
        <a href="#reset-password" v-on:click.prevent="showModalResetPassword">Reset Password</a>
        <reset-password-modal id="reset-password" ref="modalPassword" v-on:yes="needResetPassword"></reset-password-modal>
    </div>
</template>

<script type="text/babel">
    import ResetPasswordModal from '../../../Modals/ResetPasswordModal.vue';

    export default {
        components: {
            ResetPasswordModal
        },
        props: ['user'],
        methods: {
            showModalResetPassword: function () {
                this.$refs.modalPassword.open();
            },
            needResetPassword: function () {
                this.$http.put(laroute.route('admin.rest.users.resource.resetPassword', {user: this.user.id}))
                .catch((e) => {
                    console.error(e);
                });
            },
        }
    }
</script>