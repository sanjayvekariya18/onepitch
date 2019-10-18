<template>
    <div id="modal-edit-topics" class="modal" :class="{open: isOpened}" v-if="pitch.topics">
        <div class="modal-content">
            <h4>Edit Topics Assigned to this Pitch</h4>
            <div class="checkboxes-list">
                <ul>
                    <li v-for="(topic, key) in topics">
                        <input class="filled-in" :id="'topic-' + key" type="checkbox" :value="topic.id" v-model="ids.items">
                        <label :for="'topic-' + key">{{ topic.title }}</label>
                    </li>
                </ul>
            </div>
        </div>
        <div class="modal-footer">
            <button v-on:click="trigger('no')" class="btn btn-default">CANCEL</button>
            <button v-on:click="trigger('yes')" class="btn btn-yellow">SAVE CHANGES</button>
        </div>
    </div>
</template>

<script type="text/babel">
    import $ from 'jquery';
    import collect from 'collect.js';

    export default {
        mounted () {
            this.getTopics();
            let ind = collect(this.pitch.topics);
            this.ids = ind.pluck('id');
        },
        data () {
            return {
                isOpened: false,
                topics: [],
                ids: []
            };
        },
        props: ['passedPitch'],
        computed: {
            pitch: function () {
                return this.passedPitch;
            }
        },
        watch: {
            passedPitch: function () {
                let ind = collect(this.pitch.topics);
                this.ids = ind.pluck('id');
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
                    this.saveTopics();
                } else {
                    this.close();
                }
                this.$emit(value);
            },
            getTopics: function() {
                this.$http.get(laroute.route('admin.rest.pitches.resource.topics-for-pitch', { pitch: this.pitch.id })).then((response) => {
                    this.topics = response.data;
                });
            },
            saveTopics : function() {
                this.$http.put(laroute.route('admin.rest.pitches.resource.topics', {pitch: this.pitch.id}), {ids: this.ids.all()}).then((response) => {
                    this.$parent.getPitch();
                    this.close();
                });
            }
        }
    }
</script>

<style lang="scss">
    #modal-edit-topics {
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

            .checkboxes-list {
                ul {
                    column-count: 3;

                    li {
                        height: 48px;
                        padding: 12px 0;

                        input {

                        }
                    }
                }
            }

        }

        &.open {
            display: block;
        }
    }
</style>