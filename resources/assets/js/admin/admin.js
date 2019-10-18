/*jshint esversion: 6 */
/*jslint node: true */
'use strict';

import Vue from 'vue';
import axios from 'axios';
import router from './router/';
import './plugins/vcalendar';
import App from './components/MainComponent.vue';

require('./bootstrap.js');

Vue.prototype.$http = axios.create();
Vue.prototype.$http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.Bus = new Vue({name: 'Bus'});

new Vue({
    el: '#app',
    router,

    /**
     * The component's data.
     */
    data() {
        return {
            showModal: false,
            pageTitle: 'Admin'
        };
    },

    render: (h) => h(App),

    methods: {
        setPageTitle: function(pageTitle) {
            App.setPageTitle(pageTitle);
        }
    }
});
