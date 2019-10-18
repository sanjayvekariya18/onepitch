<template>
    <div id="modal-edit-topics" class="modal" :class="{open: isOpened}">
        <div class="modal-content">
            <h4>Edit Categories Assigned to this Post</h4>
            <div class="checkboxes-list">
                <ul>
                    <li v-for="(category, key) in categories">
                        <input class="filled-in" :id="'category-' + key" type="checkbox" :value="category.id" v-model="ids.items">
                        <label :for="'category-' + key">{{ category.title }}</label>
                    </li>
                </ul>
            </div>
        </div>
        <div class="modal-footer">
            <button v-on:click="trigger('no')" class="btn btn-default">CANCEL</button>
            <button v-on:click="trigger('yes')" class="btn btn-yellow">SAVE CHANGES</button>
        </div>
    </div>
</template>

<script type="text/babel">
    import $ from 'jquery';
    import collect from 'collect.js';

    export default {
        mounted () {
            this.getBlogPostCategories();
            let ind = collect(this.post.tags);
            this.ids = ind.pluck('id');
        },
        data () {
            return {
                isOpened: false,
                categories: [],
                ids: []
            };
        },
        props: ['passedPost'],
        computed: {
            post: function () {
                return this.passedPost;
            }
        },
        watch: {
            passedPitch: function () {
                let ind = collect(this.post.tags);
                this.ids = ind.pluck('id');
            }
        },
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
                    this.saveCategories();
                } else {
                    this.close();
                }
                this.$emit(value);
            },
            getBlogPostCategories: function() {
                this.$http.get(laroute.route('admin.rest.blog.resource.categories-for-post', {blogPost: this.post.id})).then((response) => {
                    this.categories = response.data;
                });
            },
            saveCategories : function() {
                this.$http.put(laroute.route('admin.rest.blog.resource.categories', {blogPost: this.post.id}), {ids: this.ids.all()}).then((response) => {
                    // this.$parent.getBlogPost();
                    this.close();
                });
            }
        }
    }
</script>

<style lang="scss">
    #modal-edit-topics {
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

            .checkboxes-list {
                ul {
                    column-count: 3;

                    li {
                        height: 48px;
                        padding: 12px 0;

                        input {

                        }
                    }
                }
            }

        }

        &.open {
            display: block;
        }
    }
</style>