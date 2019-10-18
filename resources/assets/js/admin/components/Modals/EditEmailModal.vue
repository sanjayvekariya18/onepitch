<template>
    <div id="modal-edit-email" class="modal" :class="{open: isOpened}">
        <div class="modal-content">
            <h4>New Email</h4>
            <div :class="{'invalid' : errors.length > 0}" class="input-field">
                <input type="email" v-model="newMail" class="validation" title="Enter New Email" placeholder="Enter New Email">
            </div>
            <div class="errors" v-show="errors.length > 0">{{ errors[0] }}</div>
            <div class="input-field">
                <input type="email" v-model="newMailConfirm" title="Confirm New Email" placeholder="Confirm New Email">
            </div>
        </div>
        <div class="modal-footer">
            <button v-on:click="trigger('no')" class="btn btn-default">CANCEL</button>
            <button v-on:click="trigger('edited')" class="btn btn-yellow">UPDATE</button>
        </div>
    </div>
</template>

<script>
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
    #modal-edit-email {
        width: 560px;
        background-color: #fff;
        padding: 24px;
        height: 390px;

        h4 {
            font-family: Roboto, sans-serif;
            font-size: 34px;
            text-align: left;
            color: #414745;
        }

        .modal-footer,
        .modal-content {
            background-color: #fff;
            padding: 0;

            .errors {
                color: #ff465d;
                font-family: Roboto, sans-serif;
                font-size: 16px;
            }

            .input-field {
                margin-bottom: 51px;

                &.invalid {
                    margin-bottom: 13px;
                }

                input {
                    background-color: #fff7d6;
                    height: 64px;
                    padding: 18px 16px 22px;
                    border: none;
                    box-sizing: border-box;
                    font-family: Roboto, sans-serif;
                    font-size: 16px;
                    line-height: 1.5;
                    text-align: left;
                    color: #9b9b9b;
                    margin: 0;

                    &:focus {
                        border: none;
                        box-shadow: none;
                    }
                }
            }

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