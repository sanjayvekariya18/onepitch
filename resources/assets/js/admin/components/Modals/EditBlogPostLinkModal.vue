<template>
    <div id="modal-post-link" class="modal" :class="{open: isOpened}" v-if="postData.link">
        <div class="modal-content">
            <h4>Edit Permanent Link for Blog Post</h4>
            <div class="row">
                <div class="form-group col-sm-12">
                    <input type="text" class="form-control" name="subject" placeholder="This is the link that would be accessible to the user when published."
                           v-model="postData.link" required>
                    <label>This is the link that would be accessible to the user when published.</label>
                </div>
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

    export default {
        data () {
            return {
                isOpened: false,
                hasError: false,
            };
        },
        props: ['postData'],
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
                    this.saveLink();
                } else {
                    this.close();
                }
                this.$emit(value);
            },
            saveLink: function() {
                this.loading = true;
                this.$http.put(laroute.route('admin.rest.blog.resource.link', { blogPost: this.postData.id }), {link: this.postData.link}).then((response) => {
                    this.$parent.getBlogPost();
                    this.close();
                });
            }
        }
    }
</script>

<style lang="scss">
    #modal-post-link {
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
                margin: 0;
            }

            label {
                font-size: 0.9rem;
            }

            .subject-counter {
                float: right;
                font-size: 12px;
            }

            .text-danger {
                color: #A94442;
            }
        }

        &.open {
            display: block;
        }
    }
</style>