<template>
    <div class="social-links left-side-block">
        <h4>Contact Information</h4>
        <ul>
            <li :class="social.type" v-for="social in user.socialLinks">{{ social.link }}</li>
            <li class="email">{{ user.email }}</li>
        </ul>
    </div>
</template>

<script type="text/babel">
    export default {
        props: ['user']
    }
</script>

<style lang="scss">
    .social-links {
        ul {
            li {
                overflow: hidden;
                text-overflow: ellipsis;

                &.email {
                    line-height: 1;
                    word-wrap: break-word;
                }

            }
        }
    }
</style>