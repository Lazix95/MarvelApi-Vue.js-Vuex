import Vue from "vue";
import Vuex from "vuex";
import * as actions from './actions.js';
import modal from './modules/modal.js'
import getApi from './modules/getApi/getApi.js';
import user from './modules/user/user.js'

Vue.use(Vuex);


export const store = new Vuex.Store({
 actions,
  modules:{
    getApi,
    modal,
    user
  }
});
