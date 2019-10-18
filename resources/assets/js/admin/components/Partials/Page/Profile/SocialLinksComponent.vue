<template>
    <div class="social-links left-side-block">
        <h4>Social Links</h4>
        <ul>
            <li :class="social.type" v-for="social in user.socialLinks"><a :href="social.url" target="_blank">{{ social.link }}</a></li>
        </ul>        
        
        <h4 v-if="user.roleName === 'Journalist' && user.author_url">Author Link</h4>
        <ul v-if="user.roleName === 'Journalist' && user.author_url">
            <li class="author_url"><a :href="user.author_url" target="_blank"><i class="material-icons">link</i>&nbsp;&nbsp;{{ user.author_url }}</a></li>
        </ul>

        <template v-if="user.roleName === 'Publicist'">
            <h4>Phone Number</h4>
            <ul>
                <li class="phone"><a :href="'tel:' + user.phone_number" target="_blank">{{ user.phone_number }}</a></li>
            </ul>
        </template>

        <h4 v-if="user.title">Title</h4>
        <ul v-if="user.title">
            <li class="title"><a :href="'javascript:;'" target="_blank"><i class="material-icons">card_membership</i>&nbsp;&nbsp;{{ user.title }}</a></li>
        </ul>

        <h4 v-if="user.birthday">Birthday</h4>
        <ul v-if="user.birthday">
            <li class="birthday"><a :href="'javascript:;'" target="_blank"><i class="material-icons">cake</i>&nbsp;&nbsp;{{ user.birthday }}</a></li>
        </ul>

        <h4 v-if="user.dailyMailTime">Daily Mail Time Setting</h4>
        <ul>
            <li v-if="user.dailyMailTime" class="time">{{ user.dailyMailTime }} (PST)</li>
            <li v-if="user.dailyMailTimeZone" class="timezone">{{ user.dailyMailTimeZone }}</li>
        </ul>

    </div>
</template>

<script type="text/babel">
    export default {
        props: ['user']
    }
</script>

<style lang="scss">
li.title, li.birthday, li.author_url{padding-left: 0 !important;word-break: break-all !important;}
li.title a i, li.birthday a i, li.author_url a i{    font-size: 17px; float:left;
    padding-top: 2px;
    color: black;}
</style>