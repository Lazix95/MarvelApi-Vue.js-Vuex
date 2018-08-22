import {router} from './../../../main.js'
// import {format} from "path";
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
const state = {
  idToken: null,
  userId: null,
  user: null,
  wrongPassword: false,
  updated: false,
  pic: null,
  messages: null,
  resetPasswordRequest: false,
  refreshIdToken: null,
  foreverLogIn: false,
  timer: null,
  currentSender: null,
  thredOfmessages: null,
  newMessage: false,
  userNames: null

}



export default {
  state,
  mutations,
  getters,
  actions
}
