<template>
    <div>
        <nav :class="{'additional-navigation' : additionalNavigation}">
            <div class="nav-wrapper">
                <button v-if="$route.meta.showBack" class="back-button" v-on:click="$router.back()">
                    <i class="material-icons">arrow_back</i>
                </button>
                <div class="nav-title">{{ title }}</div>
                <search-publicists v-if="/publicists/.test($route.name)"></search-publicists>
                <search-journalists v-if="/journalists/.test($route.name)"></search-journalists>
                <search-pitches v-if="/pitches/.test($route.name)"></search-pitches>
                <search-inquiries v-if="/inquiries/.test($route.name)"></search-inquiries>
                <ul id="nav-mobile" class="right">
                    <li>
                        <profile-component v-bind:user="user"></profile-component>
                    </li>
                </ul>
            </div>
            <journalist-navigation v-if="additionalNavigationJournalist"></journalist-navigation>
            <pitches-navigation v-if="additionalNavigationPitches"></pitches-navigation>
            <inquiries-navigation v-if="additionalNavigationInquiries"></inquiries-navigation>
            <analytics-navigation v-if="additionalNavigationAnalytics"></analytics-navigation>
            <faq-navigation v-if="faqNavigation"></faq-navigation>
        </nav>
    </div>
</template>

<script type="text/babel">
  import SearchPublicists from '../Publicists/SearchPublicists.vue'
  import SearchJournalists from '../Journalists/SearchJournalists.vue'
  import SearchPitches from '../Pitches/SearchPitchesComponent.vue'
  import SearchInquiries from '../Inquiries/SearchInquiriesComponent.vue'
  import SearchSuggestedTopics from '../Topics/SearchSuggestedTopics.vue'
  import SearchAdministrators from '../Administrators/SearchAdministrators.vue'
  import JournalistNavigation from '../Journalists/HeaderJornalistNavigation.vue'
  import PitchesNavigation from '../Pitches/HeaderPitchesNavigationComponent.vue'
  import InquiriesNavigation from '../Inquiries/HeaderInquiriesNavigationComponent.vue'
  import FaqNavigation from '../FAQ/HeaderNavigation.vue'
  import AnalyticsNavigation from '../Analytics/HeaderNavigation.vue'
  import ProfileComponent from './ProfileComponent.vue'

  export default {
    components: {
      SearchPublicists,
      SearchJournalists,
      SearchPitches,
      SearchInquiries,
      SearchSuggestedTopics,
      SearchAdministrators,
      JournalistNavigation,
      PitchesNavigation,
      InquiriesNavigation,
      AnalyticsNavigation,
      FaqNavigation,
      ProfileComponent
    },
    mounted () {
      this.getUser()
    },
    data () {
      return {
        title: 'Admin',
        user: {}
      }
    },
    computed: {
      additionalNavigation: function () {
        return this.additionalNavigationJournalist || this.additionalNavigationPitches || this.additionalNavigationInquiries || this.additionalNavigationAnalytics || this.faqNavigation
      },
      additionalNavigationJournalist: function () {
        return /(.*)journalists\.(new|approved|denied)/.test(this.$route.name)
      },
      additionalNavigationPitches: function () {
        return /(.*)pitches\.(new|upcoming|published|rejected|updated)/.test(this.$route.name)
      },
      additionalNavigationInquiries: function () {
        return /(.*)inquiries\.(new|upcoming|published|rejected)/.test(this.$route.name)
      },
      additionalNavigationAnalytics: function () {
        return /(database|subscriptions|emails|trends|brandIndex)/.test(this.$route.meta.type)
      },
      faqNavigation: function () {
        return /(faq)/.test(this.$route.meta.type)
      },
      showBack: function () {
        return this.$route.meta.showBack
      }
    },
    methods: {
      setPageTitle: function (title) {
        this.title = title
      },
      getUser: function () {
        this.$http.get(laroute.route('admin.rest.auth.user')).then(response => {
          this.user = response.data
        }).catch((e) => {
          console.error(e)
        })
      }
    }
  }
</script>
