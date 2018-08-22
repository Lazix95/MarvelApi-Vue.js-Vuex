import {
  router
} from './../../../main.js';

// Set nameStartsWith variable
export const nameStartsWith = (state, str) => {
  if (str.length > 0) {
    state.nameStartsWith = 'nameStartsWith=' + str + '&';
  } else {
    state.nameStartsWith = "";
  }

};

// Set api result in data variable
export const getApi = (state, data) => {
  state.data = data;
};

// Set searching indicator
export const setSearching = (state, payload) => {
  state.searching = payload;
};

// Set index of first shown hero
export const setMin = (state, payload) => {
  state.min = payload;
};

// Set index of last shown hero
export const setMax = (state, payload) => {
  state.max = payload;
};

// Set api result in data variable
export const setData = (state, payload) => {
  state.data = payload;
};

// Initialise Store when bookmarked heores was in local storage
export const initialise_Store = (state) => {
  // if (localStorage.getItem("bookmarkedArray")) {
  //   state.bookmarkedArray = JSON.parse(localStorage.getItem("bookmarkedArray"));
  //   state.arrayOfIds = JSON.parse(localStorage.getItem("arrayOfIds"));
  //   state.data = state.bookmarkedArray;
  //   if (state.bookmarkedArray.length > state.max) {
  //     state.forwardButtonShown = true;
  //   }
  // }
}

// Set array of bookmarked heroes
export const setBookmarkedArray = (state, payload) => {
  state.bookmarkedArray = payload;
};

// Set array of bookmarked heroes ids
export const setArrayOfIds = (state, payload) => {
  state.arrayOfIds = payload;
};

// Set view bookmarked page and indicator
export const setViewBookmarked = (state, payload) => {
  state.viewBookmarked = payload;
  if (payload == false) {
    router.push("/page/1")
  }
  if (payload == true) {
    router.push("/userpage")
  }

};

// Set offset for pagination
export const setOffset = (state, payload) => {
  state.offset = payload
};

// Set name starts with for search
export const setNameStartsWith = (state, payload) => {
  state.nameStartsWith = payload;
};

// Set forward button indicator
export const setForwardButtonShown = (state, payload) => {
  state.forwardButtonShown = payload;
};

// set Foward button On or Off 
export const forwardButtonControll = (state, data) => {
  if (data.length > 20) {
    state.forwardButtonShown = true;
  } else {
    state.forwardButtonShown = false;
  }
};
