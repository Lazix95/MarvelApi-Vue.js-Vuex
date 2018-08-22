import {
    router
  } from './../../../main.js'
  
  // Set Token id and user id when logged in
export const authUser = (state, payload) => {
  state.idToken = payload.idToken;
  state.userId = payload.userId
}

// Set user data
export const setUser = (state, payload) => {
  state.user = payload
}

// Remove all dta when logged out
export const logOutData = state => {
  state.idToken = null;
  state.userId = null;
  state.user = null;
  localStorage.removeItem("idToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("exparationDate");
  router.push("/login")
  clearTimeout(state.timer);
}

// Set wrong password indicator
export const setWrongPassword = (state, payload) => {
  state.wrongPassword = payload;
}

// Set Updated indicator
export const setUpdated = (state, payload) => {
  state.updated = payload;
}

// set password reset indicator
export const setResetPasswordRequest = (state, payload) => {
  state.resetPasswordRequest = payload;
}

// Set forever login indicator
export const setForeverLogin = (state, payload) => {
  state.foreverLogIn = payload;
}

// Set refresh token id
export const setRefreshIdToken = (state, payload) => {
  state.refreshIdToken = payload;
}

// set Timer for refreshing messages
export const setTimer = (state, payload) => {
  state.timer = payload;
}

// Clear timer when is not needed
export const clearTimer = (state) => {
  clearTimeout(state.timer);
}

// Set user picture
export const setUserPic = (state, payload) => {
  state.pic = payload
}

// Set messages
export const setMessages = (state, payload) => {
  state.messages = payload
}

// Set current sender user name
export const setCurrentSender = (state, payload) => {
  state.currentSender = payload;
}

// Set all messages of curent sender
export const setThredOfMessages = (state, payload) => {
  state.thredOfmessages = payload;
}

// Set new message value
export const setNewMessage = (state, payload) => {
  state.newMessage = payload;
}

// Set all user names array
export const setUserNames = (state, payload) => {
  state.userNames = payload;
}
