<template>
    <div class="profile-component">
        <button v-on:click.stop="openDropDown = !openDropDown" class="nav-button">
            <avatar-image-initials-component v-bind:small="true" v-bind:user="user"></avatar-image-initials-component>
        </button>
        <ul class="dropdown" v-show="openDropDown">
            <li><a v-on:click="logoutRequest">Sign Out</a></li>
        </ul>
    </div>
</template>

<script type="text/babel">
    import AvatarImageInitialsComponent from '../Partials/Page/Profile/AvatarImageInitialsComponent.vue';

    export default {
        components: {
            AvatarImageInitialsComponent
        },
        created () {
            document.addEventListener('click', this.documentClick);
        },
        data () {
            return {
                openDropDown: false
            };
        },
        props: {
            user: {
                type: Object
            }
        },
        methods: {
            documentClick(){
                this.openDropDown = false;
            },
            logoutRequest: function () {
                this.$http.get(laroute.route('admin.rest.auth.logout'))
                .then(() => {
                    location.reload();
                });
            }
        }
    }
</script>
