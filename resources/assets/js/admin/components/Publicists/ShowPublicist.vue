<template>
    <div class="publicist-show show-item" :class="{spinner: loading}">
        <preloader-component v-if="loading"></preloader-component>
        <div class="content show-item-content" v-show="!loading">
            <left-side v-bind:user="user">
                <avatar-component>
                    <avatar-image-initials-component v-bind:user="user"></avatar-image-initials-component>
                </avatar-component>
                <pitch-history-component v-bind:user="user"></pitch-history-component>
                <publicist-inquiry-history-component v-bind:user="user"></publicist-inquiry-history-component>
                <social-links-component v-bind:user="user"></social-links-component>
                <login-information-component v-bind:user="user"></login-information-component>
                <reset-password-component v-bind:user="user"></reset-password-component>
            </left-side>
            <div class="right-side">
                <div class="header-side">
                    <div class="col">
                        <div class="name">{{ user.full_name }}</div>
                        <div class="company">{{ user.company }}</div>
                        <div class="role">{{ user.roleName }}</div>
                        <div class="when-joined">Joined on {{ user.joinedOn }}</div>
                    </div>
                    <div class="col text-right">
                        <button v-on:click="deleteUserModal(user)" class="btn btn-yellow btn-large">DELETE USER</button>
                    </div>
                </div>
                <div v-if="user" class="pitches-title">
                    <h4 v-if="user.countPitches">Pitch History - {{ user.countPitches.all }} Pitches Total</h4>
                </div>
                <div v-if="pitches.length" class="body-side pitches-list">
                    <div class="table-wrapper">
                        <table class="table highlight striped">
                            <tr v-for="(pitch, key) in pitches" v-on:click="showPitch(pitch)">
                                <td>
                                    <div class="id">Pitch {{ key + 1 }}</div>
                                    <div :class="pitch.statusClass" class="status">{{ pitch.statusTitle }}</div>
                                </td>
                                <td>{{ pitch.subject }}</td>
                                <td>{{ pitch.date }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div v-if="user" class="pitches-title">
                    <h4 v-if="user.countBrands">Brand Index - {{ user.countBrands }} Brands Total</h4>
                </div>
                <div v-if="user.countBrands" class="body-side pitches-list">
                    <div class="table-wrapper">
                        <table class="table highlight striped">
                            <tr v-for="(brand, key) in user.brands" v-on:click="showBrand(brand)">
                                <td>{{ brand.company }}</td>
                                <td>{{ brand.website }}</td>
                                <td>{{ brand.location }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div v-if="user" class="pitches-title">
                    <h4>Industries and Topics</h4>
                </div>
                <div class="inquiries-wrapper">
                    <ul class="collapsible" data-collapsible="expandable">
                        <li v-for="industry in user.industries">
                            <div class="collapsible-header">{{ industry.title }} - {{ industry.topics.length }} Topics <span class="caret"><i v-if="industry.topics.length" class="material-icons">keyboard_arrow_down</i></span></div>
                            <div v-if="industry.topics.length" class="collapsible-body"><span v-for="(topic, key) in industry.topics"><span v-if="key">,</span> {{ topic.title }}</span></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <delete-user-modal ref="deleteUserModal"></delete-user-modal>

    </div>
</template>

<script type="text/babel">
    import $ from 'jquery';
    import LeftSide from '../Partials/Page/Profile/LeftSide.vue';
    import AvatarComponent from '../Partials/Page/Profile/AvatarComponent.vue';
    import AvatarImageInitialsComponent from '../Partials/Page/Profile/AvatarImageInitialsComponent.vue';
    import PitchHistoryComponent from '../Partials/Page/Profile/PitchHistoryComponent.vue';
    import PublicistInquiryHistoryComponent from '../Partials/Page/Profile/PublicistInquiryHistoryComponent.vue';
    import SocialLinksComponent from '../Partials/Page/Profile/SocialLinksComponent.vue';
    import LoginInformationComponent from '../Partials/Page/Profile/LoginInformationComponent.vue';
    import PreloaderComponent from '../Partials/PreloaderComponent.vue';
    import ResetPasswordComponent from '../Partials/Page/Profile/ResetPasswordComponent.vue';
    import DeleteUserModal from '../Modals/DeleteUserModal.vue';


    export default {
        components: {
            LeftSide,
            AvatarComponent,
            AvatarImageInitialsComponent,
            PitchHistoryComponent,
            PublicistInquiryHistoryComponent,
            SocialLinksComponent,
            LoginInformationComponent,
            PreloaderComponent,
            ResetPasswordComponent,
          DeleteUserModal
        },
        created() {
            this.getUser();
            this.getPitches();
        },
        mounted() {
            $('.publicist-show .collapsible').collapsible();
        },
        props: ['userId'],
        data() {
            return {
                user: {},
                pitches: [],
                errors: [],
                loading: true
            };
        },
        methods : {
            getUser: function () {
                this.loading = true;
                this.$http.get(laroute.route('admin.rest.publicists.resource', {user: this.$route.params.userId}))
                    .then(response => {
                        console.log(response.data.brands);
                        console.log(response.data);
                        this.user = response.data;
                        this.$parent.setPageTitle(this.user.full_name);
                        this.loading = false;
                    })
                    .catch(e => {
                        console.error(e);
                        this.errors.push(e)
                    });
            },
            getPitches: function () {
                this.$http.get(laroute.route('admin.rest.publicists.resource.pitches', {user: this.$route.params.userId}))
                    .then(response => {
                        this.pitches = response.data;
                    })
                    .catch(e => {
                        console.error(e);
                        this.errors.push(e)
                    });
            },
            saveProfile: function () {
                this.$http.put(laroute.route('admin.rest.publicists.resource', {user: this.user.id}), {user: this.user})
                    .then(response => {
                       // this.user = response.data;
                    })
                    .catch(e => {
                        console.error(e);
                        this.errors.push(e)
                    });
            },
            showPitch: function (pitch) {
                this.$router.push({ name: 'pitches.show', params: { pitchId: pitch.id }});
            },
            showBrand: function (brand) {
              this.$router.push({ name: 'brands.show', params: { brandId: brand.id } });
            },
            deleteUserModal: function (user){
                this.$refs.deleteUserModal.open(user)
            }
        }
    }
</script>

<style lang="scss" type="text/scss">
    .publicist-show {

        .content {
            display: flex;
        }

        .right-side {
            display: flex;
            flex-direction: column;

            .header-side {
                display:flex;
                padding: 32px;

                .name {
                    font-family: Roboto, sans-serif;
                    font-size: 20px;
                    font-weight: 500;
                    line-height: 1;
                    text-align: left;
                    color: #414745;
                    margin-bottom: 4px;
                }

                .company {
                    font-family: Roboto, sans-serif;
                    font-size: 15px;
                    font-weight: 500;
                    text-align: left;
                    color: #414745;
                    margin-bottom: 4px;
                }

                .role {
                    font-family: Roboto, sans-serif;
                    font-size: 13px;
                    font-style: italic;
                    text-align: left;
                    color: #414745;
                    margin-bottom: 8px;
                }

                .when-joined {
                    font-family: Roboto, sans-serif;
                    font-size: 13px;
                    text-align: left;
                    color: #9b9b9b;
                }
                div.col{
                    flex: 0 0 50%;
                }
            }

            .pitches-title {
                h4 {
                    padding: 0 32px 16px;
                    font-family: Roboto, sans-serif;
                    font-size: 15px;
                    font-weight: 500;
                    line-height: 1.6;
                    text-align: left;
                    color: #414745;
                }
            }

            .pitches-wrapper, .inquiries-wrapper {
                ul {
                    margin: 0 32px 32px;
                    box-shadow: none;
                    border: none;

                    li {
                        margin-bottom: 7px;
                        border: solid 1px #ffd831;

                        &:last-child {
                            margin-bottom: 0;
                        }

                        &.active {
                            .collapsible-header {

                                .caret {
                                    transform: rotate(180deg) translateY(50%);
                                    right: 15px;
                                }
                            }

                            .collapsible-body {
                                border: none;
                                box-shadow: none;
                            }
                        }

                        .collapsible-header {
                            position: relative;
                            padding: 16px;
                            border: none;

                            .caret {
                                position: absolute;
                                right: 0;
                                top: 50%;
                                transform: translateY(-50%);
                            }

                        }

                        .collapsible-body {
                            padding: 16px;
                            padding-top: 0;
                        }
                    }
                }
            }

            .body-side.pitches-list {
                position: relative;
                overflow-y: hidden;
                min-height: 50vh;

                table {
                    tr {

                        height: 74px;

                        &:nth-child(odd) {
                            background-color: #f4f5f5;
                        }

                        &:hover {
                            cursor: pointer;
                            background-color: #fff7d6;
                        }

                        td {
                            padding: 16px 0;
                            font-family: Roboto, sans-serif;
                            font-size: 15px;
                            line-height: 1.2;
                            text-align: left;
                            color: #414745;
                            vertical-align: top;

                            .id {
                                margin-bottom: 8px;
                            }

                            .status {
                                font-family: Roboto,sans-serif;
                                font-size: 12px;
                                line-height: 1.25;
                                text-align: left;
                                color: #2abf8d;
                            }

                            &:first-child {
                                padding-left: 32px;
                            }

                            &:last-child {
                                text-align: right;
                                padding-right: 32px;
                                color: #9b9b9b;
                            }
                        }
                    }

                }
            }


        }
    }
</style>