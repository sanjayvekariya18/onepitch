
<template>
  <div class="list-items" :class="{spinner: loading}">
    <preloader v-if="loading"></preloader>
    <div v-show="!loading">
      <div class="table-header">
        <div class="row">
          <div class="col title">Approved Journalists - {{ paginate.total }}</div>
         
              <!-- <div class="dropdown">
                            <select-component ref="sorter" value="created_at" v-bind:elements="values"></select-component>
                        </div>
                        <date-range-component v-bind:journalists="users" @filtered-by-date="filteredUsers"></date-range-component>
                    </div> -->
                     
          </div>
        </div>
     

      <datatable
        title
        :columns="columns"
        :rows="rows"
        :customButtons="customButtons"
        :perPage="[10, 25, 50, 100]"
        :defaultPerPage="10"
         v-on:row-click="showProfile"
      >
<th  slot="thead-tr">Image</th>
       <template slot="tbody-tr" scope="props">  
            <td class="img fixpostion"> 
              <div class="avatar">
                <avatar-image-initials-component v-bind:small="true" v-bind:user="props.row">
                 </avatar-image-initials-component>
             </div>
             </td> 
        </template>
      
      
      </datatable>
    </div>
     </div>

</template>




<script>
import $ from "jquery";
import _ from "lodash";
import DateRangeComponent from "../Partials/Form/DateRangeComponent.vue";
import Preloader from "../Partials/PreloaderComponent.vue";
import AvatarImageInitialsComponent from "../Partials/Page/Profile/AvatarImageInitialsComponent.vue";
import SelectComponent from "../Partials/Form/SelectComponent.vue";
import DataTable from "vue-materialize-datatable";

export default {
  components: {
    DateRangeComponent,
    AvatarImageInitialsComponent,
    Preloader,
    SelectComponent,
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
      clonedPaginate: {},
      errors: [],
      paginate: {},
      listElm: "",      
      customButtons: [
        {
          hide: true, // Whether to hide the button
          icon: "search" // Materialize icon
        }
      ],
      onClick: function(e) {
        
      }, // Click handler
      clickable: true,
      rows: [],
      columns: [
        {
          id: 1,
          label: "Journalist",
          field: "full_name",
          numeric: true,
          html: true,
          width: "70px"
        },
        {
          id: 2,
          label: "Company",
          field: "company",
          numeric: false,
          html: false,
          width: "auto"
        },
        {
          id: 3,
          label: "Hear About",
          field: "hear_about",
          numeric: false,
          html: false,
          width: "auto"
        },
        {
          id: 4,
          label: "All Inquiries",
          field: "all",
          numeric: false,
          html: false,
          width: "auto"
        },
        {
          id: 5,
          label: "Draft Inquiries",
          field: "draft",
          numeric: false,
          html: false,
          width: "auto"
        },
        {
          id: 6,
          label: "Upcoming Inquiries",
          field: "upcoming",
          html: false,
          width: "auto"
        },
        {
          id: 7,
          label: "Published Inquiries",
          field: "published",
          numeric: false,
          html: false,
          width: "auto"
        },
        {
          id: 8,
          label: "Rejected Inquiries",
          field: "rejected",
          numeric: false,
          html: false,
          width: "auto"
        },
        {
          id: 9,
          label: "Last Login",
          field: "last_login",
          numeric: false,
          html: false,
          width: "auto"
        },
        {
          id: 10,
          label: "Date Added",
          field: "created_at",
          numeric: false,
          html: false,
          width: "auto"
        }
      ],
      values: [
        { title: "Last Login", value: "last_login" },
        { title: "Date Added", value: "created_at" }
      ],
      loading: true
    };
  },
  methods: {
    showProfile: function(row) {
         this.$router.push({
        name: "journalists.show",
        params: { userId: row.id }
      });
    },
    getUsers: function() {
    
      this.loading = true;
      this.$http
        .get(laroute.route("admin.rest.journalists.approved"))
        .then(response => {
          // Add Scroll Event Listener for Infinite Scroll
          this.listElm = document.querySelector("div.table-wrapper");
          this.paginate = response.data[0];
          this.users = response.data[1];
          var formatted = [];

          let i;
          for (let i = 0; i < response.data[1].length; i++) {
            formatted[i] = {
              id: response.data[1][i]["id"],
              full_name: response.data[1][i]["full_name"],
              company: response.data[1][i]["company"],
              hear_about: response.data[1][i]["hear_about"],
              all: response.data[1][i].countInquiries.all,
              draft: response.data[1][i].countInquiries.draft,
              upcoming: response.data[1][i].countInquiries.upcoming,
              published: response.data[1][i].countInquiries.published,
              rejected: response.data[1][i].countInquiries.rejected,
              last_login: response.data[1][i]["last_login"],
              created_at: response.data[1][i]["dailyMailTime"],
              photo: response.data[1][i]["photo"],
              initials: response.data[1][i]["initials"],
              
            
            };
          }          

          this.rows = formatted;

          this.clonedUsers = _.clone(this.users);
          this.clonedPaginate = _.clone(this.paginate);
          this.loading = false;
        })
        .catch(e => {
          console.error(e);
          this.errors.push(e);
        });
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
      this.users = _.orderBy(this.users, sortProperty, this.sortOrder);
    },
    // showProfile: function(user) {
    //   this.$router.push({
    //     name: "journalists.show",
    //     params: { userId: user.id }
    //   });
    // },
    filteredUsers: function(filteredUsers) {
      if (filteredUsers) {
        this.users = filteredUsers;
        this.paginate.total = this.users.length;
        this.listElm.removeEventListener("scroll", this.handleScroll);
      } else {
        this.users = this.clonedUsers;
        this.paginate.total = this.clonedPaginate.total;
        this.listElm.addEventListener("scroll", this.handleScroll);
      }
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
        this.users = hitMatches;
      } else {
        this.users = this.clonedUsers;
      }
    },
    handleScroll: function(el) {
      var tableElement = el.path[0];
      if (
        tableElement.scrollTop + tableElement.clientHeight >=
        tableElement.scrollHeight
      ) {
      }
    }
  }
};

$(document).ready(function() {
  $(".loadmore").on("click", function() {
    var id = $(".nxtpage").val();
    var total = $(".totalrecordDisplay option:selected").val();
    var url = window.location;
    $.ajax({
      url: laroute.route("admin.rest.journalists.approvedhtml"),
      method: "GET",
      data: { page: id, total: total },

      success: function(result) {
        $("#appendNewData").empty();
        $("#appendNewData").html(result);
        var rows = $("#appendNewData")
          .html(result)
          .find("tr").length;

        if (rows > total) {
          var nxtval = parseInt(id) + 1;
          $(".nxtpage").val(nxtval);
          $(".loadmore span").text(nxtval);
        }
      }
    });
  });

  $(".prevload").on("click", function() {
    var id = $(".prvpage").val();
    var total = $(".totalrecordDisplay option:selected").val();
    var url = window.location;
    location.reload();
  });

  $(".totalrecordDisplay").on("change", function() {
    var total = $(".totalrecordDisplay option:selected").val();
    var id = $(".nxtpage").val();

    $.ajax({
      url: laroute.route("admin.rest.journalists.approvedhtml"),
      method: "GET",
      data: { page: id, total: total },

      success: function(result) {
        $("#appendNewData").empty();
        $("#appendNewData").html(result);
      }
    });
  });
});
</script>





<style lang="scss">
.list-items {
  .with-dropdown {
    margin-top: -30px;

    .select-component .select-wrapper input[type="text"]:not(.browser-default) {
      height: 70%;
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
      user-select: none; /* Non-prefixed version, currently
                                          supported by Chrome and Opera */
    }
  }

  .no-result {
    display: block;
    text-align: center;
    font-size: 24px;
    padding: 50px;
  }
}


.table-wrapper {
  overflow-x: scroll;
  width: 50%;
}
.wrapper main section .page .list-items {
    height: auto;
    width: 890px;
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
</style>