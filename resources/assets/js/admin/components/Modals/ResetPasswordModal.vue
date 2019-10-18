<template>
    <div id="modal-edit-pass" class="modal" :class="{open: isOpened}">
        <div class="modal-content">
            <h4>Reset Password?</h4>
            <p>User will receive an email with a link to reset their password.</p>
        </div>
        <div class="modal-footer">
            <button v-on:click="trigger('no')" class="btn btn-default">CANCEL</button>
            <button v-on:click="trigger('yes')" class="btn btn-yellow">SEND LINK</button>
        </div>
    </div>
</template>

<script type="text/babel">
    import $ from 'jquery';

    export default {
        data () {
            return {
                isOpened: false
            };
        },
        methods: {
            open: function () {
                $('.modal-overlay').css({display: 'block'});
                this.isOpened = true;
            },
            close: function () {
                $('.modal-overlay').css({display: 'none'});
                this.isOpened = false;
            },
            trigger: function (value) {
                this.close();
                this.$emit(value);
            }
        }
    }
</script>

<style lang="scss">
    #reset-password {
        z-index: 1003;
        width: 560px;
        background-color: #fff;

        padding: 24px;

        .modal-footer,
        .modal-content {
            background-color: #fff;
            padding: 0;

            .btn {
                margin: 12px;
            }
        }

        &.open {
            display: block;
            top: 240px;
        }
    }
</style>