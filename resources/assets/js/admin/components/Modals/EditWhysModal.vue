<template>
    <div id="modal-edit-whys" class="modal" :class="{open: isOpened}" v-if="pitch.subject">
        <div class="modal-content">
            <h4>Edit Whys Information of this Pitch</h4>
            <div class="row">
                <div class="col-sm-12 textarea-bullet one-line" v-for="why in whys">
                    <div class="bullet">
                        <img :src="'/img/icon-bulletnumber-' + why.key + '.svg'">
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" v-model="why.why" @keyup="validateWhy" placeholder="Describe why in a bullet here. You have 280 characters."></textarea>
                        <label>Describe why in a bullet here. You have 280 characters.</label>
                        <div class="why-counter for-textarea"></div>
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
            this.getWhys();
        },
        data () {
            return {
                isOpened: false,
                whys: [],
                buttonIsDisabled: false
            };
        },
        props: ['whysPitch'],
        computed: {
            pitch: function () {
                return this.whysPitch;
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
                    this.saveWhys();
                } else {
                    this.close();
                }
                this.$emit(value);
            },
            getWhys: function() {
                this.$http.get(laroute.route('admin.rest.pitches.resource', { pitch: this.pitch.id })).then((response) => {
                    this.whys = _.map(response.data.why, function (why, index) {
                        index += 1;
                        return {key: index, why: why};
                    });
                    if (this.whys.length < 3) {
                        for (var i = this.whys.length; i < 3; i++) {
                            this.whys.push({key: i+1, why: ''});
                        }
                    }
                });
            },
            saveWhys: function() {
                var whysCollection = collect(this.whys).pluck('why');
                this.$http.put(laroute.route('admin.rest.pitches.resource.whys-for-pitch', {pitch: this.pitch.id}), {whys: whysCollection.all()}).then((response) => {
                    this.$parent.getPitch();
                    this.close();
                });
            },
            validateWhy: function (e) {
                let remainingCount = 280 - e.target.value.length;
                $(e.target).siblings('.why-counter').html(remainingCount);

                if (remainingCount < 0) {
                    $(e.target).siblings('.why-counter').addClass('text-danger');
                    this.buttonIsDisabled = true;
                } else {
                    $(e.target).siblings('.why-counter').removeClass('text-danger');
                    this.buttonIsDisabled = false;
                }
            }
        }
    }
</script>

<style lang="scss">
    #modal-edit-whys {
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

            .why-counter {
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