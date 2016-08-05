import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueAsyncData from 'vue-async-data';
import {sync} from 'vuex-router-sync';
import routes from './routes/';
import store from './vuex/store';
/* eslint-disable no-new */
Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueAsyncData);
const router = new VueRouter({
    history: false,
    saveScrollPosition: true
});
router.map(routes);
router.beforeEach((transition) => {
    console.log('transition', transition);
});
router.afterEach((transition) => {
    // console.log('transition>>>>', transition);
});
sync(store, router);
App.store = store;
router.start(Vue.extend(App), 'body');
window.router = router;

