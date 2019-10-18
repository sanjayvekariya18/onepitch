<template>
    <div id="modal-add-post" class="modal" :class="{open: isOpened}">
        <div class="modal-content">
            <h4>Add New Blog Post</h4>
            <div class="row">
                <div class="form-group col-sm-12">
                    <input type="text" class="form-control" @keyup="validatePostTitle" name="title" v-model="post.title" placeholder="What is the title of the Blog Post." required>
                    <label>What is the title of the Blog Post.</label>
                    <div class="counter"></div>
                </div>

                <div class="form-group col-sm-12">
                    <textarea class="form-control" @keyup="validatePostExcerpt" name="excerpt" v-model="post.excerpt" placeholder="What is the excerpt for the Blog Post."></textarea>
                    <label>What is the excerpt for the Blog Post.</label>
                    <div class="counter"></div>
                </div>

                <div class="form-group col-sm-12">
                    <input type="text" class="form-control" @keyup="validateForm" name="title" v-model="post.link" placeholder="What is the public link to the Blog Post." required>
                    <label>What is the public link to the Blog Post.</label>
                </div>

                <div class="form-group col-sm-12">
                    <div class="dropdown">
                        <select-component ref="sorter" value="35" v-bind:elements="values"></select-component>
                    </div>
                    <label>Which user created this Blog Post.</label>
                    <div class="for-textarea"></div>
                </div>

            </div>
        </div>
        <div class="modal-footer">
            <button v-on:click="trigger('no')" class="btn btn-default">CANCEL</button>
            <button v-on:click="trigger('yes')" class="btn btn-yellow" :disabled="buttonIsDisabled">ADD BLOG POST</button>
        </div>
    </div>
</template>

<script type="text/babel">
    import $ from 'jquery';
    import SelectComponent from '../Partials/Form/SelectComponent.vue';

    export default {
        components: {
            SelectComponent
        },
        data () {
            return {
                post: {},
                isOpened: false,
                buttonIsDisabled: true,
                values: [
                    {title: 'Jered Martin', value: '22'},
                    {title: 'Cassie Gonzalez', value: '35'},
                    {title: 'Kendall Aldridge', value: '1851'},
                    {title: 'Mike Melvin', value: '491'},
                    {title: 'Jesse Ghiorzi', value: '890'},
                    {title: 'OnePitch Team', value: '1'},
                    {title: 'Stephen Karaolis', value: '1892'},
                    {title: 'Darcy Cudmore', value: '2056'},
                    {title: 'Kayla Perkins', value: '2147'},
                ]
            };
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
                    this.addBlogPost();
                } else {
                    this.close();
                }
            },
            addBlogPost: function () {
                this.post.content = this.post.excerpt;
                this.post.user_id = this.$refs.sorter.val();

                this.$http.post(laroute.route('admin.rest.blog.'), this.post )
                    .then((response) => {
                        this.post = {};
                        this.$parent.getBlogPosts();
                        this.close();
                    }).catch((e) => {
                    this.errors = e.response.data;
                });
            },
            validatePostTitle: function (e) {
                let remainingCount = 50 - e.target.value.length;
                $(e.target).siblings('.counter').html(remainingCount);

                if (remainingCount < 0) {
                    $(e.target).siblings('.counter').addClass('text-danger');
                    this.buttonIsDisabled = true;
                } else {
                    $(e.target).siblings('.counter').removeClass('text-danger');
                    this.validateForm();
                }
            },
            validatePostExcerpt: function (e) {
                let remainingCount = 80 - e.target.value.length;
                $(e.target).siblings('.counter').html(remainingCount);

                if (remainingCount < 0) {
                    $(e.target).siblings('.counter').addClass('text-danger');
                    this.buttonIsDisabled = true;
                } else {
                    $(e.target).siblings('.counter').removeClass('text-danger');
                    this.validateForm();
                }
            },
            validateForm: function () {
                // console.log(this.post.title.length, this.post.excerpt.length, this.post.link.length);
                // if (this.post.title.length === 0 || this.post.excerpt.length === 0 || this.post.link.length === 0) {
                //     this.buttonIsDisabled = true;
                // }
                if (typeof this.post.title !== 'undefined' && typeof this.post.excerpt !== 'undefined' && typeof this.post.link !== 'undefined') {
                    this.buttonIsDisabled = false;
                }
            }
        }
    }
</script>

<style lang="scss">
    #modal-add-post {
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
        }

        .form-group {
            margin-bottom: 10px;

            input {
                padding: 0 15px;
                width: 96%;
                margin: 0;
                border: 1px solid #fff7d6;
                border-bottom-width: 4px;
                overflow: hidden;
                background-color: #fff7d6;
                vertical-align: middle;
                color: #414745;
                font-weight: 400;

                &:focus, &:hover {
                    outline: 0;
                    box-shadow: none;
                    border: 1px solid #414745;
                    border-bottom: 4px solid #414745;
                }
            }

            label {
                font-size: 0.9rem;
            }

            textarea.form-control {
                padding: 15px 15px 12px 15px;
                border: 1px solid #fff7d6;
                border-bottom-width: 4px;
                height: 97px;
                overflow: hidden;
                background-color: #fff7d6;
                vertical-align: middle;
                color: #414745;
                font-weight: 400;

                &:focus, &:hover {
                    outline: 0;
                    box-shadow: none;
                    border: 1px solid #414745;
                    border-bottom: 4px solid #414745;
                }
            }

            .counter {
                float: right;
                font-size: 12px;
            }

            .text-danger {
                color: #A94442;
            }
        }

        .dropdown {
            height: 48px;
            margin-bottom: 6px;
        }

        &.open {
            display: block;
        }
    }
</style>