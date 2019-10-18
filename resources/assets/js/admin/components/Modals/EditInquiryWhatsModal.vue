<template>
    <div id="modal-edit-whats" class="modal" :class="{open: isOpened}" v-if="inquiry.subject">
        <div class="modal-content">
            <h4>Edit What Information of this Inquiry</h4>
            <div class="row">
                <div class="col-sm-12 textarea-bullet one-line" v-for="what in whats">
                    <div class="bullet">
                        <img :src="'/img/icon-bulletnumber-' + what.key + '.svg'">
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" v-model="what.what" @keyup="validateWhat" placeholder="Describe what in a bullet here. You have 280 characters."></textarea>
                        <label>Describe what in a bullet here. You have 280 characters.</label>
                        <div class="what-counter for-textarea"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button v-on:click="trigger('no')" class="btn btn-default">CANCEL</button>
            <button v-on:click="trigger('yes')" class="btn btn-yellow" :disabled="buttonIsDisabled">SAVE CHANGES</button>
        </div>
    </div>
</template>

<script type="text/babel">
    import $ from 'jquery';
    import _ from 'lodash';
    import collect from 'collect.js';

    export default {
        mounted () {
            this.getWhats();
        },
        data () {
            return {
                isOpened: false,
                whats: [],
                buttonIsDisabled: false
            };
        },
        props: ['whatsInquiry'],
        computed: {
            inquiry: function () {
                return this.whatsInquiry;
            }
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
                if (value === 'yes') {
                    this.saveWhats();
                } else {
                    this.close();
                }
                this.$emit(value);
            },
            getWhats: function() {
                this.$http.get(laroute.route('admin.rest.inquiries.resource', { inquiry: this.inquiry.id })).then((response) => {
                    this.whats = _.map(response.data.what, function (what, index) {
                        index += 1;
                        return {key: index, what: what};
                    });
                });
            },
            saveWhats: function() {
                var whatsCollection = collect(this.whats).pluck('what');
                this.$http.put(laroute.route('admin.rest.inquiries.resource.whats-for-inquiry', {inquiry: this.inquiry.id}), {whats: whatsCollection.all()}).then((response) => {
                    this.$parent.getInquiry();
                    this.close();
                });
            },
            validateWhat: function (e) {
                let remainingCount = 280 - e.target.value.length;
                $(e.target).siblings('.what-counter').html(remainingCount);

                if (remainingCount < 0) {
                    $(e.target).siblings('.what-counter').addClass('text-danger');
                    this.buttonIsDisabled = true;
                } else {
                    $(e.target).siblings('.what-counter').removeClass('text-danger');
                    this.buttonIsDisabled = false;
                }
            }
        }
    }
</script>

<style lang="scss">
    #modal-edit-whats {
        z-index: 1003;
        max-width: 968px;
        width: 100%;
        background-color: #fff;
        top: 120px;

        padding: 24px;

        .modal-footer,
        .modal-content {
            background-color: #fff;
            padding: 0;

            .btn {
                margin: 12px;
            }
        }

        .textarea-bullet {
            .bullet {
                float: left;
                margin-top: 8px;

                img {
                    height: 44px;
                    border-radius: 0;
                }
            }
        }

        .form-group {
            margin-bottom: 10px;
            margin-left: 64px;

            textarea.form-control {
                padding: 15px 15px 12px 15px;
                border: 1px solid #fff7d6;
                border-bottom-width: 4px;
                height: 97px;
                overflow: hidden;
                background-color: #fff7d6;
                vertical-align: middle;
                color: #414745;
                font-weight: 400;

                &:focus, &:hover {
                    outline: 0;
                    box-shadow: none;
                    border: 1px solid #414745;
                    border-bottom: 4px solid #414745;
                }
            }

            label {
                font-size: 0.9rem;
            }

            .what-counter {
                float: right;
                font-size: 12px;
            }

            .text-danger {
                color: #A94442;
            }
        }

        &.open {
            display: block;
        }
    }
</style>