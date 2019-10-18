<template>
    <div class="nav-search-field">
        <input class="main-search browser-default" v-model="query" v-on:input="input" type="text" title="Search" placeholder="Search Publicists">
        <div class="dropdown">
            <select-component ref="sorter" value="full_name" v-bind:elements="values"></select-component>
        </div>
        <div v-if="results && results.length && query" class="nav-panel-results">
            <ul>
                <li v-for="result in results"><a v-on:click="showProfile(result)">{{ result.full_name }}</a></li>
            </ul>
        </div>
    </div>
</template>

<script type="text/babel">
    import $ from 'jquery';
    import collect from 'collect.js';
    import SelectComponent from '../Partials/Form/SelectComponent.vue';
    export default {
        components: {
            SelectComponent
        },
        data() {
            return {
                query: '',
                results: [],
                errors: [],
                values: [
                    {title: 'Company', value: 'company'},
                    {title: 'Name', value: 'full_name'}
                ]
            };
        },
        methods : {
            input: function (event) {
                var inputValue = $(event.target).siblings('div').find('input').val();
                if (this.query !== '' && inputValue === 'Name') {
                    this.$http.get(laroute.route('admin.rest.publicists.search', {'query': this.query}))
                        .then(response => {
                            this.results = response.data;
                        })
                        .catch(e => {
                            this.errors.push(e)
                        });
                } else if (this.query !== '' && inputValue === 'Company') {
                    var searchParams = [this.query, this.$refs.sorter.val()];
                    Bus.$emit('search-query-update', searchParams);
                    this.results = [];
                } else {
                    Bus.$emit('search-query-update', null);
                    this.results = [];
                }
            },
            showProfile: function (user) {
                this.$router.push({ name: 'publicists.show', params: { userId: user.id } });
                this.query = '';
            }
        }
    }
</script>

<style lang="scss">
    .nav-search-field {
        .dropdown {
            margin-top: -48px;
            margin-left: 450px;
            height: 48px;
        }
    }
</style>