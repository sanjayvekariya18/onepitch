<template>
    <div class="row">
        <div class="col s12">
            <h5>Database Reports - {{$route.meta.title}}</h5>
        </div>
        <div class="col s12">
            <div class="collection" v-if="$route.meta.type == 'database'">
                <router-link to="/analytics/database/users" class="collection-item">Users</router-link>
            </div>
            <div class="collection" v-if="$route.meta.type == 'subscriptions'">
                <router-link to="/analytics/journalist/approved" class="collection-item">
                    Approved Journalist
                </router-link>
                <router-link to="/analytics/publicists/stats" class="collection-item">
                    Publicist Stats
                </router-link>
                <router-link to="/analytics/journalists/industry_subscription" class="collection-item">
                    By Industry
                </router-link>
                <router-link to="/analytics/journalists/topic_subscription" class="collection-item">
                    By Topic
                </router-link>
            </div>
            <div class="collection" v-if="$route.meta.type == 'emails'">
                <router-link to="/analytics/journalists/pitch_responses" class="collection-item">
                    Pitch Mail Statistics
                </router-link>
                <router-link to="/analytics/publicists/inquiry_responses" class="collection-item">
                    Inquiry Mail Statistics
                </router-link>
            </div>
            <div class="collection" v-if="$route.meta.type == 'brandIndex'">
                Coming Soon...
            </div>
            <div class="collection" v-if="$route.meta.type == 'trends'">
                <router-link to="/analytics/trends/industry_stats" class="collection-item">
                    Industry Stats
                </router-link>
                <router-link to="/analytics/trends/topic_stats" class="collection-item">
                    Topic Stats
                </router-link>
            </div>
        </div>
    </div>

</template>

<script type="text/babel">
  export default {
    created () {
      this.$parent.setPageTitle('Analytics')
    },
    mounted () {
    },
    data () {
      return {
        title: 'Admin',
        user: {}
      }
    },
  }
</script>