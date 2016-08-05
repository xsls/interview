import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueAsyncData from 'vue-async-data';
// import {sync} from 'vuex-router-sync';
import routes from './routes/';
/* eslint-disable no-new */
Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(VueAsyncData);
const router = new VueRouter({
    history: false,
    saveScrollPosition: true
});
router.map(routes);
router.start(Vue.extend(App), 'body');
window.router = router;

