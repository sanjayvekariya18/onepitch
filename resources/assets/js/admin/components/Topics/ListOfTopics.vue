<template>
    <div class="list-items topics" :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-show="!loading">
            <div class="table-header">
                <div class="row">
                    <div class="col title">Topics - {{ topics.length }}</div>
                    <div class="col sorter right-align">
                        <date-range-component v-bind:topics="topics" @filtered-by-date="filteredTopics"></date-range-component>
                    </div>
                </div>
            </div>
            <div class="table-wrapper with-header">
                <table class="table striped">
                    <thead>
                    <tr>
                        <th v-for="column in columns" :colspan="column.extra" v-on:click="sortBy(column.value, column.order)">
                            {{ column.name }}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="topic in topics" v-on:click="showEditTopicModal(topic)">
                        <td>{{ topic.title }}</td>
                        <td>{{ topic.description }}</td>
                        <td class="buttons purpley-grey">{{ topic.isCustom }}</td>
                        <td class="buttons purpley-grey">{{ topic.whenCreated }}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="no-result" v-if="topics.length < 1">Sorry, no result found...</div>
            </div>
            <div class="add-topic-button" v-on:click="showAddTopicModal"><i class="material-icons">add_circle</i></div>
            <add-topic-modal ref="addTopicModal"></add-topic-modal>
            <edit-topic-modal v-bind:topic="topic" ref="editTopicModal"></edit-topic-modal>
        </div>
    </div>
</template>

<script type="text/babel">
    import AddTopicModal from './AddTopicModal.vue';
    import EditTopicModal from './EditTopicModal.vue';
    import DateRangeComponent from '../Partials/Form/DateRangeComponent.vue';
    import AvatarImageInitialsComponent from '../Partials/Page/Profile/AvatarImageInitialsComponent.vue';
    import Preloader from '../Partials/PreloaderComponent.vue';

    export default {
        components: {
            AddTopicModal,
            EditTopicModal,
            DateRangeComponent,
            AvatarImageInitialsComponent,
            Preloader
        },
        created () {
            this.$parent.setPageTitle('Topics');
        },
        mounted() {
            this.getTopics();
        },
        data() {
            return {
                sortOrder: null,
                topic: {},
                topics: [],
                clonedTopics: [],
                errors: [],
                columns: [
                    {name: 'Title', value: 'title', order: ''},
                    {name: 'Description', value: 'description', order: ''},
                    {name: 'Custom', value: 'isCustom', order: ''},
                    {name: 'Date Added', value: 'created_at', order: ''}
                ],
                loading: true
            };
        },
        methods : {
            getTopics: function () {
                this.loading = true;
                this.$http.get(laroute.route('admin.rest.topics.admin', {sort: 'desc'}))
                    .then(response => {
                        this.topics = response.data;
                        this.loading = false;
                    })
                    .catch(e => {
                        console.error(e);
                        this.errors.push(e)
                    });
            },
            filteredTopics : function (filteredTopics) {
                if (filteredTopics) {
                    this.clonedTopics = _.clone(this.topics);
                    this.topics = filteredTopics;
                } else {
                    this.topics = this.clonedTopics;
                    this.clonedTopics = [];
                }
            },
            sortBy : function (sortProperty, sortOrder) {
                sortOrder = (sortOrder === '' || sortOrder === 'asc') ? 'desc' : 'asc';
                _.map(this.columns, function (column) {
                    if (column.value === sortProperty) {
                        column.order = sortOrder;
                        return true;
                    }
                });
                this.sortOrder = sortOrder;
                this.topics = _.orderBy(this.topics, sortProperty, this.sortOrder);
            },
            showAddTopicModal: function() {
                this.$refs.addTopicModal.open();
            },
            showEditTopicModal: function(topic) {
                this.topic = topic;
                this.$refs.editTopicModal.open();
            }
        }
    }
</script>

<style lang="scss">
    .list-items.topics {
        table.table {
            tbody {
                tr {
                    cursor: pointer;

                    td:last-child {
                        text-align: left;
                    }
                }
            }
        }

        .add-topic-button {
            position: absolute;
            right: 3%;
            bottom: 2%;
            color:#DB4437;
            cursor: pointer;

            .material-icons {
                font-size:56px;
            }
        }

        .no-result {
            display: block;
            text-align: center;
            font-size: 24px;
            padding: 50px;
        }
    }
</style>