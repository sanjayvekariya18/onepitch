<template>
    <div class="nav-search-field">
        <input class="inquiry-search browser-default" v-model="query" v-on:input="input" title="Search" placeholder="Search Inquiries">
        <div class="inquiry-search-dropdown">
            <select-component ref="sorter" value="subject" v-bind:elements="values"></select-component>
        </div>
        <div v-if="results && results.length && query" class="nav-panel-results">
            <ul>
                <li v-for="result in results" v-on:click="showInquiry(result)"><a :href="result.url">{{ result.subject }}</a></li>
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
                    {title: 'Journalist', value: 'full_name'},
                    {title: 'Industry', value: 'industry'},
                    {title: 'Topic', value: 'topic'},
                    {title: 'Subject', value: 'subject'}
                ]
            };
        },
        methods : {
            input: function (event) {
                var inputValue = $(event.target).siblings('div').find('input').val();
                if (this.query !== '' && inputValue === 'Subject') {
                    this.$http.get(laroute.route('admin.rest.inquiries.search', {'query': this.query}))
                        .then(response => {
                            this.results = response.data;
                        })
                        .catch(e => {
                            this.errors.push(e)
                        });
                } else if (this.query !== '' && inputValue) {
                    var searchParams = [this.query, this.$refs.sorter.val()];
                    Bus.$emit('search-query-update', searchParams);
                    this.results = [];
                } else {
                    Bus.$emit('search-query-update', null);
                    this.results = [];
                }
            },
            showInquiry: function (inquiry) {
                this.$router.push({ name: 'inquiries.show', params: { inquiryId: inquiry.id } });
                this.query = '';
            }
        }
    }
</script>

<style lang="scss">
    .nav-search-field {
        .inquiry-search {background: url(/images/icon-search-yellow.png?cde8646…) 12px 12px no-repeat;
            height: 48px;
            width: 386px;
            top: 8px;
            background-color: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 2px;
            max-width: 386px;
            margin-top: 8px;
            font-family: Roboto, sans-serif;
            font-size: 15px;
            text-align: left;
            color: #ffffff;
            padding: 0 200px 0 54px;
            outline: 0;

            &:focus {
                border-bottom: 0 !important;
                box-shadow: none !important;
            }
        }

        .inquiry-search-dropdown {
            margin-top: -68px;
            margin-left: 450px;
            height: 48px;
        }
    }
</style>