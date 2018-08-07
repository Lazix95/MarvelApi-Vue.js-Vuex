import Vue from "vue";
import Vuex from "vuex";
import * as actions from './actions.js';
import * as getters from './getters.js';
import modal from './modules/modal.js'
import getApi from './modules/getApi.js';

Vue.use(Vuex);


export const store = new Vuex.Store({
 actions,
 getters,
  modules:{
    getApi,
    modal
  }
});
