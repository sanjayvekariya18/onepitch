<template>
    <div class="pitch-show show-item" :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-if="pitch.status" v-show="!loading" class="content show-item-content">
            <left-side v-bind:user="pitch.author">
                <avatar-component v-if="pitch.author">
                    <router-link :to="{ name: 'publicists.show', params:{ userId: pitch.author.id} }">
                        <avatar-image-initials-component v-bind:user="pitch.author"></avatar-image-initials-component>
                    </router-link>
                </avatar-component>
                <user-name-component v-if="pitch.author" v-bind:user="pitch.author"></user-name-component>
                <pitch-history-component v-if="pitch.author" v-bind:user="pitch.author"></pitch-history-component>
                <contact-information-component v-if="pitch.author" v-bind:user="pitch.author"></contact-information-component>
            </left-side>
            <div class="right-side">
                <div class="header-side" v-if="pitch.status" >
                    <div class="date-information">
                        <div v-if="pitch.statusObj.type.new || pitch.statusObj.type.upcoming || pitch.statusObj.type.published || pitch.statusObj.type.rejected">
                            <span class="submitted">Submitted:  {{ pitchSubmittedDate }}</span>
                        </div>
                        <div v-if="pitch.statusObj.type.rejected">
                            <span class="submitted">Rejected:  {{ pitchRejectedDate }}</span>
                        </div>
                        <div v-if="pitch.accepted_at && (pitch.statusObj.type.upcoming || pitch.statusObj.type.published)">
                            <span class="submitted">Accepted:  {{ pitchAcceptedDate }}</span>
                        </div>
                        <div v-if="pitch.statusObj.type.published">
                            <span class="submitted">Published:  {{ pitchPublishedDate }}</span>
                        </div>
                        <div v-if="pitch.statusObj.type.published || pitch.statusObj.type.upcoming">
                            <span class="submitted">Opens:  {{ pitch.opens }}</span>
                        </div>
                        <div v-if="pitch.statusObj.type.published || pitch.statusObj.type.upcoming">
                            <span class="submitted">Clicks:  {{ pitch.clicks }}</span>
                        </div>
                        <div v-if="pitch.statusObj.type.published || pitch.statusObj.type.upcoming">
                            <span class="submitted">Responses:  {{ pitch.responses }}</span>
                        </div>
                    </div>
                    <control-buttons-component v-if="!pitch.statusObj.type.published" v-on:pitch-changed="pitchChanged" v-bind:pitch="pitch"></control-buttons-component>
                    <div class="titles">
                        <tags-component v-on:edit="showEditSummaryModal" v-bind:editable="true">
                            <span slot="title">{{ pitch.subject }}</span>
                        </tags-component>
                        <edit-summary-modal v-on:yes="getPitch" v-bind:summary-pitch="pitch" ref="editSummaryModal"></edit-summary-modal>
                        <h6>Brand: {{ pitch.company }}</h6>
                        <h6 v-if="pitch.website">Website: <a :href="pitch['http-website']" target="_blank">{{ pitch.website }}</a></h6>
                    </div>
                </div>
                <div class="body-side">
                    <div v-if="pitch.journalists.sent.length">
                        <div class="pitches-title stats">
                            <h4>Journalists Report</h4>
                        </div>
                        <div class="pitches-wrapper">
                            <ul class="collapsible" data-collapsible="expandable">
                                <li v-for="(type, typeName) in pitch.journalists">
                                    <div class="collapsible-header">{{ typeName }} ({{ type.length }}) <span class="caret"><i v-if="type.length" class="material-icons">keyboard_arrow_down</i></span></div>
                                    <div v-if="type.length" class="collapsible-body"><span v-for="(user, key) in type"><span v-if="key">,</span> {{ user.company }} (<a
                                            :href='"mailto:" + user.email'>{{ user.email }}</a>)</span></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div v-if="pitch.tags">
                        <tags-component v-on:edit="showEditIndustriesModal" v-bind:tags="pitch.tags.industries" v-bind:editable="true">
                            <span slot="title">Industries</span>
                        </tags-component>
                        <edit-industries-modal v-on:yes="getPitch" v-bind:pitch="pitch" ref="editIndustriesModal"></edit-industries-modal>
                        <tags-component v-on:edit="showEditTopicsModal" v-bind:tags="pitch.tags.topics" v-bind:editable="true">
                            <span slot="title">Topics</span>
                        </tags-component>
                        <edit-topics-modal v-on:yes="getPitch" v-bind:passed-pitch="pitch" ref="editTopicsModal"></edit-topics-modal>
                    </div>
                    <div v-if="pitch.event" class="pitch-event-component">
                        <tags-component v-on:edit="showEditPitchEventModal" v-bind:editable="true">
                            <span slot="title">Deadline</span>
                        </tags-component>
                        <div class="information">
                            <div class="line">{{ pitch.event.title }}</div>
                            <div class="line">Date: {{ eventDate }}</div>
                            <div class="line">Time: {{ eventTime }}</div>
                        </div>
                        <edit-pitch-event-modal v-on:yes="getPitch" v-bind:event-pitch="pitch" ref="editPitchEventModal"></edit-pitch-event-modal>
                    </div>
                    <div class="general-info-pitch">
                        <div class="section">
                            <div class="section-title">
                                <tags-component v-on:edit="showEditWhatsModal" v-bind:editable="true">
                                    <span slot="title">What</span>
                                </tags-component>
                                <edit-whats-modal v-on:yes="getPitch" v-bind:whats-pitch="pitch" ref="editWhatsModal"></edit-whats-modal>
                            </div>
                            <ul class="section-list">
                                <li v-for="what in pitch.what">{{ what }}</li>
                            </ul>
                            <div class="section-title">
                                <tags-component v-on:edit="showEditWhysModal" v-bind:editable="true">
                                    <span slot="title">Why</span>
                                </tags-component>
                                <edit-whys-modal v-on:yes="getPitch" v-bind:whys-pitch="pitch" ref="editWhysModal"></edit-whys-modal>
                            </div>
                            <ul class="section-list">
                                <li v-for="why in pitch.why">{{ why }}</li>
                            </ul>
                            <div v-if="pitch['press-release']">
                                <div class="section-title">
                                    <tags-component v-on:edit="showEditPitchPressReleaseModal" v-bind:editable="true">
                                        <span slot="title">Press Release</span>
                                    </tags-component>
                                    <edit-pitch-press-release-modal v-on:yes="getPitch" v-bind:press-release-pitch="pitch" ref="editPitchPressReleaseModal"></edit-pitch-press-release-modal>
                                </div>
                                <ul class="section-list">
                                    <li>
                                        <a :href="preBucketUrl + pitch['press-release'].url" target="_blank">{{ pitch['press-release'].name }}</a>
                                    </li>
                                </ul>
                            </div>
                            <div v-if="pitch.files[0]">
                                <div class="section-title">
                                    <tags-component v-on:edit="showEditPitchFilesModal" v-bind:editable="true">
                                        <span slot="title">Files</span>
                                    </tags-component>
                                    <edit-pitch-files-modal v-on:yes="getPitch" v-bind:files-pitch="pitch" ref="editPitchFilesModal"></edit-pitch-files-modal>
                                </div>
                                <ul class="section-list">
                                    <li v-for="file in pitch.files">
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
    import $ from 'jquery';
    import LeftSide from '../Partials/Page/Profile/LeftSide.vue';
    import ControlButtonsComponent from './show/ControlButtonsComponent.vue';
    import TagsComponent from './show/TagsComponent.vue';
    import AvatarComponent from '../Partials/Page/Profile/AvatarComponent.vue';
    import AvatarImageInitialsComponent from '../Partials/Page/Profile/AvatarImageInitialsComponent.vue';
    import UserNameComponent from '../Partials/Page/Profile/UserNameComponent.vue';
    import PitchHistoryComponent from '../Partials/Page/Profile/PitchHistoryComponent.vue';
    import ContactInformationComponent from '../Partials/Page/Profile/ContactInformationComponent.vue';
    import EditIndustriesModal from '../Modals/EditIndustriesModal.vue';
    import EditTopicsModal from '../Modals/EditTopicsModal.vue';
    import EditSummaryModal from '../Modals/EditSummaryModal.vue';
    import EditWhysModal from '../Modals/EditWhysModal.vue';
    import EditWhatsModal from '../Modals/EditWhatsModal.vue';
    import EditPitchPressReleaseModal from '../Modals/EditPitchPressReleaseModal.vue';
    import EditPitchFilesModal from '../Modals/EditPitchFilesModal.vue';
    import EditPitchEventModal from '../Modals/EditPitchEventModal.vue';
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
            PitchHistoryComponent,
            ContactInformationComponent,
            EditIndustriesModal,
            EditTopicsModal,
            EditSummaryModal,
            EditWhysModal,
            EditWhatsModal,
            EditPitchPressReleaseModal,
            EditPitchFilesModal,
            EditPitchEventModal,
            Preloader
        },
        created () {
            this.getPitch();
        },
        data () {
            return {
                pitch: {},
                preBucketUrl: 'https://s3-us-west-1.amazonaws.com/onepitch/',
                errors: [],
                loading: true
            };
        },
        computed: {
            pitchSubmittedDate: function () {
                return moment(this.pitch.uploaded_at).format('MMMM D[,] YYYY [at] hh:mm A');
            },
            pitchAcceptedDate: function () {
                return moment(this.pitch.accepted_at).format('MMMM D[,] YYYY [at] hh:mm A');
            },
            pitchPublishedDate: function () {
                if (this.pitch.sent_at != null) {
                    return moment(this.pitch.sent_at).format('MMMM D[,] YYYY [at] hh:mm A');
                }

                return 'No matches';
            },
            pitchRejectedDate: function () {
                return moment(this.pitch.accepted_at).format('MMMM D[,] YYYY [at] hh:mm A');
            },
            dateFrom: function () {
                return moment(this.pitch.event.date_from, 'HH:mm:ss').format('hh:mm A');
            },
            dateTo: function () {
                return moment(this.pitch.event.date_to, 'HH:mm:ss').format('hh:mm A');
            },
            timeFrom: function () {
                return moment(this.pitch.event.time_from, 'HH:mm:ss').format('hh:mm A');
            },
            timeTo: function () {
                return moment(this.pitch.event.time_to, 'HH:mm:ss').format('hh:mm A');
            },
            eventDate: function () {
                let dateFrom = moment(this.pitch.event.date_from, 'YYYY-MM-DD');
                let dateTo = undefined;

                if (this.pitch.event.date_to) {
                    dateTo = moment(this.pitch.event.date_to, 'YYYY-MM-DD');
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
                if (this.pitch.event.time_from == null) {
                    return 'All day';
                }

                let format = 'hh:mm A';
                let timeTo = undefined;
                let timeFrom = moment(this.pitch.event.time_from, 'HH:mm:ss');

                if (this.pitch.event.time_to) {
                    timeTo = moment(this.pitch.event.time_to, 'HH:mm:ss');
                }

                if (timeTo === undefined) {
                    return timeFrom.format(format);
                }

                return timeFrom.format(format) + ' - ' + timeTo.format(format);
            }
        },
        methods : {
            getPitch: function () {
                this.loading = true;
                this.$http.get(laroute.route('admin.rest.pitches.resource', {pitch: this.$route.params.pitchId}))
                    .then(response => {
                        this.pitch = response.data;
                        this.$parent.setPageTitle(this.pitch.subject);
                        setTimeout(function(){
                            $('.pitch-show .collapsible').collapsible()
                        }, 3000);
                        this.loading = false;
                })
                .catch(e => {
                    console.error(e);
                    this.errors.push(e)
                });
            },
            savePitch: function() {
                this.$http.put(laroute.route('admin.rest.pitches.resource', {pitch: this.$route.params.pitchId}), {pitch: this.pitch})
                    .then(response => {
                    //          this.pitch = response.data;
                    //          this.$parent.setPageTitle(this.pitch.subject);
                })
                .catch(e => {
                    console.error(e);
                    this.errors.push(e)
                });
            },
            showPitch: function (pitch) {
                this.$router.push({ name: 'pitches.show', params: { pitchId: pitch.id }});
            },
            pitchChanged: function (pitch) {
                this.pitch = pitch;
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
            showEditPitchPressReleaseModal: function() {
                this.$refs.editPitchPressReleaseModal.open();
            },
            showEditPitchFilesModal: function() {
                this.$refs.editPitchFilesModal.open();
            },
            showEditPitchEventModal: function() {
                this.$refs.editPitchEventModal.open();
            }
        }
    }
</script>

<style lang="scss">
    .pitch-show {
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