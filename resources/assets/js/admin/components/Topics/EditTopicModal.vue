<template>
    <div id="modal-add-topic" class="modal" :class="{open: isOpened}">
        <div class="modal-content">
            <h4>Edit A Topic</h4>
            <div class="row">
                <div class="form-group col-sm-12">
                    <input type="text" class="form-control" name="title" v-model="topic.title" placeholder="What is the name of the Topic" required>
                    <label>What is the name of the Topic</label>
                    <div class="counter"></div>
                </div>

                <div class="form-group col-sm-12">
                    <textarea class="form-control" name="description" v-model="topic.description" placeholder="Describe what the Topic is"></textarea>
                    <label>Describe what the Topic is.</label>
                    <div class="for-textarea"></div>
                </div>

                <input type="hidden" v-model="topic.id">
            </div>
        </div>
        <div class="modal-footer">
            <button v-on:click="trigger('del')" class="btn btn-danger">DELETE TOPIC</button>
            <button v-on:click="trigger('no')" class="btn btn-default">CANCEL</button>
            <button v-on:click="trigger('yes')" class="btn btn-yellow">SAVE CHANGES</button>
        </div>
    </div>
</template>

<script type="text/babel">
    import $ from 'jquery';

    export default {
        data () {
            return {
                isOpened: false
            };
        },
        props: ['topic'],
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
                    this.editTopic();
                } else if (value === 'del') {
                    this.deleteTopic();
                } else {
                    this.close();
                }
            },
            editTopic: function () {
                this.$http.put(laroute.route('admin.rest.topics.resource', { topic: this.topic.id }), this.topic )
                    .then((response) => {
                        this.$parent.getTopics();
                        this.close();
                    }).catch((e) => {
                    this.errors = e.response.data;
                });
            },
            deleteTopic: function () {
                this.$http.delete(laroute.route('admin.rest.topics.resource', { topic: this.topic.id }))
                    .then((response) => {
                        this.$parent.getTopics();
                        this.close();
                    }).catch((e) => {
                    this.errors = e.response.data;
                });
            }
        }
    }
</script>

<style lang="scss">
    #modal-add-topic {
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

            .btn-danger {
                background-color: #c9302c;
                float: left;
            }
        }

        .form-group {
            margin-bottom: 10px;

            input {
                padding: 0 15px;
                width: 96%;
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
        }

        &.open {
            display: block;
        }
    }
</style>