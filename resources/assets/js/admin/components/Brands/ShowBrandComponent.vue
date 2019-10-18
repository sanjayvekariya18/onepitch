<template>
    <div class="pitch-show show-item" :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-show="!loading" class="content show-item-content">
            <left-side v-bind:user="brand.author">
                <avatar-component v-if="brand.author">
                    <router-link :to="{ name: 'publicists.show', params:{ userId: brand.author.id} }">
                        <avatar-image-initials-component v-bind:user="brand.author"></avatar-image-initials-component>
                    </router-link>
                </avatar-component>
                <user-name-component v-if="brand.author" v-bind:user="brand.author"></user-name-component>
                <contact-information-component v-if="brand.author" v-bind:user="brand.author"></contact-information-component>
                <social-links-component v-bind:user="brand.author"></social-links-component>
            </left-side>
            <div class="right-side">
                <div class="header-side" >
                    <button v-on:click.stop="deleteBrandModal(brand)" class="btn btn-danger">DELETE</button>
                    <delete-brand-modal v-on:yes="deleteBrand" ref="deleteBrandModal"></delete-brand-modal>
                    <div class="titles">
                        <tags-component v-on:edit="showEditSummaryModal" v-bind:editable="true">
                            <span slot="title">{{ brand.company }}</span>
                        </tags-component>
                        <edit-summary-modal v-on:yes="getBrand" v-bind:summaryBrand="brand" ref="editSummaryModal"></edit-summary-modal>
                        <h6>Website: <a :href="brand['http-website']" target="_blank">{{ brand.website }}</a></h6>
                        <h6 v-if="brand.location">Location: {{ brand.location }}</h6>
                    </div>
                </div>
                <div class="body-side">
                    <div v-if="brand.tags">
                        <tags-component v-on:edit="showEditIndustriesModal" v-bind:tags="brand.tags.industries" v-bind:editable="true">
                            <span slot="title">Industries</span>
                        </tags-component>
                        <edit-industries-modal v-on:yes="getBrand" v-bind:brand="brand" ref="editIndustriesModal"></edit-industries-modal>
                        <tags-component v-on:edit="showEditTopicsModal" v-bind:tags="brand.tags.topics" v-bind:editable="true">
                            <span slot="title">Topics</span>
                        </tags-component>
                        <edit-topics-modal v-on:yes="getBrand" v-bind:passed-brand="brand" ref="editTopicsModal"></edit-topics-modal>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import LeftSide from '../Partials/Page/Profile/LeftSide.vue';
    import TagsComponent from './show/TagsComponent.vue';
    import AvatarComponent from '../Partials/Page/Profile/AvatarComponent.vue';
    import AvatarImageInitialsComponent from '../Partials/Page/Profile/AvatarImageInitialsComponent.vue';
    import UserNameComponent from '../Partials/Page/Profile/UserNameComponent.vue';
    import ContactInformationComponent from '../Partials/Page/Profile/ContactInformationComponent.vue';
    import SocialLinksComponent from '../Partials/Page/Profile/SocialLinksComponent.vue';
    import EditIndustriesModal from '../Modals/EditBrandIndustriesModal.vue';
    import EditTopicsModal from '../Modals/EditBrandTopicsModal.vue';
    import EditSummaryModal from '../Modals/EditBrandSummaryModal.vue';
    import Preloader from '../Partials/PreloaderComponent.vue';
    import DeleteBrandModal from './DeleteBrandModal.vue';
    import moment from 'moment';

    export default {
        components: {
            LeftSide,
            TagsComponent,
            AvatarComponent,
            AvatarImageInitialsComponent,
            UserNameComponent,
            ContactInformationComponent,
            EditIndustriesModal,
            EditTopicsModal,
            EditSummaryModal,
            SocialLinksComponent,
            Preloader,
            DeleteBrandModal
        },
        created () {
            this.getBrand();
        },
        data () {
            return {
                brand: {},
                errors: [],
                loading: true
            };
        },
        methods : {
            getBrand: function () {
                this.loading = true;
                this.$http.get(laroute.route('admin.rest.brands.resource', {brand: this.$route.params.brandId}))
                    .then(response => {
                        this.brand = response.data;
                        this.$parent.setPageTitle(this.brand.company);
                        this.loading = false;
                    })
                    .catch(e => {
                        console.error(e);
                        this.errors.push(e)
                    });
            },
            deleteBrand: function () {
                this.$http.delete(laroute.route('admin.rest.brands.resource', { brand: this.brand.id }))
                    .then((response) => {
                        this.$router.push({ name: 'publicists.show', params: { userId: this.brand.author.id }});
                    }).catch((e) => {
                    this.errors = e.response.data;
                });
            },
            showEditSummaryModal: function() {
                this.$refs.editSummaryModal.open();
            },
            showEditIndustriesModal: function() {
                this.$refs.editIndustriesModal.open();
            },
            showEditTopicsModal: function() {
                this.$refs.editTopicsModal.open();
            },
            deleteBrandModal: function (brand) {
                this.$refs.deleteBrandModal.open(brand);
            },
        }
    }
</script>

<style lang="scss">
    .pitch-show {
        .right-side {
            .btn-danger {
                background-color: #c9302c;
                float: right;
            }

            .titles {
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

            }

            .body-side {
                .section {
                    .tags-component.editable {
                        margin-bottom: 0px;
                    }
                }
            }

        }

    }


</style>