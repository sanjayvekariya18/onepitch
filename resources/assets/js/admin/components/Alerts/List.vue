<template>
    <div class="list-items alerts" :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-show="!loading">
            <div class="table-header">
                <div class="row">
                    <div class="col title">Total Alerts:</div>
                    <div class="col sorter right-align">
                        <button v-on:click="showAddAlertModal" class="btn btn-yellow btn-large">
                            CREATE NEW
                        </button>
                    </div>
                </div>
            </div>
            <div class="table-wrapper with-header">
                <table class="table striped">
                    <thead>
                    <tr>
                        <th v-for="column in columns" :colspan="column.extra"
                            v-on:click="sortBy(column.value, column.order)">
                            {{ column.name }}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="alert in alerts" v-on:click="showEditAlertModal(alert)">
                        <td>{{ alert.id }}</td>
                        <td>{{ alert.filter }}</td>
                        <td>{{ alert.message | elipsis }}</td>
                        <td>{{ alert.status }}</td>
                        <td>{{ alert.updated_at }}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="no-result" v-if="alerts.length < 1">Sorry, no result found...</div>
            </div>
            <div class="add-alert-button" v-on:click="showAddAlertModal"><i class="material-icons">add_circle</i>
            </div>
            <add-alert-modal v-bind:alert="alert" ref="addAlertModal"></add-alert-modal>
        </div>
    </div>
</template>

<script type="text/babel">
  import AddAlertModal from './AddAlertModal.vue'
  import Preloader from '../Partials/PreloaderComponent.vue'

  export default {
    components: {
      AddAlertModal,
      Preloader,
    },
    mounted () {
      this.$parent.setPageTitle('Alerts')
      this.getAlerts()
    },
    data () {
      return {
        sortOrder: null,
        sort: 'desc',
        alert: {},
        alerts: [],
        errors: [],
        columns: [
          { name: 'ID', value: 'id', order: '', extra: '' },
          { name: 'Filter', value: 'filter', order: '', extra: '' },
          { name: 'Message', value: 'message', order: '', extra: '' },
          { name: 'Status', value: 'status', order: '', extra: '' },
          { name: 'Last Update', value: 'updated_at', order: '', extra: '' },
        ],
        loading: false,
      }
    },
    filters: {
      elipsis: function (value) {
        return (value.length > 60) ? value.substring(0, 60) + '...' : value
      },
    },
    methods: {
      getAlerts: function () {
        this.loading = true
        this.$http.get(laroute.route('admin.rest.alerts.')).then(response => {
          this.alerts = response.data
        }).catch(e => {
          console.error(e)
          this.errors.push(e)
        }).finally(() => this.loading = false)
      },
      sortBy: function (sortProperty, sortOrder) {
        sortOrder = (sortOrder === '' || sortOrder === 'asc') ? 'desc' : 'asc'
        _.map(this.columns, function (column) {
          if (column.value === sortProperty) {
            column.order = sortOrder
            return true
          }
        })
        this.sortOrder = sortOrder
        this.alerts = _.orderBy(this.alerts, sortProperty, this.sortOrder)
      },
      showAddAlertModal: function () {
        this.alert = {
          message: null,
          role: null,
          user_id: null,
          link: null,
        }
        this.$refs.addAlertModal.open()
      },
      showEditAlertModal: function (alert) {
        this.alert = {
          id: alert.id,
          message: alert.message,
          role: alert.role_id,
          user_id: alert.user_id,
          link: alert.link,
        }

        this.$refs.addAlertModal.openEdit(alert)
      },
    },
  }
</script>


<style lang="scss">
    .list-items.alerts {
        table.table {
            tbody {
                tr {
                    cursor: pointer;

                    td:last-child {
                        text-align: left;
                    }
                }
            }
        }

        .add-alert-button {
            position: absolute;
            right: 3%;
            bottom: 2%;
            color: #DB4437;
            cursor: pointer;

            .material-icons {
                font-size: 56px;
            }
        }

        .no-result {
            display: block;
            text-align: center;
            font-size: 24px;
            padding: 50px;
        }
    }
</style>