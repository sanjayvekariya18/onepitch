<template>
    <div>
        <img v-if="user.photo" :src="user.photo" alt="">
        <span :class="{ 'small': small }" v-if="!user.photo" class="initials">{{ user.initials }}</span>
    </div>
</template>

<script type="text/babel">
    export default {
        props: {
            'user': {},
            'small': {
                'default': false
            }
        }
    }
</script>

<style lang="scss">

    span.initials {
        font-size: 56px;
        position: absolute;
        line-height: 1.8;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-transform: uppercase;
        color: #fff;

        &.small {
            font-size: 18px;
        }
    }

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
</style>