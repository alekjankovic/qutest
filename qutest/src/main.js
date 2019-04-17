import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import Routes from './routes'
Vue.use(VueRouter);
const router = new VueRouter({
  routes: Routes,
  mode:'history'
});

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);



//Vue.config.productionTip = false

new Vue({
  el:'#app',
  router: router,
  render: h => h(App),
});
