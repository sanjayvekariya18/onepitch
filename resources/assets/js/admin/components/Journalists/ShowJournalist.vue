<template>
    <div class="journalist show-item" :class="{spinner: loading}">
        <preloader-component v-if="loading"></preloader-component>
        <div class="content show-item-content" v-show="!loading">
            <left-side v-bind:user="user">
                <avatar-component>
                    <avatar-image-initials-component v-bind:user="user" v-bind:small="false"></avatar-image-initials-component>
                </avatar-component>
                <inquiry-history-component v-bind:user="user"></inquiry-history-component>
                <journalist-pitch-history-component v-bind:user="user"></journalist-pitch-history-component>
                <social-links-component v-bind:user="user"></social-links-component>
                <login-information-component v-bind:user="user"></login-information-component>
                <reset-password-component v-bind:user="user"></reset-password-component>
            </left-side>
            <div class="right-side">
                <div class="header-side">
                    <div class="col">
                        <div v-if="user.approved === null"  class="approving-section">
                            <span class="submitted">Submitted:  {{ user.signUpOn }}</span>
                            <div class="buttons">
                                <button v-on:click="approveJournalistModal" class="btn btn-yellow btn-large">APPROVE USER</button>
                                <button v-on:click="denyUserModal" class="btn btn-white btn-large">DENY USER</button>
                            </div>
                        </div>
                        <div class="name">{{ user.full_name }}</div>
                        <div class="company">{{ user.company }}</div>
                        <div class="role">{{ user.roleName }}</div>
                        <div v-show="user.approved !== null" class="when-joined">Joined on {{ user.joinedOn }}</div>
                    </div>
                    <div class="col text-right">
                        <button v-on:click="deleteUserModal(user)" class="btn btn-yellow btn-large">DELETE USER</button>
                    </div>
                </div>
                <div class="body-side">
                    <div v-if="user" class="pitches-title">
                        <h4>Industries and Topics</h4>
                    </div>
                    <div class="pitches-wrapper">
                        <ul class="collapsible" data-collapsible="expandable">
                            <li v-for="industry in user.industries" v-bind:key="industry.id">
                                <div class="collapsible-header">
                                    {{ industry.title }} - {{ industry.topics.length }} Topics <span class="caret"><i v-if="industry.topics.length" class="material-icons">keyboard_arrow_down</i></span>
                                </div>
                                <div v-if="industry.topics.length" class="collapsible-body">
                                    <span v-for="(topic, key) in industry.topics" v-bind:key="topic.id">
                                        <span v-if="key">,</span> {{ topic.title }}
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div v-if="user" class="inquiries-title">
                        <h4 v-if="user.countInquiries">Inquiry History - {{ user.countInquiries.all }} Inquiries Total</h4>
                    </div>
                    <div v-if="inquiries.length" class="body-side inquiries-list">
                        <div class="table-wrapper">
                            <table class="table highlight striped">
                                <tr v-for="(inquiry, key) in inquiries" v-bind:key="inquiry.id" v-on:click="showInquiry(inquiry)">
                                    <td>
                                        <div class="id">Inquiry {{ key + 1 }}</div>
                                        <div :class="inquiry.statusClass" class="status">{{ inquiry.statusTitle }}</div>
                                    </td>
                                    <td>{{ inquiry.subject }}</td>
                                    <td>{{ inquiry.date }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <deny-journalist-modal ref="denyJournalistModal" v-on:yes="setStatusUser(false)" v-bind:user="this.user"></deny-journalist-modal>
        <approve-journalist-modal ref="approveJournalistModal" v-on:yes="setStatusUser(true)" v-bind:user="this.user"></approve-journalist-modal>
        <delete-user-modal ref="deleteUserModal"></delete-user-modal>
    </div>
</template>

<script type="text/babel">
    import $ from 'jquery';
    import LeftSide from '../Partials/Page/Profile/LeftSide.vue';
    import AvatarComponent from '../Partials/Page/Profile/AvatarComponent.vue';
    import AvatarImageInitialsComponent from '../Partials/Page/Profile/AvatarImageInitialsComponent.vue';
    import InquiryHistoryComponent from '../Partials/Page/Profile/InquiryHistoryComponent.vue';
    import JournalistPitchHistoryComponent from '../Partials/Page/Profile/JournalistPitchHistoryComponent.vue';
    import SocialLinksComponent from '../Partials/Page/Profile/SocialLinksComponent.vue';
    import LoginInformationComponent from '../Partials/Page/Profile/LoginInformationComponent.vue';
    import ResetPasswordComponent from '../Partials/Page/Profile/ResetPasswordComponent.vue';
    import PreloaderComponent from '../Partials/PreloaderComponent.vue';
    import DenyJournalistModal from '../Journalists/DenyJournalistModal.vue';
    import ApproveJournalistModal from '../Journalists/ApproveJournalistModal.vue';
    import DeleteUserModal from '../Modals/DeleteUserModal.vue';

    export default {
        components: {
            LeftSide,
            AvatarComponent,
            AvatarImageInitialsComponent,
            InquiryHistoryComponent,
            JournalistPitchHistoryComponent,
            SocialLinksComponent,
            LoginInformationComponent,
            ResetPasswordComponent,
            PreloaderComponent,
            DenyJournalistModal,
            ApproveJournalistModal,
            DeleteUserModal
        },
        created() {
            this.getUser();
            this.getInquiries();
        },
        mounted() {
            $('.journalist .collapsible').collapsible();
        },
        props: ['userId'],
        data() {
            return {
                user: {},
                pitches: [],
                inquiries: [],
                errors: [],
                loading: true
            };
        },
        methods : {
            getUser: function () {
                this.loading = true;
                this.$http.get(laroute.route('admin.rest.journalists.resource', {user: this.$route.params.userId}))
                .then((response) => {
                    this.user = response.data;
                    this.$parent.setPageTitle(this.user.full_name);
                    this.loading = false;
                })
                .catch((e) => {
                    console.error(e);
                    this.errors.push(e)
                });
            },
            getInquiries: function () {
                this.$http.get(laroute.route('admin.rest.journalists.resource.inquiries', {user: this.$route.params.userId}))
                    .then(response => {
                        this.inquiries = response.data;
                    })
                    .catch(e => {
                        console.error(e);
                        this.errors.push(e)
                    });
            },
            saveProfile: function () {
                this.$http.put(laroute.route('admin.rest.journalists.resource', {user: this.user.id}), {user: this.user})
                    .then((response) => {
                        this.user = response.data;
                    })
                    .catch( (e) => {
                        console.error(e);
                        this.errors.push(e)
                    });
            },
            showPitch: function (pitch) {
                this.$router.push({ name: 'pitches.show', params: { pitchId: pitch.id }});
            },
            showInquiry: function (inquiry) {
                this.$router.push({ name: 'inquiries.show', params: { inquiryId: inquiry.id }});
            },
            denyUserModal () {
                this.$refs.denyJournalistModal.open();
            },
            approveJournalistModal () {
                this.$refs.approveJournalistModal.open();
            },
            setStatusUser: function (status) {
                this.user.approved = status;
                this.saveProfile();
            },
            deleteUserModal: function (user){
              this.$refs.deleteUserModal.open(user)
            }
        }
    }
</script>

<style lang="scss">
    .journalist {

        .content {
            display: flex;
        }

        .right-side {
            display: flex;
            flex-direction: column;

            .header-side {
                display:flex;
                padding: 32px;
                flex-wrap: wrap;

                .approving-section {
                    margin-bottom: 32px;

                    span.submitted {
                        display: block;
                        width: 100%;
                        font-family: Roboto, sans-serif;
                        font-size: 13px;
                        line-height: 1.15;
                        text-align: left;
                        color: #9b9b9b;
                        margin-bottom: 24px;
                    }

                    .buttons {
                        button.btn:first-child {
                            margin-right: 24px;
                        }
                    }
                }



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

            .pitches-title, .inquiries-title {
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

            .body-side.pitches-list, .body-side.inquiries-list {
                position: relative;
                overflow-y: scroll;
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