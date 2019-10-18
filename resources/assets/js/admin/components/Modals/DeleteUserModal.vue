<template>
    <div id="modal-delete-user" class="modal" :class="{open: isOpened}">
        <div class="modal-content">
            <h4>Delete User?</h4>

            <div class="row">
                <div class="col-md-12">
                    <p><b>{{ user.full_name }}</b> user and data will be erased using:</p>
                </div>

                <div class="form-group col-md-12">
                    <div class="dropdown">
                        <select-component ref="removeType" value="soft" v-bind:elements="options"></select-component>
                    </div>
                    <label>Select delete type option.</label>
                    <div class="for-textarea"></div>
                </div>
            </div>

        </div>
        <div class="modal-footer">
            <button v-on:click="trigger('no')" class="btn btn-white btn-large">CANCEL</button>
            <button v-on:click="trigger('yes')" class="btn btn-danger btn-large">DELETE</button>
        </div>
    </div>
</template>

<script type="text/babel">
  import $ from 'jquery'
  import SelectComponent from '../Partials/Form/SelectComponent.vue'

  export default {
    components: {
      SelectComponent,
    },
    data () {
      return {
        isOpened: false,
        user: {},
        errors: [],
        options: [
          { title: 'Soft Delete', value: 'soft' },
          { title: 'Hard Delete', value: 'hard' },
        ],
      }
    },
    methods: {
      open: function (user) {
        $('.modal-overlay').css({ display: 'block' })
        this.user = user
        console.log(user)
        this.isOpened = true
      },
      close: function () {
        $('.modal-overlay').css({ display: 'none' })
        this.isOpened = false
      },
      trigger: function (response) {
        if (response === 'yes') {
          this.deleteUser()
        } else {
          this.close()
        }
      },
      deleteUser: function () {
        let removeType = this.$refs.removeType.val()

        this.$http.delete(laroute.route('admin.rest.users.resource.' + removeType, { user: this.user.id })).
          then((response) => {
            alert('Delete Success')

            if (this.user.roleName === 'Publicist') {
              this.$router.push({ name: 'publicists' })
            } else {
              this.$router.push({ name: 'journalists.new' })
            }

            this.close()
          }).
          catch((e) => {
            console.log(e)
          })
      },
    },
  }
</script>

<style lang="scss">
    #modal-delete-user {
        z-index: 1003;
        max-width: 700px;
        width: 100%;
        background-color: #fff;
        top: 120px;
        padding: 24px;

        .modal-footer {
            margin-top: 80px;
        }

        .modal-footer,
        .modal-content {
            padding: 0;

            .btn {
                margin: 0;

                &:first-child {
                    margin-right: 15px;
                }

            }

            .btn-danger {
                background-color: #c9302c;
            }
        }

        .form-group {
            margin-bottom: 10px;

            input {
                padding: 0 15px;
                width: 96%;
                margin: 0;
                border: 1px solid #fff7d6;
                border-bottom-width: 4px;
                overflow: hidden;
                background-color: #fff7d6;
                vertical-align: middle;
                color: #414745;
                font-weight: 400;

                &:focus, &:hover {
                    outline: 0;
                    box-shadow: none;
                    border: 1px solid #414745;
                    border-bottom: 4px solid #414745;
                }
            }

            label {
                font-size: 0.9rem;
            }
        }

        .dropdown {
            height: 48px;
            margin-bottom: 6px;
        }

        &.open {
            display: block;
        }
    }
</style>