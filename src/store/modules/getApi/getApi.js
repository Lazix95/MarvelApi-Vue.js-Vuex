
import * as action from './actions.js'
import * as getter from './getters.js'
import * as mutation from './mutations.js'

var ts = new Date();

const state = {
  data: [],
  limit: 20,
  nameStartsWith: "",
  min: -1,
  max: 20,
  offset: 0,
  privateKey: "9fd5811393dc346ad7bed4b3543078f24a353061",
  publicKey: "92bf368a68c00ab3cf0a9bc0f6538777",
  ts: ts.getTime(),
  searching: false,
  bookmarkedArray: [],
  arrayOfIds: [],
  viewBookmarked:false,
  forwardButtonShown: false
};

const getters = getter;

const mutations = mutation

const actions = action;

export default{
    state,
    getters,
    mutations,
    actions
};
