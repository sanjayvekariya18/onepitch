<template>
    <div id="modal-deny-journalist" class="modal" :class="{open: isOpened}">
        <div class="modal-content">
            <h4>Deny Journalist?</h4>
            <p>This journalist will have not recieve the OnePitch emails. Please send them an email notifying them why they have been denied access to OnePitch.</p>
        </div>
        <div class="modal-footer">
            <button v-on:click="trigger('no')" class="btn btn-default">CANCEL</button>
            <button v-on:click="trigger('yes')" class="btn btn-yellow">YES, DENY</button>
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
    #modal-deny-journalist {
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