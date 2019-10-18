import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: '/admin/',
    routes: [
        {
            path: '',
            redirect: '/journalists',
            meta: {title: 'Journalists'}
        },
        {
            path: '/publicists',
            name: 'publicists',
            component: require('../components/Publicists/ListOfPublicists.vue'),
            meta: {title: 'Publicists', list: true}
        },
        {
            path: '/publicists/:userId',
            name: 'publicists.show',
            component: require('../components/Publicists/ShowPublicist.vue'),
            meta: {showBack: true}
        },
        {
            path: '/brands/:brandId',
            name: 'brands.show',
            component: require('../components/Brands/ShowBrandComponent.vue'),
            meta: {showBack: true, title: 'Brands'}
        },
        {
            path: '/journalists',
            name: 'journalists',
            redirect: '/journalists/new',
            meta: {title: 'Journalists'}
        },
        {
            path: '/journalists/new',
            name: 'journalists.new',
            component: require('../components/Journalists/ListOfJournalistsNew.vue'),
            meta: {title: 'Journalists', list: true}
        },
        {
            path: '/journalists/approved',
            name: 'journalists.approved',
            component: require('../components/Journalists/ListOfJournalistsApproved.vue'),
            meta: {title: 'Journalists', list: true}
        },
        {
            path: '/journalists/denied',
            name: 'journalists.denied',
            component: require('../components/Journalists/ListOfJournalistsDenied.vue'),
            meta: {title: 'Journalists', list: true}
        },
        {
            path: '/journalists/:userId',
            name: 'journalists.show',
            component: require('../components/Journalists/ShowJournalist.vue'),
            meta: {showBack: true}
        },
        {
            path: '/pitches',
            name: 'pitches',
            redirect: '/pitches/new'
        },
        {
            path: '/pitches/new',
            name: 'pitches.new',
            component: require('../components/Pitches/NewPitchesComponent.vue'),
            meta: {title: 'Pitches', list: true}
        },
        {
            path: '/pitches/upcoming',
            name: 'pitches.upcoming',
            component: require('../components/Pitches/UpcomingPitchesComponent.vue'),
            meta: {title: 'Pitches', list: true}
        },
        {
            path: '/pitches/published',
            name: 'pitches.published',
            component: require('../components/Pitches/PublishedPitchesComponent.vue'),
            meta: {title: 'Pitches', list: true}
        },
        {
            path: '/pitches/rejected',
            name: 'pitches.rejected',
            component: require('../components/Pitches/RejectedPitchesComponent.vue'),
            meta: {title: 'Pitches', list: true}
        },
        {
            path: '/pitches/updated',
            name: 'pitches.updated',
            component: require('../components/Pitches/UpdatedPitchesComponent.vue'),
            meta: {title: 'Pitches', list: true}
        },
        {
            path: '/pitches/:pitchId',
            name: 'pitches.show',
            component: require('../components/Pitches/ShowPitchComponent.vue'),
            meta: {showBack: true, title: 'Pitches'}
        },
        {
            path: '/pitches/:pitchId/compares',
            name: 'pitches.compares',
            component: require('../components/Pitches/CompareChangesComponent.vue'),
            meta: {showBack: true, title: 'Pitches'}
        },
        {
            path: '/inquiries',
            name: 'inquiries',
            redirect: '/inquiries/new'
        },
        {
            path: '/inquiries/new',
            name: 'inquiries.new',
            component: require('../components/Inquiries/NewInquiriesComponent.vue'),
            meta: {title: 'Inquiries', list: true}
        },
        {
            path: '/inquiries/upcoming',
            name: 'inquiries.upcoming',
            component: require('../components/Inquiries/UpcomingInquiriesComponent.vue'),
            meta: {title: 'Inquiries', list: true}
        },
        {
            path: '/inquiries/published',
            name: 'inquiries.published',
            component: require('../components/Inquiries/PublishedInquiriesComponent.vue'),
            meta: {title: 'Inquiries', list: true}
        },
        {
            path: '/inquiries/rejected',
            name: 'inquiries.rejected',
            component: require('../components/Inquiries/RejectedInquiriesComponent.vue'),
            meta: {title: 'Inquiries', list: true}
        },
        {
            path: '/inquiries/:inquiryId',
            name: 'inquiries.show',
            component: require('../components/Inquiries/ShowInquiryComponent.vue'),
            meta: {showBack: true, title: 'Inquiries'}
        },
        {
            path: '/industries',
            name: 'industries',
            component: require('../components/Industries/ListOfIndustries.vue'),
            meta: {title: 'Industries', list: true}
        },
        {
            path: '/topics',
            name: 'topics',
            component: require('../components/Topics/ListOfTopics.vue'),
            meta: {title: 'Topics', list: true}
        },
        {
            path: '/topics/suggested',
            name: 'topics.suggested',
            component: require('../components/Topics/ListOfSuggestedTopics.vue'),
            meta: {title: 'Suggested Topics', list: true}
        },
        {
            path: '/alerts',
            name: 'alerts',
            component: require('../components/Alerts/List.vue'),
            meta: { title: 'Alerts', list: true }
        },
        {
            path: '/administrators',
            name: 'administrators',
            component: require('../components/Administrators/List.vue'),
            meta: {title: 'Administrators', list: true}
        },
        {
            path: '/blog/post',
            name: 'blog.post',
            component: require('../components/Blog/ListOfBlogPosts.vue'),
            meta: {title: 'Blog', list: true}
        },
        {
            path: '/blog/post/:blogPostId',
            name: 'blog.post.show',
            component: require('../components/Blog/ShowBlogPosts.vue'),
            meta: {showBack: true, title: 'Blog'}
        },
        {
            path: '/analytics',
            name: 'analytics',
            redirect: '/analytics/database',
            meta: {title: 'Analytics'}
        },
        {
            path: '/analytics/database',
            name: 'analytics.database',
            component: require('../components/Analytics/ReportListMenu.vue'),
            meta: {title: 'Database', type: 'database'}
        },
        {
            path: '/analytics/subscriptions',
            name: 'analytics.subscriptions',
            component: require('../components/Analytics/ReportListMenu.vue'),
            meta: {title: 'Subscriptions', type: 'subscriptions'}
        },
        {
            path: '/analytics/emails',
            name: 'analytics.emails',
            component: require('../components/Analytics/ReportListMenu.vue'),
            meta: {title: 'Emails', type: 'emails'}
        },
        {
            path: '/analytics/brandIndex',
            name: 'analytics.brandIndex',
            component: require('../components/Analytics/ReportListMenu.vue'),
            meta: {title: 'Brand Index', type: 'brandIndex'}
        },
        {
            path: '/analytics/trends',
            name: 'analytics.trend',
            component: require('../components/Analytics/ReportListMenu.vue'),
            meta: {title: 'Trends', type: 'trends'}
        },
        {
            path: '/analytics/database/users',
            name: 'analytics.database.users',
            component: require('../components/Analytics/Database/UserReport.vue'),
            meta: {title: 'Users', type: 'database'}
        },
        {
            path: '/analytics/journalists/pitch_responses',
            name: 'analytics.journalist.pm-stats',
            component: require('../components/Analytics/Journalists/PitchMailStatistics.vue'),
            meta: {title: 'PitchMailStatistics', type: 'emails'}
        },
        {
            path: '/analytics/publicists/inquiry_responses',
            name: 'analytics.publicist.inquiry-mail-stats',
            component: require('../components/Analytics/Publicists/InquiryMailStatistics.vue'),
            meta: {title: 'InquiryMailStatistics', type: 'emails'}
        },
        {
            path: '/analytics/publicists/saved_inquiries',
            name: 'analytics.publicist.inquiry',
            component: require('../components/Analytics/Publicists/SavedInquiry.vue'),
            meta: {title: 'SavedInquiry', type: 'publicist'}
        },
        {
            path: '/analytics/journalists/saved_pitches',
            name: 'analytics.journalist.pitch',
            component: require('../components/Analytics/Journalists/SavedPitches.vue'),
            meta: {title: 'SavedPitches', type: 'journalist'}
        },
        {
            path: '/analytics/publicists/brands',
            name: 'analytics.publicist.brand-index',
            component: require('../components/Analytics/Publicists/BrandIndex.vue'),
            meta: {title: 'BrandIndex', type: 'publicist'}
        },
        {
            path: '/analytics/journalists/brand_index_search',
            name: 'analytics.journalist.brand-index-sl',
            component: require('../components/Analytics/Journalists/BrandIndexSearchLogs.vue'),
            meta: {title: 'BrandIndexSearchLog', type: 'journalist'}
        },
        {
            path: '/analytics/journalists/brand_index_clicks',
            name: 'analytics.journalist.brand-index-cl',
            component: require('../components/Analytics/Journalists/BrandIndexClicksLog.vue'),
            meta: {title: 'BrandIndexClicksLog', type: 'journalist'}
        },
        {
            path: '/analytics/journalist/approved',
            name: 'analytics.journalist.approved',
            component: require('../components/Analytics/Journalists/ApprovedJournalists.vue'),
            meta: {title: 'ApprovedJournalists', type: 'subscriptions'}
        },
        {
            path: '/analytics/journalist/declined',
            name: 'analytics.journalist.declined',
            component: require('../components/Analytics/Journalists/DeclinedJournalists.vue'),
            meta: {title: 'DeclinedJournalists', type: 'journalist'}
        },
        {
            path: '/analytics/publicists/stats',
            name: 'analytics.publicist.stats',
            component: require('../components/Analytics/Publicists/PublicistStats.vue'),
            meta: {title: 'PublicistStats', type: 'subscriptions'}
        },
        {
            path: '/analytics/publicists/subscriptions',
            name: 'analytics.publicist.subscriptions',
            component: require('../components/Analytics/Publicists/PublicistSubscriptions.vue'),
            meta: {title: 'PublicistSubscriptions', type: 'publicist'}
        },
        {
            path: '/analytics/journalists/pitch_clicks',
            name: 'analytics.journalist.pitch-clicks',
            component: require('../components/Analytics/Journalists/ActiveJournalistClicks.vue'),
            meta: {title: 'ActiveJournalistClicks', type: 'journalist'}
        },
        {
            path: '/analytics/journalists/pitch_opens',
            name: 'analytics.journalist.pitch-opens',
            component: require('../components/Analytics/Journalists/ActiveJournalistOpens.vue'),
            meta: {title: 'ActiveJournalistOpens', type: 'journalist'}
        },
        {
            path: '/analytics/journalists/last_login',
            name: 'analytics.journalist.last-login',
            component: require('../components/Analytics/Journalists/ActiveJournalistLastLogin.vue'),
            meta: {title: 'ActiveJournalistLastLogin', type: 'journalist'}
        },
        {
            path: '/analytics/journalists/industry_subscription',
            name: 'analytics.journalist.industry-subscription',
            component: require('../components/Analytics/Journalists/JournalistIndustrySubscription.vue'),
            meta: {title: 'JournalistIndustrySubscription', type: 'subscriptions'}
        },
        {
            path: '/analytics/journalists/topic_subscription',
            name: 'analytics.journalist.topic-subscription',
            component: require('../components/Analytics/Journalists/JournalistTopicSubscription.vue'),
            meta: {title: 'JournalistTopicSubscription', type: 'subscriptions'}
        },
        {
            path: '/analytics/trends/industry_stats',
            name: 'analytics.trend.industry-stats',
            component: require('../components/Analytics/Trends/IndustryStats.vue'),
            meta: {title: 'IndustryStats', type: 'trends'}
        },
        {
            path: '/analytics/trends/topic_stats',
            name: 'analytics.trend.topic-stats',
            component: require('../components/Analytics/Trends/TopicStats.vue'),
            meta: {title: 'TopicStats', type: 'trends'}
        },
        {
            path: '/faq',
            name: 'FAQ',
            redirect: '/faq/general',
            meta: {title: 'FAQ', list: true}
        },
        {
            path: '/faq/:slug',
            name: 'faq.slug',
            component: require('../components/FAQ/List.vue'),
            meta: {title: 'FAQ', type: 'faq',list: true}
        },
    ]
})
