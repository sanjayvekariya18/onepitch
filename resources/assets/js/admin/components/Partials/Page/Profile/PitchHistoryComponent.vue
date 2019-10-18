<template>
    <div class="pitches-information left-side-block">
        <div class="title">Pitch History</div>
        <ul v-if="user.countPitches">
            <li>{{ user.countPitches.draft }} <span>Draft</span></li>
            <li>{{ user.countPitches.new }} <span>New</span></li>
            <li>{{ user.countPitches.upcoming }} <span>Upcoming</span></li>
            <li>{{ user.countPitches.published }} <span>Published</span></li>
            <li>{{ user.countPitches.rejected }} <span>Rejected</span></li>
        </ul>
    </div>
</template>

<script type="text/babel">
    export default {
        props: ['user']
    }
</script>

<style lang="scss">
    .pitches-information {
        margin-top: 16px;

        ul {
            li {
                span {
                    text-transform: capitalize;
                }
            }
        }
    }
</style>