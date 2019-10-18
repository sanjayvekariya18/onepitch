<template>
    <div class="list-items">
        <div class="table-header">
            <div class="row">
                <div class="col title">Suggested Topics - {{ topics.length }}</div>
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
                <tr v-for="topic in topics">
                    <td class="img">
                        <div class="avatar">
                            <avatar-image-initials-component v-bind:small="true" v-bind:user="topic.author"></avatar-image-initials-component>
                        </div>
                    </td>
                    <td class="name">{{ topic.author.full_name }}</td>
                    <td class="topic">{{ topic.topic.title }}
                    <td class="buttons purpley-grey">{{ topic.whenCreated }}</td>
                </tr>
                </tbody>
            </table>
            <div class="no-result" v-if="topics.length < 1">Sorry, no result found...</div>
        </div>
    </div>
</template>

<script type="text/babel">

    import DateRangeComponent from '../Partials/Form/DateRangeComponent.vue';
    import AvatarImageInitialsComponent from '../Partials/Page/Profile/AvatarImageInitialsComponent.vue';

    export default {
        components: {
            DateRangeComponent,
            AvatarImageInitialsComponent
        },
        created () {
            this.$parent.setPageTitle('Suggested Topics');
        },
        mounted() {
            this.getTopics();
        },
        data() {
            return {
                sortOrder: null,
                topics: [],
                clonedTopics: [],
                errors: [],
                columns: [
                    {name: 'Publicist', value: 'author.full_name', order: '', extra: '2'},
                    {name: 'Suggested Topic', value: 'topic.title', order: '', extra: '*'},
                    {name: 'Date Added', value: 'created_at', order: '', extra: '*'}
                ],
            };
        },
        methods : {
            getTopics: function () {
                this.$http.get(laroute.route('admin.rest.pitches.new-topic', {sort: 'desc'}))
                .then(response => {
                    this.topics = response.data;
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
            }
        }
    }
</script>

<style lang="scss">
    .list-items {

        .no-result {
            display: block;
            text-align: center;
            font-size: 24px;
            padding: 50px;
        }
    }
</style>