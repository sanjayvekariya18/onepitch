<template>
    <div class="nav-search-field">
        <input class="main-search browser-default" v-model="query" v-on:input="input" type="text" title="Search" placeholder="Search Journalists">
        <div class="dropdown">
            <select-component ref="sorter" value="full_name" v-bind:elements="values"></select-component>
        </div>
        <div v-if="results && results.length && query" class="nav-panel-results">
            <ul>
                <li v-for="result in results"><a v-on:click="showProfile(result)">{{ result.full_name }}</a></li>
            </ul>
        </div>
        <!--<div v-if="matchedIndustries && matchedIndustries.length && query" class="nav-panel-results">-->
            <!--<ul>-->
                <!--<li v-for="industry in matchedIndustries"><a v-on:click="selectIndustry(industry)">{{ industry }}</a></li>-->
            <!--</ul>-->
        <!--</div>-->
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
        mounted() {
            this.$parent.setPageTitle('Journalists');
            this.getIndustries();
        },
        data() {
            return {
                query: '',
                results: [],
                industries: [],
                // matchedIndustries: [],
                errors: [],
                values: [
                    {title: 'Industry', value: 'industry'},
                    {title: 'Company', value: 'company'},
                    {title: 'Name', value: 'full_name'}
                ]
            };
        },
        methods : {
            input: function (event) {
                var inputValue = $(event.target).siblings('div').find('input').val();
                if (this.query !== '' && inputValue === 'Name') {
                    this.$http.get(laroute.route('admin.rest.journalists.search', {'query': this.query}))
                        .then(response => {
                            this.results = response.data;
                        })
                        .catch(e => {
                            this.errors.push(e)
                        });
                } else if (this.query !== '' && inputValue === 'Industry') {
                    // var searchQuery = new RegExp(this.query, 'i');
                    // this.matchedIndustries = this.industries.filter(function(industry) {
                    //     return industry.match(searchQuery);
                    // });
                    var searchParams = [this.query, this.$refs.sorter.val()];
                    Bus.$emit('search-query-update', searchParams);
                    this.results = [];
                } else if (this.query !== '' && inputValue === 'Company') {
                    var searchParams = [this.query, this.$refs.sorter.val()];
                    Bus.$emit('search-query-update', searchParams);
                    this.results = [];
                } else {
                    Bus.$emit('search-query-update', null);
                    this.results = [];
                }

            },
            showProfile: function(user) {
                this.$router.push({ name: 'journalists.show', params: { userId: user.id } });
                this.query = '';
            },
            getIndustries: function () {
                this.$http.get(laroute.route('admin.rest.industries.', {'query': this.query}))
                    .then(response => {
                        this.industries = collect(response.data).pluck('title').all();
                    })
                    .catch(e => {
                        this.errors.push(e)
                    });
            },
            selectIndustry: function (industry) {
                this.query = industry;
                this.matchedIndustries = [];
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