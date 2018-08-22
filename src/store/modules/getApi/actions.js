import Vue from "vue";

// Search heroes by name
export const search = (context) => {
  var name = context.getters.getNameStartsWith;
  if (name.length > 0 && !context.getters.getSearching) {
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
    context.commit("setData", context.getters.getBookmarkedArray);
    context.commit("forwardButtonControll", context.getters.getBookmarkedArray);
  }
};
