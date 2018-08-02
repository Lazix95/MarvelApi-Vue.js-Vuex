import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
var ts = new Date();
var CryptoJS = require("crypto-js");

export const store = new Vuex.Store({
  state: {
    data: [],
    nameStartsWith: "",
    limit: 20,
    offset: 0,
    privateKey: "9fd5811393dc346ad7bed4b3543078f24a353061",
    publicKey: "92bf368a68c00ab3cf0a9bc0f6538777",
    ts: ts.getTime(),
    bookmarkedArray:[],
    arrayOfIds:[],
    searching:false
  },
  mutations: {
    getApi(state, data) {
      console.log(data);
      state.data = data;
    },
    nameStartsWith(state, str) {
      state.nameStartsWith = str;
    },
    initialiseStore(state) {
        if(localStorage.getItem("bookmarkedArray")) {      
            state.bookmarkedArray =  JSON.parse(localStorage.getItem("bookmarkedArray"));
            state.arrayOfIds = JSON.parse(localStorage.getItem(" arrayOfIds"));
            state.data = state.bookmarkedArray;
        }
        console.log(state.bookmarkedArray)
    }
  },
  getters: {
    hashString: state => {
      return CryptoJS.MD5(
        state.ts + state.privateKey + state.publicKey
      ).toString();
    }
  },
  actions: {
    search(context) {
        var name = context.state.nameStartsWith;
      if (context.state.nameStartsWith.length > 0 && !context.state.searching) {
          context.state.searching = true;
        Vue.http
          .get(
            "https://gateway.marvel.com/v1/public/characters?nameStartsWith=" +
              context.state.nameStartsWith +
              "&limit=" +
              (context.state.limit + 1) +
              "&offset=" +
              context.state.offset +
              "&apikey=" +
              context.state.publicKey +
              "&ts=" +
              context.state.ts +
              "&hash=" +
              context.getters.hashString +
              ""
          )
          .then(
            Response => {
                if (context.state.nameStartsWith != name){
                    context.state.searching = false;
                    context.dispatch("search");
                    console.log("ponovo!!")
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
                context.state.searching = false;
                context.commit("getApi", data.data.results);
            }
          });
      }else{
          context.state.data = context.state.bookmarkedArray;
      }
    }
  }
});
