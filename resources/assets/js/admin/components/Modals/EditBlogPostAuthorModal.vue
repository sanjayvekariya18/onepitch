<template>
    <div id="modal-post-author" class="modal" :class="{open: isOpened}" v-if="authorPostData.link">
        <div class="modal-content">
            <h4>Edit Permanent Link for Blog Post</h4>
            <div class="row">
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
            <button v-on:click="trigger('yes')" class="btn btn-yellow">SAVE CHANGES</button>
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
                isOpened: false,
                hasError: false,
                values: [
                    {title: 'Jered Martin', value: '22'},
                    {title: 'Cassie Gonzalez', value: '35'},
                    {title: 'Mike Melvin', value: '491'},
                    {title: 'Jesse Ghiorzi', value: '890'},
                    {title: 'Kendall Aldridge', value: '1851'},
                    {title: 'OnePitch Team', value: '1'},
                    {title: 'Stephen Karaolis', value: '1892'},
                    {title: 'Darcy Cudmore', value: '2056'},
                    {title: 'Kayla Perkins', value: '2147'},
                ]
            };
        },
        props: ['authorPostData'],
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
                this.$http.put(laroute.route('admin.rest.blog.resource.author', { blogPost: this.authorPostData.id }), {author: this.$refs.sorter.val()}).then((response) => {
                    // this.$parent.getBlogPost();
                    this.close();
                });
            }
        }
    }
</script>

<style lang="scss">
    #modal-post-author {
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