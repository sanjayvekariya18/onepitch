<template>
  <div style="height: auto; width: 890px;"  class="list-items" :class="{spinner: loading}">
    <preloader v-if="loading"></preloader>
  

    <div v-show="!loading">
      <div class="table-header">
        <div class="row">
          <div class="col title">New Journalists - {{ users.length }}</div>
          <!-- <div class="col sorter right-align">
                        <date-range-component v-bind:users="users" @filtered-by-date="filteredUsers"></date-range-component>
          </div>-->
        </div>
      </div>

      <datatable
        class:tableData
        :columns="columns"
        :rows="rows"
        :perPage="[10, 25, 50, 100]"
        :defaultPerPage="10"
        v-on:row-click="showProfile"

      >

<th  slot="thead-tr">Actions</th>
 
        <template slot="tbody-tr" scope="props">
          <td>
            <button
              class="btn btn-white btn-large btn-width-96"
              @click.stop="e => denyUserModal(props.row, e)"
            >DENY</button>

            <button
              class="btn btn-yellow btn-large btn-width-96"
              @click.stop="e => approveUserModal(props.row, e)"
            >APPROVE</button>   
            </td>
            
      
            <td class="img fixpostion"> 
              <div class="avatar">
                <avatar-image-initials-component v-bind:small="true" v-bind:user="props.row">
                 </avatar-image-initials-component>
             </div>
             </td> 
        </template>
        

      </datatable>
     
   
    <deny-journalist-modal v-on:yes="denyUser" ref="denyJournalistModal"></deny-journalist-modal>
    <approve-journalist-modal v-on:yes="approveUser" ref="approveJournalistModal"></approve-journalist-modal>
  </div>
 </div>
</template>

<script type="text/babel">
import DenyJournalistModal from "./DenyJournalistModal.vue";
import ApproveJournalistModal from "./ApproveJournalistModal.vue";
import DateRangeComponent from "../Partials/Form/DateRangeComponent.vue";
import Preloader from "../Partials/PreloaderComponent.vue";
import AvatarImageInitialsComponent from "../Partials/Page/Profile/AvatarImageInitialsComponent.vue";
import _ from "lodash";
import $ from "jquery";
import DataTable from "vue-materialize-datatable";

export default {
  components: {
    DenyJournalistModal,
    ApproveJournalistModal,
    DateRangeComponent,
    AvatarImageInitialsComponent,
    Preloader,
    datatable: DataTable
  },
  created() {
    this.$parent.setPageTitle("Journalists");
  },
  mounted() {
    this.$parent.setPageTitle("Journalists");
    this.getUsers();
    Bus.$on("search-query-update", searchQuery => {
      // do your thing
      this.filterJournalists(searchQuery);
    });
  },
  data() {
    return {
      sortOrder: null,
      users: [],
      clonedUsers: [],
      errors: [],
      loading: true,

      onClick: function(e) {}, // Click handler
      clickable: true,  
      
      rows: [],
      columns: [
        {
          id: 2,
          label: "Journalist",
          field: "full_name",
          numeric: true,
          html: true,
          width: "80px"
        },
        {
          id: 3,
          label: "Company",
          field: "company",
          numeric: false,
          html: false,
          width: "auto"
        },
        {
          id: 4,
          label: "Hear About",
          field: "hear_about",
          numeric: false,
          html: false,
          width: "auto"
        },
        {
          id: 5,
          label: "Date Added",
          field: "whenJoining",
          numeric: false,
          html: false,
          width: "auto"
        }
      ]
    };
  },
  methods: {
    getUsers: function() {
      this.loading = true;
      this.$http
        .get(laroute.route("admin.rest.journalists.new", { sort: "desc" }))
        .then(response => {
          var formatted = [];
          let i;
          for (let i = 0; i < response.data.length; i++) {
            formatted[i] = {
              id: response.data[i]["id"],
              full_name: response.data[i]["full_name"],
              company: response.data[i]["company"],
              hear_about: response.data[i]["hear_about"],
              photo:  response.data[i]["photo"],
              whenJoining: response.data[i]["whenJoining"],
              initials: response.data[i]["initials"]
            };
          }

      console.log(formatted);

          this.rows = formatted;
          this.users = response.data;
          this.clonedUsers = _.clone(this.users);
          this.loading = false;
        })
        .catch(e => {
          console.error(e);
          this.errors.push(e);
        });
    },
    showProfile: function(row) {
      
      this.$router.push({
        name: "journalists.show",
        params: { userId: row.id }
      });
    },
    filteredUsers: function(filteredUsers) {
      $(".no-new-journalist-result").show();
      if (filteredUsers) {
        this.rows = filteredUsers;
      } else {
        this.rows = this.clonedUsers;
      }
    },
    sortBy: function(sortProperty, sortOrder) {
      sortOrder = sortOrder === "" || sortOrder === "asc" ? "desc" : "asc";
      _.map(this.columns, function(column) {
        if (column.value === sortProperty) {
          column.order = sortOrder;
          return true;
        }
      });
      this.sortOrder = sortOrder;
      this.rows = _.orderBy(this.rows, sortProperty, this.sortOrder);
    },
    approveUserModal: function(row) {
      this.$refs.approveJournalistModal.open(row);
    },
    approveUser: function(obj) {
      

      obj.user.approved = true;
      this.$http
        .put(
          laroute.route("admin.rest.journalists.resource", { user: obj.user.id }), {user: obj.user}
        )
         .then(response => {

           
                        this.rows = this.rows.filter(function (el) {
                          
                            return el.approved != true;
                        });
                    })
        .catch(e => {
          console.error(e);
          this.errors.push(e);
        });
    },
    denyUserModal: function(row) {
      this.$refs.denyJournalistModal.open(row);
    },
      denyUser: function(obj) {
      
      obj.user.approved = false;
      this.$http
        .put(
          laroute.route("admin.rest.journalists.resource", {
            user: obj.user.id
          }),
          { user: obj.user }
        )
        .then(response => {
          this.rows = this.rows.filter(function(el) {
               return el.approved != false;
          });
        })
        .catch(e => {
          console.error(e);
          this.errors.push(e);
        });
    },
    filterJournalists: function(searchQuery) {
      var hitMatches = [];
      if (searchQuery) {
        if (searchQuery[1] === "industry") {
          hitMatches = _.filter(this.clonedUsers, function(user) {
            return user.industries.some(industry => {
              var industryTitle = industry.title;
              var re = new RegExp(searchQuery[0], "i");
              return industryTitle.match(re);
            });
          });
        } else if (searchQuery[1] === "company") {
          hitMatches = _.filter(this.clonedUsers, function(user) {
            var re = new RegExp(searchQuery[0], "i");
            return user.company.match(re);
          });
        }
        $(".no-new-journalist-result").show();
        this.users = hitMatches;
      } else {
        this.users = this.clonedUsers;
      }
    }
  }
};
</script>

<style lang="scss">
.list-items {
  .table-wrapper {
    th {
      cursor: pointer;

      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently
                                          supported by Chrome and Opera */
    }
  }

  .no-new-journalist-result {
      display: none;
      text-align: center;
      font-size: 24px;
      padding: 50px;
    }
  .newlistitem{
    height: auto!important;
    width: 890px!important;
    /* overflow: scroll; */
}
.card.material-table{
  width: 100%;
    height: 100%;
    overflow: scroll;
}
table tr th, table tr td {
    width: 100px!important;
    overflow: visible;
    padding-left: 20!important;
}
table {
    table-layout: unset!important;
}

 tr.clickable .img.fixpostion {
      position: absolute;
      left: 0;
      width: 150px;
      padding-left: 10px;
      border: none;
  }

td.numeric {
    padding-left: 100px!important;
}
 tr.clickable .img.fixpostion .avatar {
      position: relative;
      background-color: #ffd731;
      border-radius: 50%;
      width: 48px;
      height: 48px;
  }


  
  
}
</style>