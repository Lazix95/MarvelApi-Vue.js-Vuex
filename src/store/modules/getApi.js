import Vue from "vue";
import { ENETUNREACH } from "constants";
import { router } from './../../main.js';

var ts = new Date();
var CryptoJS = require("crypto-js");

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
  viewAllHeroes:false,
  forwardButtonShown: false
};

const getters = {
  hashString: state => {
    return CryptoJS.MD5(
      state.ts + state.privateKey + state.publicKey
    ).toString();
  },
  getData: state => {
    return state.data;
  },
  getNameStartsWith: state => {
    if (state.nameStartsWith.split("=")[1]){
    return state.nameStartsWith.split("=")[1].split("&")[0];
    }else{
      return "";
    }
  },
  getWholeNameStartsWith: state => {
    return state.nameStartsWith;
  },
  getSearching: state => {
    return state.searching;
  },
  getLimit: state => {
    return state.limit;
  },
  getOffset: state => {
    if ((state.nameStartsWith && state.viewAllHeroes == false) || state.viewAllHeroes ){
    router.push("/page/"+parseInt(state.offset/20 + 1))
    }else{
      router.push("/page/"+state.max /20);
    }
    return state.offset;
  },
  getPublicKey: state => {
    return state.publicKey;
  },
  getTs: state => {
    return state.ts;
  },
  getBookmarkedArray: state => {
      return state.bookmarkedArray;
  },
  getMin: state => {
      return state.min;
  },
  getMax: state => {
      return state.max;
  },
  getArrayOfIds: state =>{
      return state.arrayOfIds;
  },
  getViewAllHeroes: state => {
    return state.viewAllHeroes;
  },
  getForwardButtonShow: state => {
    return state.forwardButtonShown;
  }
};

const mutations = {
  nameStartsWith(state, str) {
    if(str.length > 0){
      state.nameStartsWith = 'nameStartsWith=' + str + '&';
    }else{
      state.nameStartsWith = "";
    }
    
  },
  getApi(state, data) {
    state.data = data;
  },
  setSearching(state, payload) {
    state.searching = payload;
  },
  setMin(state, payload) {
    state.min = payload;
  },
  setMax(state, payload) {
    state.max = payload;
  },
  setData(state,payload){
      state.data = payload;
  },
  initialiseStore(state) {
    if (localStorage.getItem("bookmarkedArray")) {
      state.bookmarkedArray = JSON.parse(localStorage.getItem("bookmarkedArray"));
      state.arrayOfIds = JSON.parse(localStorage.getItem("arrayOfIds"));
      state.data = state.bookmarkedArray;
      if (state.bookmarkedArray.length > state.max) {
        state.forwardButtonShown = true;
      }
    }
  },
pushToBookmarkedArray(state,payload){
    state.bookmarkedArray.push(payload);
},
pushToArrayOfIds(state,payload){
    state.arrayOfIds.push(payload);
},
setBookmarkedArray(state,payload){
    state.bookmarkedArray = payload;
},
setArrayOfIds(state,payload){
    state.arrayOfIds = payload;
},
setViewAllHeroes(state,payload){
  state.viewAllHeroes = payload;
},
setOffset(state,payload){
  state.offset = payload
},
setNameStartsWith(state,payload){
  state.nameStartsWith = payload;
},
setForwardButtonShown(state, payload){
  state.forwardButtonShown = payload;
},
forwardButtonControll(state, data) {
  if (data.length > 20) {
    state.forwardButtonShown = true;
  } else {
    state.forwardButtonShown = false;
  }
},
};

const actions = {
  search(context) {
    var name = context.getters.getNameStartsWith;
    if ((name.length > 0 || context.getters.getViewAllHeroes) && !context.getters.getSearching) {
      context.commit("setSearching", true);
      context.commit("setMin", -1);
      context.commit("setMax", 20);
      Vue.http
        .get(
          "https://gateway.marvel.com/v1/public/characters?" +
          context.getters.getWholeNameStartsWith +
          "limit=" +
          (context.getters.getLimit + 1) +
          "&offset=" +
          context.getters.getOffset +
          "&apikey=" +
          context.getters.getPublicKey +
          "&ts=" +
          context.getters.getTs +
          "&hash=" +
          context.getters.hashString +
          ""
        )
        .then(
          Response => {
            if (context.getters.getNameStartsWith != name) {
              context.commit("setSearching", false);
              context.dispatch("search");
              return false;
            }
            return Response.json();
          },
          error => {
            console.log("error");
          }
        )
        .then(data => {
          if (data) {
            context.commit("setSearching", false);
            context.commit("getApi", data.data.results);
            context.commit("forwardButtonControll", data.data.results);
          }
        });
    } else if (context.getters.getNameStartsWith.length == 0 && !context.getters.getViewAllHeroes) {
      context.commit("setSearching", false);
      context.commit("setMin", -1);
      context.commit("setMax", 20);
      context.commit("setData",context.getters.getBookmarkedArray);
      context.commit("forwardButtonControll", context.getters.getBookmarkedArray);
    }
  },
  setViewAllHeroes(context,payload){
    context.commit("setViewAllHeroes", payload);
    context.commit("setNameStartsWith", "");
    context.commit("setOffset", 0);
    context.commit("setMin", -1);
    context.commit("setMax", 20);
    context.dispatch("search");
  }
}

export default{
    state,
    getters,
    mutations,
    actions
};
