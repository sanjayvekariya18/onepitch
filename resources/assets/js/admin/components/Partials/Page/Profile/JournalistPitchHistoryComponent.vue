<template>
    <div class="pitches-information left-side-block">
        <div class="title">Pitch History</div>
        <ul v-if="user.countJournalistPitches">
            <li>{{ user.countJournalistPitches.saved }} <span>Saved</span></li>
            <li>{{ user.countJournalistPitches.all }} <span>All</span></li>
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