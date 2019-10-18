<template>
    <div id="modal-edit-event" class="modal" :class="{open: isOpened}" v-if="pitch.subject">
        <div class="modal-content">
            <h4>Edit Event Information of this Pitch</h4>
            <div class="row">
                <div class="form-group col-sm-12">
                    <input type="text" class="form-control" name="title" placeholder="Deadline Title"
                           v-model="event.title" required><br>
                    <label>Events/Embargo Title</label>
                    <div class="title-counter" v-bind:class="{'text-danger': hasError }">{{ remainingCount }}</div>
                </div>

                <div class="form-group col-sm-6 half">
                    <input type="text" class="form-control" name="date_from" placeholder="Start Date"
                           v-model="event.date_from" required><br>
                    <label>Start Date</label>
                </div>

                <div class="form-group col-sm-6 half">
                    <input type="text" class="form-control" name="date_to" placeholder="End Date"
                           v-model="event.date_to" required><br>
                    <label>End Date</label>
                </div>

                <div class="form-group col-sm-6 half">
                    <input type="text" class="form-control" name="time_from" placeholder="Start Time"
                           v-model="event.time_from" required><br>
                    <label>Start Time</label>
                </div>

                <div class="form-group col-sm-6 half">
                    <input type="text" class="form-control" name="time_to" placeholder="End Time"
                           v-model="event.time_to" required><br>
                    <label>End Time</label>
                </div>

                <!--<div class="form-group col-sm-12">-->
                    <!--<div class="dropdown">-->
                        <!--<select-component ref="sorter" v-bind:value="event.timezone" v-bind:elements="values"></select-component>-->
                    <!--</div>-->
                    <!--<label>Which user created this Blog Post.</label>-->
                    <!--<div class="for-textarea"></div>-->
                <!--</div>-->

                <!--<div class="form-group col-sm-6 half">-->
                    <!--<input type="text" class="form-control" name="timezone" placeholder="Timezone"-->
                           <!--v-model="event.timezone" required><br>-->
                    <!--<label>Timezone</label>-->
                <!--</div>-->
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
    import collect from 'collect.js';
    // import SelectComponent from '../Partials/Form/SelectComponent.vue';

    export default {
        components: {
            // SelectComponent
        },
        mounted () {
            this.getEvent();
        },
        data () {
            return {
                isOpened: false,
                event: [],
                remainingCount: '',
                hasError: false,
                buttonIsDisabled: false,
                values: [
                    {title: 'Select Time Zone', value: ''},
                    {title: 'Eastern Standard Time', value: 'EST'},
                    {title: 'Central Standard Time', value: 'CST'},
                    {title: 'Mountain Standard Time', value: 'MST'},
                    {title: 'Pacific Standard Time', value: 'PST'},
                    {title: 'Alaskan Standard Time', value: 'AKST'},
                    {title: 'Hawaiin-Aleutian Standard Time', value: 'HST'}
                ]
            };
        },
        props: ['eventPitch'],
        computed: {
            pitch: function () {
                return this.eventPitch;
            }
        },
        watch: {
            'event.title': function () {
                this.validateTitle();
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
                    this.saveEvent();
                } else {
                    this.close();
                }
                this.$emit(value);
            },
            getEvent: function() {
                this.$http.get(laroute.route('admin.rest.pitches.resource', { pitch: this.pitch.id })).then((response) => {
                    this.event = response.data.event;
                });
            },
            saveEvent : function() {
                // console.log(this.$refs.sorter.val());
                var eventCollection = collect([this.event.title, this.event.date_from, this.event.date_to, this.event.time_from, this.event.time_to, this.event.timezone]);
                this.$http.put(laroute.route('admin.rest.pitches.resource.event-for-pitch', {pitch: this.pitch.id}), {event: eventCollection.all()}).then((response) => {
                    this.$parent.getPitch();
                    this.close();
                });
            },
            validateTitle: function () {
                this.remainingCount = 40 - this.event.title.length;
                this.hasError = this.remainingCount < 0;
                this.buttonIsDisabled = this.remainingCount < 0;
            }
        }
    }
</script>

<style lang="scss">
    #modal-edit-event {
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

        .form-group {
            margin-bottom: 10px;

            &.half {
                input {
                    width: 40%;
                }
            }

            input {
                padding: 0 15px;
                width: 80%;
                margin: 0;
                border: 1px solid #fff7d6;
                border-bottom-width: 4px;
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

            .title-counter {
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