import Vue from "vue";
import {
  router
} from './../../../main.js'

// Set Logout timer
export const setLogoutTimer = (context, exparationDate) => {
  setTimeout(() => {
    if (!context.getters.getForeverLogIn) {
      context.dispatch("logOut");
    } else {
      context.dispatch("getFreshIdToken")
    }
  }, exparationDate)

}

// Sing up new user
export const singUpNewUser = (context, payload) => {
  Vue.http.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBJjKfS2hr-ZTOCMB7X16xDL2H47482Ub8", {
    email: payload.email,
    password: payload.password,
    returnSecureToken: true
  }).then(res => {
    context.commit("authUser", {
      idToken: res.body.idToken,
      userId: res.body.localId
    })
    context.dispatch("saveToken", res.body.expiresIn);
    context.dispatch("storeUser", payload);
    context.dispatch("storeUserName", payload.username)
    context.commit("setUser", payload);
    context.dispatch("setLogoutTimer", res.body.expiresIn)
    router.push("/")
  }, error => {
    console.log("Sing Up Error!!!")
  })
}

// Log in for existing users
export const logIn = (context, payload) => {
  Vue.http.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBJjKfS2hr-ZTOCMB7X16xDL2H47482Ub8", {
    email: payload.email,
    password: payload.password,
    returnSecureToken: true
  }).then(res => {
    context.commit("setWrongPassword", false);
    context.dispatch("setLogoutTimer", res.body.expiresIn * 1000)
    context.commit("authUser", {
      idToken: res.body.idToken,
      userId: res.body.localId
    })
    context.commit("setRefreshIdToken", res.body.refreshToken);
    context.dispatch("saveToken", res.body.expiresIn);
    context.dispatch("fetchUser")
    router.push("/");
    if (context.getters.getForeverLogIn) {
      context.dispatch("getFreshIdToken");
    }
  }, error => {
    context.commit("setWrongPassword", true);
    var vm = context;
    setTimeout(() => {
      vm.commit("setWrongPassword", false)
    }, 4000, vm);
  })
}

// Store data about New user
export const storeUser = (context, payload) => {
  if (context.getters.getIdToken == null) {
    return;
  }
  Vue.http.put("https://vue-js-app-d8354.firebaseio.com/users/" + context.getters.getUserId + "/user.json?auth=" + context.getters.getIdToken, payload).then(res => {}, error => {
    console.log("Store User Data Error!!!")
  })
}

// Store user name of new user
export const storeUserName = (context, userName) => {
  if (context.getters.getIdToken == null) {
    return;
  }
  Vue.http.post("https://vue-js-app-d8354.firebaseio.com/userNames.json?auth=" + context.getters.getIdToken, {
    username: userName
  }).then(res => {}, error => {
    console.log("Store User Name Data Error!!!")
  })
}

// Fetch all messages
export const fetchMessages = (context, payload) => {
  if (context.getters.getIdToken == null) {
    return;
  }
  Vue.http.get('https://vue-js-app-d8354.firebaseio.com/messages/to_' + context.getters.getUser.username + '.json?auth=' + context.getters.getIdToken).then(res => {
    Object.getOwnPropertyNames(res.body)
    var newLength = 0;
    var oldLength = 0;
    var messages = context.getters.getMessages;
    for (var key in res.body) {
      newLength += Object.getOwnPropertyNames(res.body[key]).length
    }
    for (var key in messages) {
      oldLength += Object.getOwnPropertyNames(messages[key]).length - 1
    }

    if (newLength == oldLength) {
      context.commit("setNewMessage", false)
    } else {
      context.commit("setNewMessage", true)
    }

    context.commit("setMessages", res.body)
  }, error => {
    console.log("messages: ", error)
  })
}

// Send message
export const postMessage = (context, payload) => {
  if (context.getters.getIdToken == null) {
    return;
  }
  Vue.http.post('https://vue-js-app-d8354.firebaseio.com/messages/to_' + payload.to + '/from_' + payload.from + '.json?auth=' + context.getters.getIdToken + '', payload).then(res => {}, error => {
    console.log("messages: ", error)
  })
}

// Save sented message
export const postSentedMessage = (context, payload) => {
  payload.sented = true;
  payload.status = "Seen"
  if (context.getters.getIdToken == null) {
    return;
  }
  Vue.http.post('https://vue-js-app-d8354.firebaseio.com/messages/to_' + payload.from + '/from_' + payload.to + '.json?auth=' + context.getters.getIdToken + '', payload).then(res => {
    context.dispatch("fetchMessages");
  }, error => {
    console.log("messages: ", error)
  })
}

// Cahnge message status from "New" to "Seen"
export const changeMessageStatus = (context, payload) => {
  for (var key in payload.msg) {
    if (payload.msg[key].status == "New") {
      Vue.http.patch('https://vue-js-app-d8354.firebaseio.com/messages/to_' + payload.to + '/from_' + payload.from + '/' + key + '.json?auth=' + context.getters.getIdToken + '', {
        status: "seen"
      }).then(res => {})
    }
  }
}

// Open thred of messages
export const openThred = (context, payload) => {
  context.commit("setCurrentSender", payload);
  var msgs = context.getters.getMessages["from_" + payload];
  context.commit("setThredOfMessages", msgs);
  msgs = {
    msg: msgs,
    to: context.getters.getUser.username,
    from: payload
  };
  context.dispatch("changeMessageStatus", msgs);
}

// Featch list of all user names, for composing new message
export const fetchAllUserNames = ({
  commit,
  getters
}) => {
  if (getters.getIdToken == null) {
    return;
  }
  Vue.http.get("https://vue-js-app-d8354.firebaseio.com/userNames.json?auth=" + getters.getIdToken).then(
    res => {
      var userNames = [];
      for (var key in res.body) {
        userNames.push(res.body[key].username)
      }
      var myUserNameIndex = userNames.indexOf(getters.getUser.username);
      userNames.splice(myUserNameIndex, 1)
      commit("setUserNames", userNames)
    }, error => {
      console.log("Fetch User Names Data Error!!!")
    })
}

// Fetch user data
export const fetchUser = (context) => {
  if (context.getters.getIdToken == null) {
    return;
  }
  Vue.http.get("https://vue-js-app-d8354.firebaseio.com/users/" + context.getters.getUserId + "/user.json/?auth=" + context.getters.getIdToken).then(
    res => {
      context.commit("setUser", res.body)
      context.commit("setUserPic", res.body.pic)
    }, error => {
      console.log("Fetch User Data Error!!!")
    })
}

// Update user profile
export const updateProfile = (context, payload) => {
  if (context.getters.getIdToken == null) {
    return;
  }
  Vue.http.put("https://vue-js-app-d8354.firebaseio.com/users/" + context.getters.getUserId + "/user.json/?auth=" + context.getters.getIdToken, payload).then(res => {
    context.commit("setUpdated", true);
    context.dispatch("fetchUser");
    var vm = context;
    setTimeout(() => {
      vm.commit("setUpdated", false)
    }, 3000, vm);
  }, error => {
    console.log("Store User Data Error!!!")
  })
}

// Change password
export const changePassword = (context, payload) => {
  if (context.getters.getIdToken == null) {
    return;
  }
  Vue.http.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=AIzaSyBJjKfS2hr-ZTOCMB7X16xDL2H47482Ub8", payload).then(res => {
    context.dispatch("logOut")
  });
}

// Reser password
export const resetPassword = (context, payload) => {
  Vue.http.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=AIzaSyBJjKfS2hr-ZTOCMB7X16xDL2H47482Ub8", payload).then(res => {
    console.log(res)
    context.commit("setWrongPassword", false);
    //  context.commit("setResetPasswordRequest", true);
    var vm = context;
    setTimeout(() => {
      vm.commit("setResetPasswordRequest", true)
    }, 1000, vm);

    setTimeout(() => {
      vm.commit("setResetPasswordRequest", false)
    }, 5000, vm);

  });
}

// Save bookmarked heroes
export const saveHeroList = (context, payload) => {
  if (context.getters.getIdToken == null) {
    return;
  }
  Vue.http.put("https://vue-js-app-d8354.firebaseio.com/users/" + context.getters.getUserId + "/heroes.json/?auth=" + context.getters.getIdToken, payload).then(res => {}, error => {
    console.log("Store User Data Error!!!")
  })
}

// Get bookmarked heroes
export const getHeroList = (context) => {
  if (context.getters.getIdToken == null || (context.getters.getUser && context.getters.getNameStartsWith.length > 0)) {
    return;
  }
  Vue.http.get("https://vue-js-app-d8354.firebaseio.com/users/" + context.getters.getUserId + "/heroes.json/?auth=" + context.getters.getIdToken).then(res => {
    if (!res.body) {
      context.dispatch("trashHeroList");
      return
    }
    context.commit("setBookmarkedArray", res.body.bookmarkedArray);
    context.commit("setArrayOfIds", res.body.arrayOfIds);
    context.commit("setData", res.body.bookmarkedArray)
  }, error => {
    console.log("Store User Data Error!!!")
  })
}

// Save auth token
export const saveToken = (context, expiresIn) => {
  var now = new Date();
  var exparationDate = new Date(now.getTime() + expiresIn * 1000);
  localStorage.setItem("idToken", context.getters.getIdToken);
  localStorage.setItem("userId", context.getters.getUserId);
  localStorage.setItem("exparationDate", exparationDate);
}

// Try auto login if token exist
export const tryAutoLogin = (context) => {
  var idToken = localStorage.getItem("idToken");
  if (!idToken) {
    return
  }
  var userId = localStorage.getItem("userId");
  var exparationDate = localStorage.getItem("exparationDate");
  var exparationDate = new Date(exparationDate)
  var now = new Date();

  if (now >= exparationDate) {
    return
  }
  context.commit("authUser", {
    idToken: idToken,
    userId: userId
  })
  context.dispatch("setLogoutTimer", (exparationDate - now))
  context.dispatch("fetchUser");
  router.push("/")
}

// Refresh token
export const getFreshIdToken = (context) => {
  if (context.getters.getIdToken == null) {
    return;
  }
  var payload = {
    grant_type: "refresh_token",
    refresh_token: context.getters.getRefreshIdToken
  }
  Vue.http.post("https://securetoken.googleapis.com/v1/token?key=AIzaSyBJjKfS2hr-ZTOCMB7X16xDL2H47482Ub8", payload).then(res => {
    //context.dispatch("saveToken", res.body.expiresIn)
    context.commit("authUser", {
      idToken: res.body.id_token,
      userId: res.body.local_id
    })
    context.dispatch("setLogoutTimer", res.body.expires_in)
  });
}

// Delete all heroes from lists
export const trashHeroList = ({
  commit
}) => {
  commit("setBookmarkedArray", []);
  commit("setArrayOfIds", []);
  commit("setData", [])
}

// Logout
export const logOut = (context) => {
  context.commit("setViewBookmarked", false)
  context.commit("logOutData");
  context.dispatch("trashHeroList")
}
