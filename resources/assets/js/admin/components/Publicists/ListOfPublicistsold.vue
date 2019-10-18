<template>
    <div class="list-items" :class="{spinner: loading}">
        <preloader v-if="loading"></preloader>
        <div v-show="!loading">
            <div class="table-header">
                <div class="row">
                    <div class="col title">Publicists - {{ paginate.total }}
                        <p>
                            Subscribed to Inquiry - {{ subscribed }}
                            <br/>
                            Uploaded Brands by Publicist - {{ branded }}
                        </p>
                    </div>
                    <div class="col with-dropdown" style="float:right">
                        <div class="dropdown">
                            <select-component ref="sorter" value="created_at"
                                              v-bind:elements="values"></select-component>
                        </div>
                        <date-range-component v-bind:publicists="users"
                                              @filtered-by-date="filteredUsers"></date-range-component>
                    </div>
                </div>
            </div>
            <div class="table-wrapper with-header" style="margin-top:150px">
                <table class="table striped highlight clickable">
                    <thead>
                    <tr>
                        <th v-for="column in columns" :colspan="column.extra"
                            v-on:click="sortBy(column.value, column.order)">
                            {{ column.name }}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="user in users" v-on:click="showProfile(user)">
                        <td class="img">
                            <div class="avatar">
                                <avatar-image-initials-component v-bind:small="true"
                                                                 v-bind:user="user"></avatar-image-initials-component>
                            </div>
                        </td>
                        <td>{{ user.full_name }}</td>
                        <td>{{ user.company }}</td>
                        <td>{{ user.hear_about }}</td>
                        <td class="buttons purpley-grey">{{ user.countPitches.all }}</td>
                        <td class="buttons purpley-grey">{{ user.countPitches.draft }}</td>
                        <!--<td class="buttons purpley-grey">{{ user.countPitches.upcoming }}</td>-->
                        <td class="buttons purpley-grey">{{ user.countPitches.published }}</td>
                        <td class="buttons purpley-grey">{{ user.countPitches.rejected }}</td>
                        <td class="buttons purpley-grey">{{ user.hasIndustry }}</td>
                        <td class="buttons purpley-grey">{{ user.countBrands }}</td>
                        <td class="buttons purpley-grey">{{ user.lastLoggedIn }}</td>
                        <td class="buttons purpley-grey">{{ user.whenJoining }}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="no-publicist-result" v-if="users.length < 1">Sorry, no result found...</div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
  import _ from 'lodash'
  import DateRangeComponent from '../Partials/Form/DateRangeComponent.vue'
  import Preloader from '../Partials/PreloaderComponent.vue'
  import AvatarImageInitialsComponent from '../Partials/Page/Profile/AvatarImageInitialsComponent.vue'
  import SelectComponent from '../Partials/Form/SelectComponent.vue'

  export default {
    components: {
      DateRangeComponent,
      Preloader,
      AvatarImageInitialsComponent,
      SelectComponent,
    },
    created () {
      this.$parent.setPageTitle('Publicists')
    },
    mounted () {
      this.$parent.setPageTitle('Publicists')
      this.getUsers()
      Bus.$on('search-query-update', searchQuery => {
        // do your thing
        this.filterPublicists(searchQuery)
      })
    },
    data () {
      return {
        sortOrder: null,
        users: [],
        paginate: {},
        clonedUsers: [],
        clonedPaginate: {},
        errors: [],
        subscribed: 0,
        branded: 0,
        columns: [
          { name: 'Publicist', value: 'full_name', order: '', extra: '2' },
          { name: 'Company', value: 'company', order: '', extra: '*' },
          { name: 'Hear About', value: 'hear_about', order: '', extra: '' },
          { name: 'All Pitches', value: 'countPitches.all', order: '', extra: '' },
          { name: 'Draft Pitches', value: 'countPitches.draft', order: '', extra: '' },
          // {name: 'Upcoming Pitches', value: 'countPitches.upcoming', order: '', extra: ''},
          { name: 'Published Pitches', value: 'countPitches.published', order: '', extra: '' },
          { name: 'Rejected Pitches', value: 'countPitches.rejected', order: '', extra: '' },
          { name: 'Subscribed to Inquiry', value: 'hasIndustry', order: '', extra: '' },
          { name: 'Brands Added', value: 'countBrands', order: '', extra: '' },
          { name: 'Last Login', value: 'last_login', order: '', extra: '' },
          { name: 'Date Added', value: 'created_at.date', order: '', extra: '' },
        ],
        values: [
          { title: 'Last Login', value: 'last_login' },
          { title: 'Date Added', value: 'created_at' },
        ],
        loading: true,
      }
    },
    methods: {
      getUsers: function () {
        this.loading = true
        this.$http.get(laroute.route('admin.rest.publicists.extended', { sort: 'desc' })).then(response => {
          // Add Scroll Event Listener for Infinite Scroll
          this.listElm = document.querySelector('div.table-wrapper')
          this.listElm.addEventListener('scroll', this.handleScroll)
          this.paginate = response.data[0]
          this.subscribed = response.data[2]
          this.branded = response.data[3]

          this.users = response.data[1]
          this.clonedUsers = _.clone(this.users)
          this.clonedPaginate = _.clone(this.paginate)
          this.loading = false
        }).catch(e => {
          console.error(e)
          this.errors.push(e)
        })
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
        this.users = _.orderBy(this.users, sortProperty, this.sortOrder)
      },
      showProfile: function (user) {
        this.$router.push({ name: 'publicists.show', params: { userId: user.id } })
      },
      filteredUsers: function (filteredUsers) {
        if (filteredUsers) {
          this.users = filteredUsers
          this.paginate.total = this.users.length
          this.listElm.removeEventListener('scroll', this.handleScroll)
        } else {
          this.users = this.clonedUsers
          this.paginate.total = this.clonedPaginate.total
          this.listElm.addEventListener('scroll', this.handleScroll)
        }
      },
      filterPublicists: function (searchQuery) {
        var hitMatches = []
        if (searchQuery) {
          if (searchQuery[1] === 'company') {
            hitMatches = _.filter(this.clonedUsers, function (user) {
              var re = new RegExp(searchQuery[0], 'i')
              return user.company.match(re)
            })
          }
          this.users = hitMatches
        } else {
          this.users = this.clonedUsers
        }
      },
      handleScroll: function (el) {
        var tableElement = el.path[0]
        if (tableElement.scrollTop + tableElement.clientHeight >= tableElement.scrollHeight) {
          this.loadMore()
        }
      },
      loadMore: function () {
        this.$http.get(this.paginate.next_page_url).then(response => {
          this.users = _.union(this.users, response.data[1])
          this.paginate = response.data[0]
          this.clonedUsers = _.clone(this.users)
        }).catch(e => {
          console.error(e)
        })
      },
    },
  }
</script>

<style lang="scss">
    .list-items {
        .with-dropdown {
            .select-component .select-wrapper input[type=text]:not(.browser-default) {
                height: 80%;
            }
        }

        .title {
            p {
                font-size: 14px;
                margin-top: 5px;
            }
        }

        .table-wrapper {
            th {
                cursor: pointer;

                -webkit-touch-callout: none; /* iOS Safari */
                -webkit-user-select: none; /* Safari */
                -khtml-user-select: none; /* Konqueror HTML */
                -moz-user-select: none; /* Firefox */
                -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none;
                /* Non-prefixed version, currently
                                                         supported by Chrome and Opera */
            }
        }

        .no-publicist-result {
            text-align: center;
            font-size: 24px;
            padding: 50px;
        }
    }
</style>