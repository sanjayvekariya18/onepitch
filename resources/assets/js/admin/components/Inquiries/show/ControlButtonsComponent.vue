<template>
    <div class="inquiry-control-buttons" v-if="inquiry.statusObj">
        <div v-if="inquiry.statusObj.type.upcoming" class="status">Inquiry will be pushed {{ inquiry.statusObj.title }}</div>
        <div class="buttons">
            <button v-if="inquiry.statusObj.type.upcoming" v-on:click="stopSendShowModal" class="btn btn-yellow btn-large">STOP SEND</button>
            <button v-if="inquiry.statusObj.type.new || inquiry.statusObj.type.rejected" v-on:click="acceptInquiryModalShow" class="btn btn-yellow btn-large">ACCEPT INQUIRY</button>
            <button v-if="inquiry.statusObj.type.new" v-on:click="rejectInquiryModalShow" class="btn btn-white btn-large">REJECT INQUIRY</button>
        </div>
        <accept-inquiry-modal ref="modalAcceptInquiry" v-on:yes="acceptInquiry"></accept-inquiry-modal>
        <reject-inquiry-modal ref="modalRejectInquiry" v-on:yes="rejectInquiry"></reject-inquiry-modal>
        <stop-send-inquiry-modal ref="modalStopInquiry" v-on:yes="rejectInquiry"></stop-send-inquiry-modal>
    </div>
</template>

<script type="text/babel">
    import AcceptInquiryModal from '../../Modals/ApproveInquiryModal.vue';
    import RejectInquiryModal from '../../Modals/RejectInquiryModal.vue';
    import StopSendInquiryModal from '../../Modals/StopSendInquiryModal.vue';

    export default {
        components: {
            AcceptInquiryModal,
            RejectInquiryModal,
            StopSendInquiryModal
        },
        props: {
            inquiry : {
                default: null
            }
        },
        data () {
            return {
                time: 0
            };
        },

        methods: {
            stopSendShowModal: function() {
                this.$refs.modalStopInquiry.open();
            },
            acceptInquiryModalShow: function() {
                this.$refs.modalAcceptInquiry.open();
            },
            rejectInquiryModalShow: function() {
                this.$refs.modalRejectInquiry.open();
            },
            acceptInquiry: function () {
                this.$http.put(laroute.route('admin.rest.inquiries.set-accept', {'inquiry': this.inquiry.id}), {model: this.inquiry}).then(response => {
                    this.$emit('inquiry-changed', response.data);
                });
            },
            rejectInquiry: function () {
                this.$http.put(laroute.route('admin.rest.inquiries.set-rejected', {'inquiry': this.inquiry.id}), {model: this.inquiry}).then(response => {
                    this.$emit('inquiry-changed', response.data);
                });
            }
        }
    }
</script>