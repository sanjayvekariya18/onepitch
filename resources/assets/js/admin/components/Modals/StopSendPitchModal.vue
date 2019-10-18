<template>
    <div id="modal-stop-pitch" class="modal" :class="{open: isOpened}">
        <div class="modal-content">
            <h4>Stop Send</h4>
            <p>Are you sure you want to stop this pitch from being sent? This pitch will go into Rejected Pitches, and can be re-accepted at any time.</p>
        </div>
        <div class="modal-footer">
            <button v-on:click="trigger('no')" class="btn btn-default">CANCEL</button>
            <button v-on:click="trigger('yes')" class="btn btn-yellow">YES, STOP SEND</button>
        </div>
    </div>
</template>

<script type="text/babel">
  import $ from 'jquery';

  export default {
    data () {
      return {
        isOpened: false,
        newMail: '',
        newMailConfirm: '',
        errors: []
      };
    },
    methods: {
      open: function () {
        this.clearData();
        $('.modal-overlay').css({display: 'block'});
        this.isOpened = true;
      },
      close: function () {
        $('.modal-overlay').css({display: 'none'});
        this.isOpened = false;
      },
      trigger: function (value) {
        if (this.newMail === this.newMailConfirm) {
          this.$emit(value, this.newMailConfirm);
          this.close();
        } else {
          this.errors.push('Email addresses must match.');
        }
      },
      clearData: function () {
        this.newMail = '';
        this.newMailConfirm = '';
        this.errors = [];
      }
    }
  }
</script>

<style lang="scss">
    #modal-stop-pitch {
        z-index: 1003;
        width: 560px;
        background-color: #fff;

        padding: 24px;

        .modal-footer,
        .modal-content {
            background-color: #fff;
            padding: 0;

            .btn {
                margin: 12px;
            }
        }

        &.open {
            display: block;
            top: 240px;
        }
    }
</style>