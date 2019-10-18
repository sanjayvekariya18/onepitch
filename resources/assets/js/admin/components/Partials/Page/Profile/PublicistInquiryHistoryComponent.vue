<template>
    <div class="inquiries-information left-side-block">
        <div class="title">Inquiry History</div>
        <ul v-if="user.countPublicistInquiries">
            <li>{{ user.countPublicistInquiries.saved }} <span>Saved</span></li>
            <li>{{ user.countPublicistInquiries.all }} <span>All</span></li>
        </ul>
    </div>
</template>

<script type="text/babel">
    export default {
        props: ['user']
    }
</script>

<style lang="scss">
    .inquiries-information {
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