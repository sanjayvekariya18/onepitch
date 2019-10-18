<template>
    <div class="user-name-info left-side-block">
        <div class="name"><router-link :to="{name: 'publicists.show', params : {userId: user.id}}">{{ user.full_name }}</router-link></div>
        <div class="company">{{ user.company }}</div>
        <div class="role-name">{{ user.roleName }}</div>
    </div>
</template>

<script type="text/babel">
    export default {
        props: ['user']
    }
</script>

<style lang="scss">
    .user-name-info {

        margin: 8px 0 8px 0;

        .name,
        .company,
        .role-name,
        .name a {
            text-align: center;
            font-family: Roboto, sans-serif;
            color: #414745;
        }

        .name {
            font-size: 16px;
            line-height: 1.5;

        }

        .company {
            font-size: 13px;
            font-weight: 500;
        }

        .role-name {
            margin-top: 4px;
            font-size: 13px;
            font-style: italic;
        }
    }
</style>