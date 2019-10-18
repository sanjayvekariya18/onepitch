<template>
    <div class="blog-post show-item">
        <preloader-component v-if="loading"></preloader-component>
        <div class="content show-item-content" v-show="!loading">
            <left-side>
                <div v-if="postData.status === 1">
                    <button class="btn btn-white btn-large" v-on:click="togglePublish(0)">UNPUBLISH</button>
                </div>
                <div v-else>
                    <button class="btn btn-yellow btn-large" v-on:click="togglePublish(1)">PUBLISH</button>
                </div>
                <div style="padding-top: 10px" v-show="postData.status !== 1">
                    <button class="btn btn-yellow btn-large" v-on:click="scheduleDate()" :disabled="!selectedDate">
                        {{postData.status === 3 ? 'RESCHEDULE' : 'SCHEDULE'}}
                    </button>
                </div>

                <div class="date-picker">
                    <h6>Publish Date</h6>

                    <v-date-picker
                            mode='single'
                            class='picker'
                            v-model='selectedDate'>
                    </v-date-picker>
                </div>

                <div class="featured-image-section" style="margin-top:60px">
                    <h6>Featured Image</h6>
                    <img class="featured-image" :src="postData.featured_image" alt="No image">

                    <button class="btn btn-yellow btn-large" v-on:click="showEditBlogPostFeaturedImageModal">
                        Add Featured Image
                    </button>
                    <edit-blog-post-featured-image v-on:yes="getBlogPost" v-bind:featuredPostImage="postData"
                                                   ref="editBlogPostFeaturedImageModal">
                    </edit-blog-post-featured-image>
                </div>
                <div class="tag-section" v-if="postData.tags">
                    <tags-component v-on:edit="showEditBlogPostCategoriesModal" v-bind:editable="true">
                            <span slot="title">
                                Categories
                            </span>
                    </tags-component>
                    <edit-blog-post-categories-modal v-on:yes="getBlogPost" v-bind:passedPost="postData"
                                                     ref="editBlogPostCategoriesModal">
                    </edit-blog-post-categories-modal>
                    <span v-for="(category, key) in postData.tags">
                        <span v-if="key">,</span> {{ category.title }}
                    </span>
                </div>
                <div class="author-section" v-if="postData.author">
                    <h6>Author</h6>
                    {{postData.author.full_name}}
                    <button class="btn btn-yellow btn-large" v-on:click="showEditBlogPostAuthorModal">
                        Change Author
                    </button>
                    <edit-blog-post-author-modal v-on:yes="getBlogPost" v-bind:authorPostData="postData"
                                                 ref="editBlogPostAuthorModal"></edit-blog-post-author-modal>
                </div>
            </left-side>
            <div class="right-side">
                <div class="header-side">

                </div>
                <div class="body-side">
                    <h4>Edit Blog Post</h4>
                    <div class="form-group">
                        <h6>Title:</h6>
                        <input type="text"
                               id="title"
                               class="form-control"
                               v-model="postData.title"
                               maxlength="280"
                               style="width: 85%"
                        /><br>
                        <h6>Excerpt:</h6>
                        <input type="text"
                               id="excerpt"
                               class="form-control"
                               v-model="postData.excerpt"
                               maxlength="80"
                               style="width: 70%"/><br>


                        <span v-show="postData.status === 3">
                            <i>Scheduled to publish date</i>
                        </span>
                        <tags-component v-on:edit="showEditBlogPostLinkModal" v-bind:editable="true">
                            <span slot="title">
                                Permalink: <a target="_blank"
                                              :href="'/blog/' + postData.link">/blog/{{ postData.link }}</a>
                            </span>
                        </tags-component>
                        <edit-blog-post-link-modal v-on:yes="getBlogPost" v-bind:postData="postData"
                                                   ref="editBlogPostLinkModal"></edit-blog-post-link-modal>
                        <br>
                        <mark-down-component v-model="postData.content"></mark-down-component>
                    </div>
                </div>

                <button v-on:click="editBlogPost()" class="btn btn-yellow save">SAVE CHANGES</button>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
    import LeftSide from '../Partials/Page/Profile/LeftSide.vue'
    import AvatarImageInitialsComponent from '../Partials/Page/Profile/AvatarImageInitialsComponent.vue'
    import PreloaderComponent from '../Partials/PreloaderComponent.vue'
    import MarkDownComponent from '../Partials/Form/MarkDownComponent.vue'
    import EditBlogPostLinkModal from '../Modals/EditBlogPostLinkModal.vue'
    import EditBlogPostAuthorModal from '../Modals/EditBlogPostAuthorModal.vue'
    import EditBlogPostFeaturedImage from '../Modals/EditBlogPostFeaturedImage.vue'
    import EditBlogPostCategoriesModal from '../Modals/EditBlogPostCategoriesModal.vue'
    import TagsComponent from '../Pitches/show/TagsComponent.vue'

    export default {
        components: {
            LeftSide,
            AvatarImageInitialsComponent,
            PreloaderComponent,
            MarkDownComponent,
            EditBlogPostLinkModal,
            EditBlogPostFeaturedImage,
            EditBlogPostCategoriesModal,
            EditBlogPostAuthorModal,
            TagsComponent
        },
        created() {
            this.getBlogPost()
        },
        props: ['blogPostId'],
        data() {
            return {
                postData: {},
                file: '',
                errors: [],
                loading: true,
                selectedDate: null,
                featuredImage: null,
            }
        },
        methods: {
            formatDate: function (date) {
                let d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear()

                if (month.length < 2) month = '0' + month
                if (day.length < 2) day = '0' + day

                return [year, month, day].join('-')
            },
            scheduleDate: function () {
                this.postData.status = 3;
                this.editBlogPost();
            },
            getBlogPost: function () {
                this.loading = true
                this.$http.get(laroute.route('admin.rest.blog.resource', {blogPost: this.$route.params.blogPostId}))
                    .then((response) => {
                        this.postData = response.data

                        if (this.postData.published_at != null && this.postData.published_at !== '') {
                            this.selectedDate = new Date(this.postData.published_at);
                        }

                        this.$parent.setPageTitle(this.postData.title)
                        this.loading = false
                    })
                    .catch((e) => {
                        console.error(e)
                        this.errors.push(e)
                    })
            },
            editBlogPost: function () {
                this.loading = true
                if (this.selectedDate != null && this.selectedDate !== '') {
                    this.postData.published_at = this.formatDate(this.selectedDate);
                }

                this.$http.put(laroute.route('admin.rest.blog.resource', {blogPost: this.postData.id}), this.postData)
                    .then((response) => {
                        this.loading = false
                    }).catch((e) => {
                    this.errors = e.response.data
                })
            },
            togglePublish: function (status) {
                this.loading = true
                this.$http.put(laroute.route('admin.rest.blog.resource.status', {blogPost: this.postData.id}), {status: status}).then((response) => {
                    this.getBlogPost()
                    this.loading = false
                })
            },
            editLink: function () {
                this.loading = true
                this.$http.put(laroute.route('admin.rest.blog.resource.status', {blogPost: this.postData.id}), {link: this.postData.link}).then((response) => {
                    this.getBlogPost()
                    this.loading = false
                })
            },
            showEditBlogPostLinkModal: function () {
                this.$refs.editBlogPostLinkModal.open()
            },
            showEditBlogPostCategoriesModal: function () {
                this.$refs.editBlogPostCategoriesModal.open()
            },
            showEditBlogPostAuthorModal: function () {
                this.$refs.editBlogPostAuthorModal.open()
            },
            showEditBlogPostFeaturedImageModal: function () {
                this.$refs.editBlogPostFeaturedImageModal.open()
            }
        }
    }
</script>

<style lang="scss">
    .blog-post {
        .content {
            display: flex;
        }

        .tags-component-edit {
            vertical-align: middle;
            margin-left: 8px;
            width: 24px;
            height: 24px;
            border: none;
            background: none;

            .material-icons {
                font-size: 15px;
            }
        }

        .left-side-profile {
            /*width: 315px;*/
            /*padding: 10px;*/

            .featured-image-section, .image-section, .tag-section, .author-section {
                margin: 30px 0;

                .btn {
                    margin-top: 10px;
                }
            }

            .delete-image {
                background: #c9302c;
                font-size: 10px;
                border-radius: 50%;
                float: right;
                color: #fff;
            }

            .inputfile, .inputfeaturedfile {
                width: 0.1px;
                height: 0.1px;
                opacity: 0;
                overflow: hidden;
                position: absolute;
                z-index: -1;
            }

            .inputfeaturedfile + label {
                padding-top: 6px;
            }

            .inputfile + label {
                padding-top: 13px;
            }

            h6, .tags-component.editable h3 {
                font-weight: 500;
                font-size: 16px;
            }

            .btn-large {
                width: 100%;
            }

            img {
                border-radius: 0;
            }

            .featured-image {
                width: 100%;
                height: auto;
            }
        }

        .right-side {
            display: flex;
            flex-direction: column;

            .body-side {
                padding: 0 25px;

                #title, #excerpt {
                    border-radius: 4px;
                    padding: 0 10px;
                    border: 1px solid #ddd;
                    width: 50%;
                }
            }

            .tags-component.editable {
                h3 {
                    font-size: 15px;
                }
            }

            .save {
                margin: 0 25px 25px 25px;
            }
        }

        .date-picker {
            padding-top: 7px;

            .picker {
                min-width: 180px !important;
                z-index: 1;
                position: absolute
            }

            input {
                height: 2rem !important;
            }
        }

        .wrapper main section {
            overflow-y: visible;
        }
    }
</style>