<template>
    <div id="modal-edit-pass" class="modal" :class="{open: isOpened}">
        <div class="modal-content">
            <h4>Make an Admin?</h4>
            <p>Are you sure you want to make this user an Admintrator?</p>
        </div>
        <div class="modal-footer">
            <button v-on:click="trigger('no')" href="#!" class="btn btn-default">CANCEL</button>
            <button v-on:click="trigger('yes')" href="#!" class="btn btn-yellow">YES</button>
        </div>
    </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    data () {
      return {
        isOpened: false,
        newMail: '',
        newMailConfirm: '',
      }
    },
    methods: {
      open: function () {
        $('.modal-overlay').css({ display: 'block' })
        this.isOpened = true
      },
      close: function () {
        $('.modal-overlay').css({ display: 'none' })
        this.isOpened = false
      },
      trigger: function (value) {

        if (this.newMail === this.newMailConfirm) {
          this.close()
          this.$emit(value, this.newMailConfirm)
        }

      },
    },
  }
</script>

<style lang="scss">
    #modal-edit-pass {
        width: 560px;
        background-color: #fff;
        padding: 24px;

        h4 {
            font-family: Roboto, sans-serif;
            font-size: 34px;
            text-align: left;
            color: #414745;
        }

        .modal-footer,
        .modal-content {
            background-color: #fff;
            padding: 0;

            input {
                background-color: #fff7d6;
                height: 64px;
                padding: 18px 16px 22px;
                border: none;
                box-sizing: border-box;
                font-family: Roboto, sans-serif;
                font-size: 16px;
                line-height: 1.5;
                text-align: left;
                color: #9b9b9b;

                &:focus {
                    border: none;
                    box-shadow: none;
                }
            }

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