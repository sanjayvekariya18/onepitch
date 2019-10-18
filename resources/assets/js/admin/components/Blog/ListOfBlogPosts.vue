<template>
    <div class="list-items blog-post" :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-show="!loading">
            <div class="table-header">
                <div class="row">
                    <div class="col title">Posts - {{ posts.length }}</div>
                    <!--<div class="col sorter right-align">-->
                        <!--<date-range-component v-bind:industries="industries" @filtered-by-date="filteredIndustries"></date-range-component>-->
                    <!--</div>-->
                </div>
            </div>
            <div class="table-wrapper with-header">
                <table class="table striped">
                    <thead>
                    <tr>
                        <th v-for="column in columns" :colspan="column.extra">
                            {{ column.name }}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="post in posts" v-on:click="showBlogPost(post)">
                        <td class="img">
                            <div class="avatar" v-if="post.author">
                                <avatar-image-initials-component v-bind:small="true" v-bind:user="post.author"></avatar-image-initials-component>
                            </div>
                        </td>
                        <td>{{ (post.author) ? post.author.full_name : '' }}</td>
                        <td>{{ post.title }}</td>
                        <td>{{ post.excerpt }}</td>
                        <td><span v-for="(category, key) in post.tags"><span v-if="key">,</span> {{ category.title }}</span></td>
                        <td class="buttons purpley-grey">{{ post.createdFromNow }}</td>
                        <td class="buttons purpley-grey">{{ post.publishedFromNow }}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="no-result" v-if="posts.length < 1">Sorry, no result found...</div>
            </div>
            <div class="add-post-button" v-on:click="showAddBlogPostModal"><i class="material-icons">add_circle</i></div>
            <add-blog-post-modal ref="addBlogPostModal"></add-blog-post-modal>
        </div>
    </div>
</template>

<script type="text/babel">
    import DateRangeComponent from '../Partials/Form/DateRangeComponent.vue';
    import AvatarImageInitialsComponent from '../Partials/Page/Profile/AvatarImageInitialsComponent.vue';
    import Preloader from '../Partials/PreloaderComponent.vue';
    import AddBlogPostModal from './AddBlogPostModal.vue';

    export default {
        components: {
            DateRangeComponent,
            AvatarImageInitialsComponent,
            Preloader,
            AddBlogPostModal
        },
        created () {
            this.$parent.setPageTitle('Blog Post');
        },
        mounted() {
            this.getBlogPosts();
        },
        data() {
            return {
                sortOrder: null,
                // industry: {},
                posts: [],
                // clonedIndustries: [],
                errors: [],
                columns: [
                    {name: 'Author', value: 'full_name', order: '', extra: '2'},
                    {name: 'Title', value: 'title', order: ''},
                    {name: 'Excerpt', value: 'excerpt', order: ''},
                    {name: 'Tags', value: '', order: ''},
                    {name: 'Date Added', value: 'created_at', order: ''},
                    {name: 'Date Published', value: 'published_at', order: ''}
                ],
                loading: true
            };
        },
        methods : {
            getBlogPosts: function () {
                this.loading = true;
                this.$http.get(laroute.route('admin.rest.blog.', {sort: 'desc'}))
                    .then(response => {
                        this.posts = response.data;
                        this.loading = false;
                    })
                    .catch(e => {
                        console.error(e);
                        this.errors.push(e)
                    });
            },
            showBlogPost: function (post) {
                this.$router.push({name: 'blog.post.show', params: {blogPostId: post.id}});
            },
            showAddBlogPostModal: function() {
                this.$refs.addBlogPostModal.open();
            },
            createBlogPost: function () {
                this.$router.push({name: 'blog.post.create'});
            },
        }
    }
</script>

<style lang="scss">
    .blog-post {
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

        .add-post-button {
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