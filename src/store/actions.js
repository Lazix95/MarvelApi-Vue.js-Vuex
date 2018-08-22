
// Save bookmarked heroes to local storge

  export const saveToLocalStorge = (context, data) => {
    if (!context.getters.getArrayOfIds.includes(data.id)) {
      context.commit("pushToBookmarkedArray", data);
      context.commit("pushToArrayOfIds", data.id)
        var heroList = {
          bookmarkedArray: context.getters.getBookmarkedArray,
          arrayOfIds: context.getters.getArrayOfIds
        };
        context.dispatch("saveHeroList",heroList);
    //  localStorage.setItem("bookmarkedArray", JSON.stringify(context.getters.getBookmarkedArray));
     // localStorage.setItem("arrayOfIds", JSON.stringify(context.getters.getArrayOfIds));
    } else {
      var i = context.getters.getBookmarkedArray.map(item => item.id).indexOf(data.id);
      context.getters.getBookmarkedArray.splice(i, 1);
      i = context.getters.getArrayOfIds.indexOf(data.id);
      context.getters.getArrayOfIds.splice(i, 1);
      var heroList = {
        bookmarkedArray: context.getters.getBookmarkedArray,
        arrayOfIds: context.getters.getArrayOfIds
      };
      context.dispatch("saveHeroList",heroList);
    //  localStorage.setItem("bookmarkedArray", JSON.stringify(context.getters.getBookmarkedArray));
    //  localStorage.setItem("arrayOfIds", JSON.stringify(context.getters.getArrayOfIds));
    }
  };
