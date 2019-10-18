<template>
    <div id="modal-add-alert" class="modal alert-modal" :class="{open: isOpened}">
        <div class="modal-content">
            <h4>{{(alert.id)? 'Edit':'Add'}} Alert</h4>
            <div class="row">
                <div class="form-group col-sm-12">
                    <div class="dropdown">
                        <select-component ref="filter" value="1" v-bind:elements="filters"
                                          v-on:change="changeFilter"></select-component>
                    </div>
                    <label>Select filtered type options.</label>
                    <div class="for-textarea"></div>
                </div>

                <div class="form-group col-sm-12" v-show="filterSelectionId === 1">
                    <input type="text" class="form-control" name="user_id" id="user_id" v-model="alert.user_id"
                           placeholder="Add single user id or multiple values separating by comma without whitespace...">
                    <label for="user_id">User Id</label>
                    <div class="counter"></div>
                </div>

                <div class="form-group col-sm-12" v-show="filterSelectionId === 2">
                    <div class="dropdown">
                        <select-component ref="role" value="1" v-bind:elements="roles"></select-component>
                    </div>
                    <label>Select role type.</label>
                    <div class="for-textarea"></div>
                </div>

                <div class="form-group col-sm-12">
                    <input type="text" class="form-control" name="link" id="link" v-model="alert.link"
                           placeholder="Link url attached to the alert box wrapper...">
                    <label for="link">Hyperlink</label>
                    <div class="counter"></div>
                </div>

                <div class="form-group col-sm-12">
                    <textarea class="form-control" name="message" id="message" v-model="alert.message"
                              placeholder="What is the message for this alert."></textarea>
                    <label for="message">What is the message for this Alert.</label>
                    <div class="counter"></div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div v-if="!this.saving">
                <button v-on:click="trigger('no')" class="btn btn-default">CANCEL</button>
                <button v-on:click="trigger('yes')" v-if="!alert.id" class="btn btn-yellow"
                        :disabled="invalidForm()">ADD ALERT
                </button>
                <button v-on:click="trigger('edit')" v-if="alert.id" class="btn btn-yellow"
                        :disabled="invalidForm()">SAVE CHANGES
                </button>
                <button v-on:click="trigger('del')" v-if="alert.id" class="btn btn-danger">DELETE ALERT</button>

            </div>
            <div v-if="this.saving" class="text-right">
                Processing please wait...
            </div>
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
        filterSelectionId: 1,
        isOpened: false,
        saving: false,
        filters: [
          { title: 'User Id', value: '1' },
          { title: 'Role', value: '2' },
        ],
        roles: [
          { title: 'Journalist', value: '1' },
          { title: 'Publicist', value: '2' },
        ],
      }
    },
    props: ['alert'],
    methods: {
      loadAlertData: function (alertData) {
        if (alertData.user_id) {
          this.$refs.filter.selectValue('1')
        }
        if (alertData.role) {
          this.$refs.role.selectValue(alertData.role_id + '')
          this.$refs.filter.selectValue('2')
        }
      },
      validateForm: function () {
        let term = this.alert.user_id
        let splitTerms = term.split(',')

        // Validate user id input
        if (splitTerms.length > 1) {
          let re = new RegExp('^[0-9]+((,)[0-9]+)+$')
          if (!re.test(term)) {
            alert('Invalid input for User Id textfield')
            return false
          }
        } else {
          let re = new RegExp('^[0-9]+$')
          if (!re.test(term)) {
            alert('Invalid input for User Id textfield')
            return false
          }
        }

        // Validate link input
        let linkUrl = this.alert.link

        if (linkUrl) {
          let isValidUrl = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i
          if (!isValidUrl.test(linkUrl)) {
            alert('Invalid input for Link textfield')
            return false
          }
        }

        return true
      },
      changeFilter: function (selectComponent) {
        this.filterSelectionId = parseInt(selectComponent.inValue)

        if (this.filterSelectionId === 1) {
          this.alert.role = null
        }
        if (this.filterSelectionId === 2) {
          this.alert.role = this.$refs.role.val()
          this.alert.user_id = null
        }
      },
      open: function () {
        $('.modal-overlay').css({ display: 'block' })
        this.isOpened = true
      },
      openEdit: function (alertData) {
        $('.modal-overlay').css({ display: 'block' })
        this.isOpened = true
        this.loadAlertData(alertData)
      },
      close: function () {
        $('.modal-overlay').css({ display: 'none' })
        this.isOpened = false
      },
      trigger: function (value) {
        if (value === 'yes') {
          this.addAlert()
        } else if (value === 'edit') {
          this.editAlert()
        } else if (value === 'del') {
          this.deleteAlert()
        } else {
          this.close()
        }
      },
      addAlert: function () {
        this.saving = true
        let isValid = this.validateForm()

        if (!isValid) {
          this.saving = false
          return false
        }

        this.$http.post(laroute.route('admin.rest.alerts.'), this.alert).then((response) => {
          this.$parent.getAlerts()
          this.close()
        }).catch((e) => {
          this.errors = e.response.data
          alert('Incorrect input')
        }).finally(() => this.saving = false)
      },
      editAlert: function () {
        this.saving = true

        let isValid = this.validateForm()

        if (!isValid) {
          this.saving = false
          return false
        }

        this.$http.put(laroute.route('admin.rest.alerts.resource', { alert: this.alert.id }), this.alert).
          then((response) => {
            this.$parent.getAlerts()
            this.close()
          }).
          catch((e) => {
            this.errors = e.response.data
            alert('Incorrect input')
          }).
          finally(() => this.saving = false)
      },
      deleteAlert: function () {
        this.saving = true
        this.$http.delete(laroute.route('admin.rest.alerts.resource', { alert: this.alert.id })).then((response) => {
          this.$parent.getAlerts()
          this.close()
        }).catch((e) => {
          this.errors = e.response.data
          alert('Incorrect input')
        }).finally(() => this.saving = false)
      },
      invalidForm: function () {
        return this.filterSelectionId === 1 && !this.alert.user_id || !this.alert.message
      },
    },
  }
</script>

<style lang="scss">
    #modal-add-alert {
        z-index: 1003;
        max-width: 968px;
        width: 100%;
        background-color: #fff;
        top: 120px;
        padding: 24px;

        .modal-footer,
        .modal-content {
            background-color: #fff;
            padding: 0;

            .btn {
                margin: 12px;
            }

            .btn-danger {
                background-color: #c9302c;
                float: left;
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

            textarea.form-control {
                padding: 15px 15px 12px 15px;
                border: 1px solid #fff7d6;
                border-bottom-width: 4px;
                height: 97px;
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
        }

        .dropdown {
            height: 48px;
            margin-bottom: 6px;
        }

        &.open {
            display: block;
        }
    }


    .popover-content-wrapper {
        left: 80px;
    }
</style>