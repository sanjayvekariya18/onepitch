<template>
    <div class="nav-search-field">
        <input class="main-search browser-default" v-model="query" v-on:input="input" type="text" title="Search" placeholder="Search Administrators">
        <div v-if="results && results.length && query" class="nav-panel-results">
            <ul>
                <li v-for="result in results" v-on:click="setName(result)"><a>{{ result.full_name }}</a></li>
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
                    this.$http.get(laroute.route('admin.rest.administrators.search', {'query': this.query}))
                        .then(response => {
                            this.results = response.data;
                        })
                        .catch(e => {
                            this.errors.push(e)
                        });
                } else {
                    this.results = [];
                }

            },
            setName: function(user) {
                this.query = user.full_name;
            }
        }
    }
</script>