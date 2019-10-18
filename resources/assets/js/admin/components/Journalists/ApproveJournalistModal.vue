<template>
    <div id="modal-approve-journalist" class="modal" :class="{open: isOpened}">
        <div class="modal-content">
            <h4>Approve Journalist?</h4>
            <p>After approving this journalist, please send them an email notifying them their account has now been approved.</p>
        </div>
        <div class="modal-footer">
            <button v-on:click="trigger('no')" class="btn btn-default">CANCEL</button>
            <button v-on:click="trigger('yes')" class="btn btn-yellow">YES, APPROVE</button>
        </div>
    </div>
</template>

<script type="text/babel">
    import $ from 'jquery';

    export default {
        data () {
            return {
                user: {},
                isOpened: false
            };
        },
        methods: {
            open: function (user) {
                this.user = user;
                $('.modal-overlay').css({display: 'block'});
                this.isOpened = true;
            },
            close: function () {
                $('.modal-overlay').css({display: 'none'});
                this.isOpened = false;
            },
            trigger: function (value) {
                this.close();
                this.$emit(value, {user: this.user});
            }
        }
    }
</script>

<style lang="scss">
    #modal-approve-journalist {
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