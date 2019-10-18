<template>
    <div id="modal-edit-summary" class="modal" :class="{open: isOpened}" v-if="pitch.subject">
        <div class="modal-content">
            <h4>Edit Summary Information of this Pitch</h4>
            <div class="row">
                <div class="form-group col-sm-12">
                    <input type="text" class="form-control" name="subject" placeholder="Think of this as your subject line. You only have 40 characters - grab attention and make it compelling!"
                           v-model="summary.subject" required>
                    <label>Think of this as your subject line. You only have 40 characters - grab attention and make it compelling!</label>
                    <div class="subject-counter" v-bind:class="{'text-danger': hasError }">{{ remainingCount }}</div>
                </div>

                <div class="form-group col-sm-6">
                    <input type="text" class="form-control" name="company" placeholder="What brand are you pitching for?"
                           v-model="summary.company" required>
                    <label>What brand are you pitching for?</label>
                </div>

                <div class="form-group col-sm-12">
                    <input type="url" class="form-control" name="website" placeholder="Add a link here."
                           v-model="summary.website">
                    <label>Add a link here.</label>
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
    import collect from 'collect.js';

    export default {
        mounted () {
            this.getSummary();
        },
        data () {
            return {
                isOpened: false,
                summary: [],
                remainingCount: '',
                hasError: false,
                buttonIsDisabled: false
            };
        },
        props: ['summaryPitch'],
        computed: {
            pitch: function () {
                return this.summaryPitch;
            }
        },
        watch: {
            'summary.subject': function () {
                this.validateSubject();
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
                    this.saveSummary();
                } else {
                    this.close();
                }
                this.$emit(value);
            },
            getSummary: function() {
                this.$http.get(laroute.route('admin.rest.pitches.resource', { pitch: this.pitch.id })).then((response) => {
                    this.summary = response.data;
                });
            },
            saveSummary : function() {
                var summariesCollection = collect([this.summary.subject, this.summary.company, this.summary.website]);
                this.$http.put(laroute.route('admin.rest.pitches.resource.summary-for-pitch', {pitch: this.pitch.id}), {summaries: summariesCollection.all()}).then((response) => {
                    this.$parent.getPitch();
                    this.close();
                });
            },
            validateSubject: function () {
                this.remainingCount = 40 - this.summary.subject.length;
                this.hasError = this.remainingCount < 0;
                this.buttonIsDisabled = this.remainingCount < 0;
            }
        }
    }
</script>

<style lang="scss">
    #modal-edit-summary {
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

            input {
                margin: 0;
            }

            label {
                font-size: 0.9rem;
            }
            
            .subject-counter {
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