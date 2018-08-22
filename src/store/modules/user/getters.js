
// Returns user Id
export const getUserId = state => {
  return state.userId;
}

// Returns Token id
export const getIdToken = state => {
  return state.idToken;
}

// Returns user data
export const getUser = state => {
  return state.user
}

export const getWrongPassword = state => {
  return state.wrongPassword;
}

// Returns updated indicator
export const getUpdated = state => {
  return state.updated;
}

// Returns password reset indicator
export const getPasswordResetRequest = (state) => {
  return state.resetPasswordRequest;
}

// Returns forever log in indicator
export const getForeverLogIn = (state) => {
  return state.foreverLogIn;
}

// Returns refrsh token id
export const getRefreshIdToken = (state) => {
  return state.refreshIdToken;
}

// Returns user picture
export const getUserPic = (state) => {
  return state.pic;
}

// returns messages
export const getMessages = state => {
  return state.messages;
}

// Returns user name of sender of messages
export const getCurrentSender = state => {
  return state.currentSender;
}

// Returns all messages from given sender
export const getThredOfMessages = state => {
  return state.thredOfmessages;
}

// Returns newly composed message
export const getNewMessage = state => {
  return state.newMessage;
}

// Returns all user names
export const getUserNames = state => {
  return state.userNames;
}
