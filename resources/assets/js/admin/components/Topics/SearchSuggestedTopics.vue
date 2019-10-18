<template>
    <div class="nav-search-field">
        <input class="main-search browser-default" v-model="query" v-on:input="input" type="text" title="Search" placeholder="Search Suggested Topics">
        <div v-if="results && results.length && query" class="nav-panel-results">
            <ul>
                <li v-for="result in results"><a>{{ result.title }}</a></li>
            </ul>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                query: '',
                results: [],
                errors: []
            };
        },
        methods : {
            input: function (event) {
                if (this.query !== '') {
                    this.$http.get(laroute.route('admin.rest.topics.search', {'query': this.query}))
                        .then(response => {
                            this.results = response.data;
                        })
                        .catch(e => {
                            this.errors.push(e)
                        });
                } else {
                    this.results = [];
                }

            }
        }
    }
</script>