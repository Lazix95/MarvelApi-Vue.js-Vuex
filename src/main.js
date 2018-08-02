import Vue from 'vue';
import App from './App.vue';
import VueLocalStorage from 'vue-localstorage';
import Vue2TouchEvents from 'vue2-touch-events';
import { store } from './store/store';
import { routs } from './routs.js'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

export const EventBus = new Vue();

Vue.use(VueLocalStorage);
Vue.use(Vue2TouchEvents);
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  routs
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
