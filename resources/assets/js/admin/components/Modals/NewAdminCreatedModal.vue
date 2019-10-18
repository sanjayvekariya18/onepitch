<template>
    <div id="modal-accept-pitch" class="modal" :class="{open: isOpened}">
        <div class="modal-content">
            <h4>New Admin Created</h4>
            <p>{{ name }} is now an admin.</p>
        </div>
        <div class="modal-footer">
            <button v-on:click="close" class="btn btn-yellow btn-large">OKAY</button>
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
            name: '',
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
            setName: function(name) {
                this.name = name;
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