<template>
  <div class="list-items pitches published" :class="{spinner: loading}">
    <preloader v-if="loading"></preloader>
    <div v-show="!loading">
      <div class="table-header">
        <div class="row">
          <div class="col title">Published Pitches - {{ paginate.total }}</div>
          <div class="col sorter right-align">
            <date-range-component
              v-bind:publishedPitches="pitches"
              @filtered-by-date="filteredPitches"
            ></date-range-component>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <datatable
            class:tableData
            :columns="columns"
            :rows="rows"
            :perPage="[10, 25, 50, 100]"
            :defaultPerPage="10"
            v-on:row-click="showPitch"
          >
            <th slot="thead-tr" style="width: 80px;">Publicist</th>
            <th slot="thead-tr"></th>
            <th slot="thead-tr">Pitch Detail</th>
            <th slot="thead-tr">Date Uploaded</th>
            <th slot="thead-tr"></th>
            <template slot="tbody-tr" scope="props">
              <td class="img fixpostion">
                <div class="avatar">
                  <avatar-image-initials-component v-bind:small="true" v-bind:user="props.row"></avatar-image-initials-component>
                </div>
              </td>
              <td style="padding-left: 10px !important;">{{props.row['full_name']}}</td>
              <td>{{ props.row['subject'] }}</td>
              <td class="date">{{ moment(props.row['uploadedFromNow']).fromNow() }}</td>
              <td class="date">{{ moment(props.row['sent_at']).fromNow() }}</td>
            </template>
          </datatable>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import DateRangeComponent from "../Partials/Form/DateRangeComponent.vue";
import Preloader from "../Partials/PreloaderComponent.vue";
// import InfiniteLoader from '../Partials/InfiniteLoaderComponent';
import AvatarImageInitialsComponent from "../Partials/Page/Profile/AvatarImageInitialsComponent.vue";
import moment from "moment";
import _ from "lodash";
import DataTable from "vue-materialize-datatable";

export default {
  components: {
    DateRangeComponent,
    AvatarImageInitialsComponent,
    Preloader,
    datatable: DataTable
    // InfiniteLoader
  },
  created() {
    this.$parent.setPageTitle("Pitches");
  },
  mounted() {
    this.getPitches();
    Bus.$on("search-query-update", searchQuery => {
      // do your thing
      this.filterPitches(searchQuery);
    });
  },
  data() {
    return {
      sortOrder: null,
      pitches: [],
      rows: [],
      clonedPitches: [],
      clonedPaginate: {},
      errors: [],
      paginate: {},
      listElm: "",
      columns: [],
      moment: moment,
      loading: true
      //infiniteLoad: false
    };
  },
  methods: {
    getPitches: function() {
      this.loading = true;
      this.$http
        .get(laroute.route("admin.rest.pitches.published", { sort: "desc" }))
        .then(response => {
          // Add Scroll Event Listener for Infinite Scroll
          this.listElm = document.querySelector("div.table-wrapper");
          //  this.listElm.addEventListener('scroll', this.handleScroll);
          this.paginate.total = response.data.published.length;

          var formatted = [];
          let i;

          for (let i = 0; i < response.data.published.length; i++) {
            formatted[i] = {
              id: response.data.published[i].id,
              full_name:
                response.data.published[i].user != null
                  ? response.data.published[i].user.full_name
                  : "",
              hear_about:
                response.data.published[i].user != null
                  ? response.data.published[i].user.hear_about
                  : "",
              photo:response.data.authors[i].photo,
              uploadedFromNow: response.data.published[i].uploaded_at,
              initials: response.data.authors[i].initial,
              subject: response.data.published[i].subject,
              topicsText: "",
              title:
                response.data.published[i].user != null
                  ? response.data.published[i].user.title
                  : "",
              class: "",
              sent_at: response.data.published[i].sent_at
            };
          }
          this.rows = formatted;

          this.pitches = response.data.published;
          this.clonedPitches = _.clone(this.pitches);
          this.clonedPaginate = _.clone(this.paginate);
          this.loading = false;
        })
        .catch(e => {
          console.error(e);
        });
    },
    showPitch: function(row) {
      this.$router.push({ name: "pitches.show", params: { pitchId: row.id } });
    },
    filteredPitches: function(filteredPitches) {
      if (filteredPitches) {
        this.pitches = filteredPitches;
        this.paginate.total = this.pitches.length;
      } else {
        this.pitches = this.clonedPitches;
        this.paginate.total = this.clonedPaginate.total;
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
      this.pitches = _.orderBy(this.pitches, sortProperty, this.sortOrder);
    },
    filterPitches: function(searchQuery) {
      var hitMatches = [];
      if (searchQuery) {
        if (searchQuery[1] === "industry") {
          hitMatches = _.filter(this.clonedPitches, function(pitch) {
            return pitch.tags.industries.some(industry => {
              var industryTitle = industry.label;
              var re = new RegExp(searchQuery[0], "i");
              return industryTitle.match(re);
            });
          });
        } else if (searchQuery[1] === "topic") {
          hitMatches = _.filter(this.clonedPitches, function(pitch) {
            return pitch.tags.topics.some(topic => {
              var topicTitle = topic.label;
              var re = new RegExp(searchQuery[0], "i");
              return topicTitle.match(re);
            });
          });
        } else if (searchQuery[1] === "full_name") {
          hitMatches = _.filter(this.clonedPitches, function(pitch) {
            var re = new RegExp(searchQuery[0], "i");
            return pitch.author.full_name.match(re);
          });
        }
        this.pitches = hitMatches;
      } else {
        this.pitches = this.clonedPitches;
      }
    },
    handleScroll: function(el) {
      var tableElement = el.path[0];
      if (
        tableElement.scrollTop + tableElement.clientHeight >=
        tableElement.scrollHeight
      ) {
        this.loadMore();
      }
    },
    loadMore: function() {
      // this.infiniteLoad = true;
      this.$http
        .get(this.paginate.next_page_url)
        .then(response => {
          this.pitches = _.union(this.pitches, response.data[1]);
          this.paginate = response.data[0];
          this.clonedPitches = _.clone(this.pitches);
          // this.infiniteLoad = false;
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>

<style lang="scss" type="text/scss">
.pitches.published {
  table.table {
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
    td {
      &.status {
        text-align: right;

        &.live-soon {
          font-family: Roboto, sans-serif;
          font-size: 15px;
          text-align: right;
          color: #2abf8d;
        }
      }
    }
  }

  .no-result {
    display: block;
    text-align: center;
    font-size: 24px;
    padding: 50px;
  }
  tr.clickable .img.fixpostion {
    left: 0;
    width: 80px !important;
    padding-left: 10px;
  }

  tr.clickable .img.fixpostion .avatar {
    position: relative;
    background-color: #ffd731;
    border-radius: 50%;
    width: 48px;
    height: 48px;
  }

  td.status.live-soon {
    font-family: Roboto, sans-serif;
    font-size: 15px;
    text-align: right;
    color: #2abf8d;
  }
}
</style>