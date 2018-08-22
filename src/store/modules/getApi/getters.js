import { router } from './../../../main.js';

var CryptoJS = require("crypto-js");

// Create MD5 hash
export const hashString = state => {
  return CryptoJS.MD5(
    state.ts + state.privateKey + state.publicKey
  ).toString();
};

// Returns data variable
export const getData = state => {
  return state.data;
};

// Returns value of nameStartsWith variable
export const getNameStartsWith = state => {
  if (state.nameStartsWith.split("=")[1]) {
    return state.nameStartsWith.split("=")[1].split("&")[0];
  } else {
    return "";
  }
};

// Returns nameStartsWith string thet is needed for search
export const getWholeNameStartsWith = state => {
  return state.nameStartsWith;
};

// Returns searching state (true of false)
export const getSearching = state => {
  return state.searching;
};

// Returns limit
export const getLimit = state => {
  return state.limit;
};

// Returns offset
export const getOffset = state => {
  if ((state.nameStartsWith && state.viewBookmarked == false)) {
    router.push("/page/" + parseInt(state.offset / 20 + 1))
  }
  return state.offset;
};

// Returns public key
export const getPublicKey = state => {
  return state.publicKey;
};

// Returns time stemp
export const getTs = state => {
  return state.ts;
};

// Returns array of bookmarked heroes
export const getBookmarkedArray = state => {
  return state.bookmarkedArray;
};

// Returns index of first shown hero
export const getMin = state => {
  return state.min;
};


// Returns index of last shown hero
export const getMax = state => {
  return state.max;
};

// Returns array of bookmarked heroes Ids
export const getArrayOfIds = state => {
  return state.arrayOfIds;
};

// Returns indicator are bookmarked heroes shown
export const getViewBookmarked = state => {
  return state.viewBookmarked;
};

// Returns indicator is forward button shown 
export const getForwardButtonShow = state => {
  return state.forwardButtonShown;
};
