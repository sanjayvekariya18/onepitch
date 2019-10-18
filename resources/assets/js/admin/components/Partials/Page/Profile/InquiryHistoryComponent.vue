<template>
    <div class="inquiries-information left-side-block">
        <div class="title">Inquiry History</div>
        <ul v-if="user.countInquiries">
            <li>{{ user.countInquiries.draft }} <span>Draft</span></li>
            <li>{{ user.countInquiries.new }} <span>New</span></li>
            <li>{{ user.countInquiries.upcoming }} <span>Upcoming</span></li>
            <li>{{ user.countInquiries.published }} <span>Published</span></li>
            <li>{{ user.countInquiries.rejected }} <span>Rejected</span></li>
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