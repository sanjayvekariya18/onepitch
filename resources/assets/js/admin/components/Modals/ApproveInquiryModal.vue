<template>
    <div id="modal-accept-inquiry" class="modal" :class="{open: isOpened}">
        <div class="modal-content">
            <h4>Accept Inquiry</h4>
            <p>Are you sure you want to accept this inquiry? This inquiry will be placed in Upcoming Inquiries and be published with the next batch of inquiries.</p>
        </div>
        <div class="modal-footer">
            <button v-on:click="trigger('no')" class="btn btn-default btn-large">CANCEL</button>
            <button v-on:click="trigger('yes')" class="btn btn-yellow btn-large">ACCEPT INQUIRY</button>
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
                errors: []
            };
        },
        methods: {
            open: function () {
                this.clearData();
                $('.modal-overlay').css({display: 'block'});
                this.isOpened = true;
            },
            close: function () {
                $('.modal-overlay').css({display: 'none'});
                this.isOpened = false;
            },
            trigger: function (value) {
                if (this.newMail === this.newMailConfirm) {
                    this.$emit(value, this.newMailConfirm);
                    this.close();
                } else {
                    this.errors.push('Email addresses must match.');
                }
            },
            clearData: function () {
                this.newMail = '';
                this.newMailConfirm = '';
                this.errors = [];
            }
        }
    }
</script>

<style lang="scss">
    #modal-accept-inquiry {
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