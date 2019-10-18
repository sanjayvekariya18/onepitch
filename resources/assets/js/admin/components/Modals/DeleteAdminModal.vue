<template>
    <div id="modal-accept-pitch" class="modal" :class="{open: isOpened}">
        <div class="modal-content">
            <h4>Delete Admin?</h4>
            <p>{{ user.name }} will be deleted as an administrator.</p>
        </div>
        <div class="modal-footer">
            <button v-on:click="trigger('no')" class="btn btn-white btn-large">CANCEL</button>
            <button v-on:click="trigger('yes')" class="btn btn-yellow btn-large">YES, DELETE</button>
        </div>
    </div>
</template>

<script type="text/babel">
    import $ from 'jquery';

    export default {
        data () {
            return {
            isOpened: false,
            newMail: '',
            newMailConfirm: '',
            user: {},
            errors: []
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
            trigger: function(type) {
                this.$emit(type, this.user);
                this.close();
            },
            setUser: function(user) {
                this.user = user;
            }
        }
    }
</script>

<style lang="scss">
    #modal-accept-pitch {
        z-index: 1003;
        width: 560px;
        background-color: #fff;

        padding: 24px;

        &.open {
            display: block;
            top: 240px;
        }
    }
</style>