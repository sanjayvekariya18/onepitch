<template>
    <div class="pitch-show show-item" :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-show="!loading">
            <div class="comparison-container">
                <left-side v-bind:user="pitch.author">
                    <avatar-component v-if="pitch.author">
                        <router-link :to="{ name: 'publicists.show', params:{ userId: pitch.author.id} }">
                            <avatar-image-initials-component
                                    v-bind:user="pitch.author"></avatar-image-initials-component>
                        </router-link>
                    </avatar-component>
                    <user-name-component v-if="pitch.author" v-bind:user="pitch.author"></user-name-component>
                    <contact-information-component v-if="pitch.author"
                                                   v-bind:user="pitch.author"></contact-information-component>

                    <h6>Pitch Information</h6>

                    <div class="header">

                        Submitted: {{ this.original.submitted }} <br>
                        Accepted: {{ this.original.accepted }} <br>
                        Updated: {{ this.edit.created_at }} <br>
                        Updates: {{ this.editStats.editCount }} <br>
                    </div>
                </left-side>
                <div class="right">
                    <div class="">
                        <div class="title">
                            Subject:
                        </div>
                        <div class="description">
                            <span class="original"> -- {{ this.edit.subject }} </span> <br>
                            <span class="edit"> ++ {{ this.original.subject }} </span>
                        </div>

                        <div class="title">
                            Company:
                        </div>
                        <div class="description">
                            <span class="original"> -- {{ this.edit.company }} </span> <br>
                            <span class="edit"> ++ {{ this.original.company }} </span>
                        </div>

                        <div class="title">
                            Website:
                        </div>
                        <div class="description">
                            <span class="original"> -- {{ this.edit.website }} </span> <br>
                            <span class="edit"> ++ {{ this.original.website }} </span>
                        </div>

                        <div class="title">
                            What:
                        </div>
                        <div class="description">
                            <span class="original"> -- {{ this.edit.what_point_1 }} </span> <br>
                            <span class="edit"> ++ {{ this.original.what_point_1 }} </span>
                        </div>

                        <div class="title">
                            Why:
                        </div>
                        <div class="description">
                            <span class="original"> -- {{ this.edit.why_point_1 }} </span> <br>
                            <span class="edit"> ++ {{ this.original.why_point_1 }} </span>
                        </div>
                        <div class="description">
                            <span class="original"> -- {{ this.edit.why_point_2 }} </span> <br>
                            <span class="edit"> ++ {{ this.original.why_point_2 }} </span>
                        </div>
                        <div class="description">
                            <span class="original"> -- {{ this.edit.why_point_3 }} </span> <br>
                            <span class="edit"> ++ {{ this.original.why_point_3 }} </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Preloader from '../Partials/PreloaderComponent.vue';
    import LeftSide from '../Partials/Page/Profile/LeftSide.vue';
    import UserNameComponent from '../Partials/Page/Profile/UserNameComponent.vue';
    import ContactInformationComponent from '../Partials/Page/Profile/ContactInformationComponent.vue';
    import AvatarComponent from '../Partials/Page/Profile/AvatarComponent.vue';
    import AvatarImageInitialsComponent from '../Partials/Page/Profile/AvatarImageInitialsComponent.vue';

    export default {
        components: {
            Preloader,
            AvatarComponent,
            AvatarImageInitialsComponent,
            LeftSide,
            UserNameComponent,
            ContactInformationComponent
        },
        name: "CompareChangesComponent",
        created() {
            this.getPitch();
        },
        data() {
            return {
                pitch: {},
                original: {},
                editStats: {},
                preBucketUrl: 'https://s3-us-west-1.amazonaws.com/onepitch/',
                edit: {},
                loading: true
            };
        },

        methods: {
            getPitch: function () {
                this.loading = true;
                this.$http.get(laroute.route('admin.rest.pitches.resource.comparison', {pitch: this.$route.params.pitchId}))
                    .then(response => {
                        this.editStats = response.data.stats;
                        this.original = response.data.original;
                        this.edit = response.data.edit;

                        this.pitch = response.data.original;
                        this.loading = false;
                    })
                    .catch(e => {
                        console.error(e);
                        this.errors.push(e)
                    });
            },
        }
    }
</script>

<style lang="scss">
    .show-item {
        margin-bottom: 15px;
    }

    .comparison-container {
        display: flex;
    }

    .comparison-container h6 {
        font-size: 16px;
        line-height: 1.5;
        margin: 1.14rem 0 0.912rem 0;
    }

    .right {
        padding-left: 15px;
        padding-right: 15px;
    }

    .header {
        font-size: 13px;
        line-height: 18px;
        color: #9b9b9b;
    }

    .title {
        border-bottom: 1px solid #ffd831;
        padding: 16px 0 8px;
        font-size: 15px;
        font-weight: 500;
        line-height: 1.6;
        color: #414745;
    }

    .description {
        padding-top: 10px;
    }

    .edit {
        color: #2abf8d;
        font-style: italic;
    }

    .original {
        color: #bf1a1e;
    }
</style>