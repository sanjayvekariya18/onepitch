<template>
    <div class="inquiry-show show-item" :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-if="inquiry.status" v-show="!loading" class="content show-item-content">
            <left-side v-bind:user="inquiry.author">
                <avatar-component v-if="inquiry.author">
                    <router-link :to="{ name: 'publicists.show', params:{ userId: inquiry.author.id} }">
                        <avatar-image-initials-component v-bind:user="inquiry.author"></avatar-image-initials-component>
                    </router-link>
                </avatar-component>
                <user-name-component v-if="inquiry.author" v-bind:user="inquiry.author"></user-name-component>
                <inquiry-history-component v-if="inquiry.author" v-bind:user="inquiry.author"></inquiry-history-component>
                <contact-information-component v-if="inquiry.author" v-bind:user="inquiry.author"></contact-information-component>
            </left-side>
            <div class="right-side">
                <div class="header-side" v-if="inquiry.status" >
                    <div class="date-information">
                        <div v-if="inquiry.statusObj.type.new || inquiry.statusObj.type.upcoming || inquiry.statusObj.type.published || inquiry.statusObj.type.rejected">
                            <span class="submitted">Submitted:  {{ inquirySubmittedDate }}</span>
                        </div>
                        <div v-if="inquiry.statusObj.type.rejected">
                            <span class="submitted">Rejected:  {{ inquiryRejectedDate }}</span>
                        </div>
                        <div v-if="inquiry.accepted_at && (inquiry.statusObj.type.upcoming || inquiry.statusObj.type.published)">
                            <span class="submitted">Accepted:  {{ inquiryAcceptedDate }}</span>
                        </div>
                        <div v-if="inquiry.statusObj.type.published">
                            <span class="submitted">Published:  {{ inquiryPublishedDate }}</span>
                        </div>
                        <div v-if="inquiry.statusObj.type.published || inquiry.statusObj.type.upcoming">
                            <span class="submitted">Opens:  {{ inquiry.opens }}</span>
                        </div>
                        <div v-if="inquiry.statusObj.type.published || inquiry.statusObj.type.upcoming">
                            <span class="submitted">Clicks:  {{ inquiry.clicks }}</span>
                        </div>
                        <div v-if="inquiry.statusObj.type.published || inquiry.statusObj.type.upcoming">
                            <span class="submitted">Responses:  {{ inquiry.responses }}</span>
                        </div>
                    </div>
                    <control-buttons-component v-if="!inquiry.statusObj.type.published" v-on:inquiry-changed="inquiryChanged" v-bind:inquiry="inquiry"></control-buttons-component>
                    <div class="titles">
                        <tags-component v-on:edit="showEditSummaryModal" v-bind:editable="true">
                            <span slot="title">{{ inquiry.subject }}</span>
                        </tags-component>
                        <edit-summary-modal v-on:yes="getInquiry" v-bind:summary-inquiry="inquiry" ref="editSummaryModal"></edit-summary-modal>
                        <h6>Brand: {{ inquiry.company }}</h6>
                        <h6 v-if="inquiry.website">Website: <a :href="inquiry['http-website']" target="_blank">{{ inquiry.website }}</a></h6>
                    </div>
                </div>
                <div class="body-side">
                    <div v-if="inquiry.publicists.sent.length">
                        <div class="inquiries-title stats">
                            <h4>Publicists Report</h4>
                        </div>
                        <div class="inquiries-wrapper">
                            <ul class="collapsible" data-collapsible="expandable">
                                <li v-for="(type, typeName) in inquiry.publicists">
                                    <div class="collapsible-header">{{ typeName }} ({{ type.length }}) <span class="caret"><i v-if="type.length" class="material-icons">keyboard_arrow_down</i></span></div>
                                    <div v-if="type.length" class="collapsible-body"><span v-for="(user, key) in type"><span v-if="key">,</span> {{ user.company }} (<a
                                            :href='"mailto:" + user.email'>{{ user.email }}</a>)</span></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div v-if="inquiry.tags">
                        <tags-component v-on:edit="showEditIndustriesModal" v-bind:tags="inquiry.tags.industries" v-bind:editable="true">
                            <span slot="title">Industries</span>
                        </tags-component>
                        <edit-industries-modal v-on:yes="getInquiry" v-bind:inquiry="inquiry" ref="editIndustriesModal"></edit-industries-modal>
                        <tags-component v-on:edit="showEditTopicsModal" v-bind:tags="inquiry.tags.topics" v-bind:editable="true">
                            <span slot="title">Topics</span>
                        </tags-component>
                        <edit-topics-modal v-on:yes="getInquiry" v-bind:passed-inquiry="inquiry" ref="editTopicsModal"></edit-topics-modal>
                    </div>
                    <div v-if="inquiry.event" class="inquiry-event-component">
                        <div class="title">Deadline</div>
                        <div class="information">
                            <div class="line">{{ inquiry.event.title }}</div>
                            <div class="line">Date: {{ eventDate }}</div>
                            <div class="line">Time: {{ eventTime }}</div>
                        </div>
                    </div>
                    <div class="general-info-inquiry">
                        <div class="section">
                            <div class="section-title">
                                <tags-component v-on:edit="showEditWhatsModal" v-bind:editable="true">
                                    <span slot="title">What</span>
                                </tags-component>
                                <edit-whats-modal v-on:yes="getInquiry" v-bind:whats-inquiry="inquiry" ref="editWhatsModal"></edit-whats-modal>
                            </div>
                            <ul class="section-list">
                                <li v-for="what in inquiry.what">{{ what }}</li>
                            </ul>
                            <div class="section-title">
                                <tags-component v-on:edit="showEditWhysModal" v-bind:editable="true">
                                    <span slot="title">Want</span>
                                </tags-component>
                                <edit-whys-modal v-on:yes="getInquiry" v-bind:whys-inquiry="inquiry" ref="editWhysModal"></edit-whys-modal>
                            </div>
                            <ul class="section-list">
                                <li v-for="why in inquiry.why">{{ why }}</li>
                            </ul>
                            <div v-if="inquiry.files[0]">
                                <div class="section-title">
                                    <tags-component v-on:edit="showEditInquiryFilesModal" v-bind:editable="true">
                                        <span slot="title">Files</span>
                                    </tags-component>
                                    <edit-inquiry-files-modal v-on:yes="getInquiry" v-bind:files-inquiry="inquiry" ref="editInquiryFilesModal"></edit-inquiry-files-modal>
                                </div>
                                <ul class="section-list">
                                    <li v-for="file in inquiry.files">
                                        <a :href="preBucketUrl + file.url" target="_blank">{{ file.name }}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import LeftSide from '../Partials/Page/Profile/LeftSide.vue';
    import ControlButtonsComponent from './show/ControlButtonsComponent.vue';
    import TagsComponent from './show/TagsComponent.vue';
    import AvatarComponent from '../Partials/Page/Profile/AvatarComponent.vue';
    import AvatarImageInitialsComponent from '../Partials/Page/Profile/AvatarImageInitialsComponent.vue';
    import UserNameComponent from '../Partials/Page/Profile/UserNameComponent.vue';
    import InquiryHistoryComponent from '../Partials/Page/Profile/InquiryHistoryComponent.vue';
    import ContactInformationComponent from '../Partials/Page/Profile/ContactInformationComponent.vue';
    import EditIndustriesModal from '../Modals/EditInquiryIndustriesModal.vue';
    import EditTopicsModal from '../Modals/EditInquiryTopicsModal.vue';
    import EditSummaryModal from '../Modals/EditInquirySummaryModal.vue';
    import EditWhysModal from '../Modals/EditInquiryWhysModal.vue';
    import EditWhatsModal from '../Modals/EditInquiryWhatsModal.vue';
    import EditInquiryFilesModal from '../Modals/EditInquiryFilesModal.vue';
    import Preloader from '../Partials/PreloaderComponent.vue';
    import moment from 'moment';

    export default {
        components: {
            LeftSide,
            ControlButtonsComponent,
            TagsComponent,
            AvatarComponent,
            AvatarImageInitialsComponent,
            UserNameComponent,
            InquiryHistoryComponent,
            ContactInformationComponent,
            EditIndustriesModal,
            EditTopicsModal,
            EditSummaryModal,
            EditWhysModal,
            EditWhatsModal,
            EditInquiryFilesModal,
            Preloader
        },
        created () {
            this.getInquiry();
        },
        data () {
            return {
                inquiry: {},
                preBucketUrl: 'https://s3-us-west-1.amazonaws.com/onepitch/',
                errors: [],
                loading: true
            };
        },
        computed: {
            inquirySubmittedDate: function () {
                return moment(this.inquiry.uploaded_at).format('MMMM D[,] YYYY [at] hh:mm A');
            },
            inquiryAcceptedDate: function () {
                return moment(this.inquiry.accepted_at).format('MMMM D[,] YYYY [at] hh:mm A');
            },
            inquiryPublishedDate: function () {
                if (this.inquiry.sent_at != null) {
                    return moment(this.inquiry.sent_at).format('MMMM D[,] YYYY [at] hh:mm A');
                }

                return 'No matches';
            },
            inquiryRejectedDate: function () {
                return moment(this.inquiry.accepted_at).format('MMMM D[,] YYYY [at] hh:mm A');
            },
            dateFrom: function () {
                return moment(this.inquiry.event.date_from, 'HH:mm:ss').format('hh:mm A');
            },
            dateTo: function () {
                return moment(this.inquiry.event.date_to, 'HH:mm:ss').format('hh:mm A');
            },
            timeFrom: function () {
                return moment(this.inquiry.event.time_from, 'HH:mm:ss').format('hh:mm A');
            },
            timeTo: function () {
                return moment(this.inquiry.event.time_to, 'HH:mm:ss').format('hh:mm A');
            },
            eventDate: function () {
                let dateFrom = moment(this.inquiry.event.date_from, 'YYYY-MM-DD');
                let dateTo = undefined;

                if (this.inquiry.event.date_to) {
                    dateTo = moment(this.inquiry.event.date_to, 'YYYY-MM-DD');
                }

                if (dateTo === undefined) {
                    return dateFrom.format('MMMM DD');
                }

                if (dateFrom.month() === dateTo.month()) {
                    if (dateFrom.day() === dateTo.day()) {
                        return dateFrom.format('MMMM DD');
                    }

                    return dateFrom.format('MMMM DD') + ' - ' + dateTo.format('DD');
                }

                return dateFrom.format('MMMM DD') + ' - ' + dateTo.format('MMMM DD');
            },
            eventTime: function () {
                if (this.inquiry.event.time_from == null) {
                    return 'All day';
                }

                let format = 'hh:mm A';
                let timeTo = undefined;
                let timeFrom = moment(this.inquiry.event.time_from, 'HH:mm:ss');

                if (this.inquiry.event.time_to) {
                    timeTo = moment(this.inquiry.event.time_to, 'HH:mm:ss');
                }

                if (timeTo === undefined) {
                    return timeFrom.format(format);
                }

                return timeFrom.format(format) + ' - ' + timeTo.format(format);
            }
        },
        methods : {
            getInquiry: function () {
                this.loading = true;
                this.$http.get(laroute.route('admin.rest.inquiries.resource', {inquiry: this.$route.params.inquiryId}))
                    .then(response => {
                        this.inquiry = response.data;
                        this.$parent.setPageTitle(this.inquiry.subject);
                        setTimeout(function(){
                            $('.inquiry-show .collapsible').collapsible()
                        }, 3000);
                        this.loading = false;
                    })
                    .catch(e => {
                        console.error(e);
                        this.errors.push(e)
                    });
            },
            saveInquiry: function() {
                this.$http.put(laroute.route('admin.rest.inquiries.resource', {inquiry: this.$route.params.inquiryId}), {inquiry: this.inquiry})
                    .then(response => {
                        //          this.inquiry = response.data;
                        //          this.$parent.setPageTitle(this.inquiry.subject);
                    })
                    .catch(e => {
                        console.error(e);
                        this.errors.push(e)
                    });
            },
            showInquiry: function (inquiry) {
                this.$router.push({ name: 'inquiries.show', params: { inquiryId: inquiry.id }});
            },
            inquiryChanged: function (inquiry) {
                this.inquiry = inquiry;
            },
            showEditIndustriesModal: function() {
                this.$refs.editIndustriesModal.open();
            },
            showEditTopicsModal: function() {
                this.$refs.editTopicsModal.open();
            },
            showEditSummaryModal: function() {
                this.$refs.editSummaryModal.open();
            },
            showEditWhysModal: function() {
                this.$refs.editWhysModal.open();
            },
            showEditWhatsModal: function() {
                this.$refs.editWhatsModal.open();
            },
            showEditInquiryFilesModal: function() {
                this.$refs.editInquiryFilesModal.open();
            }
        }
    }
</script>

<style lang="scss">
    .inquiry-show {
        .right-side {
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

                .pitches-title.stats, .inquiries-title.stats {
                    h4 {
                        padding: 0;
                        font-family: Roboto, sans-serif;
                        font-size: 15px;
                        font-weight: 500;
                        line-height: 1.6;
                        text-align: left;
                        color: #414745;
                        margin: 0 0 0.5rem 0;
                    }
                }

                .pitches-wrapper, .inquiries-wrapper {
                    margin-bottom: 2.3rem;

                    ul {
                        margin: 0;
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
                                text-transform: capitalize;

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
            }

        }

    }


</style>