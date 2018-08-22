import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueLocalStorage from 'vue-localstorage';
import Vue2TouchEvents from 'vue2-touch-events';
import Vuelidate from 'vuelidate'
import {
  store
} from './store/store';
import {
  routes
} from './routs.js'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueRouter from 'vue-router';

Vue.use(VueResource);
Vue.use(VueLocalStorage);
Vue.use(Vue2TouchEvents);
Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(VueRouter);


export const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if ((to.params.number <= 0 || !Number.isInteger(parseInt(to.params.number)) && to.path.split("/")[1] == "page" )
  ) {
    next(false)
  } else {
    next();
  }
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
