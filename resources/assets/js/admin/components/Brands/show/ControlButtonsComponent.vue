<template>
    <div class="pitch-control-buttons" v-if="pitch.statusObj">
        <div v-if="pitch.statusObj.type.upcoming" class="status">Pitch will be pushed {{ pitch.statusObj.title }}</div>
        <div class="buttons">
            <button v-if="pitch.statusObj.type.upcoming" v-on:click="stopSendShowModal" class="btn btn-yellow btn-large">STOP SEND</button>
            <button v-if="pitch.statusObj.type.new || pitch.statusObj.type.rejected" v-on:click="acceptPitchModalShow" class="btn btn-yellow btn-large">ACCEPT PITCH</button>
            <button v-if="pitch.statusObj.type.new" v-on:click="rejectPitchModalShow" class="btn btn-white btn-large">REJECT PITCH</button>
        </div>
        <accept-pitch-modal ref="modalAcceptPitch" v-on:yes="acceptPitch"></accept-pitch-modal>
        <reject-pitch-modal ref="modalRejectPitch" v-on:yes="rejectPitch"></reject-pitch-modal>
        <stop-send-pitch-modal ref="modalStopPitch" v-on:yes="rejectPitch"></stop-send-pitch-modal>
    </div>
</template>

<script type="text/babel">
    import AcceptPitchModal from '../../Modals/ApprovePitchModal.vue';
    import RejectPitchModal from '../../Modals/RejectPitchModal.vue';
    import StopSendPitchModal from '../../Modals/StopSendPitchModal.vue';

    export default {
        components: {
            AcceptPitchModal,
            RejectPitchModal,
            StopSendPitchModal
        },
        props: {
            pitch : {
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
              this.$refs.modalStopPitch.open();
            },
            acceptPitchModalShow: function() {
              this.$refs.modalAcceptPitch.open();
            },
            rejectPitchModalShow: function() {
              this.$refs.modalRejectPitch.open();
            },
            acceptPitch: function () {
                this.$http.put(laroute.route('admin.rest.pitches.set-accept', {'pitch': this.pitch.id}), {model: this.pitch}).then(response => {
                  this.$emit('pitch-changed', response.data);
                });
            },
            rejectPitch: function () {
                this.$http.put(laroute.route('admin.rest.pitches.set-rejected', {'pitch': this.pitch.id}), {model: this.pitch}).then(response => {
                  this.$emit('pitch-changed', response.data);
                });
            }
        }
    }
</script>