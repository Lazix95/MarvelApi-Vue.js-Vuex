import singup from './components/userCmp/singUp.vue'
import table from './components/table.vue'
import login from './components/userCmp/login.vue'
import userpage from './components/userCmp/userpageV2.vue'
import userInfo from './components/userCmp/userInfo.vue'
import messages from './components/userCmp/messages.vue'
import newMessage from './components/userCmp/newMessage.vue'
//import settings from './components/userCmp/settings.Vue'

import {
  store
} from './store/store'

export const routes = [{
    path: "/",
    redirect: "/page/1"
  },
  {
    path: "/page/:number",
    component: table,
    beforeEnter: (to, from, next) => {
      if (store.getters.getIdToken != null) {
        next()
      } else {
        next("/login")
      }
    }
  },
  {
    path: '/singup',
    component: singup,
    beforeEnter: (to, from, next) => {
      if (store.getters.getIdToken == null) {
        next()
      } else {
        next("/")
      }
    }
  },
  {
    path: '/login',
    component: login,
    beforeEnter: (to, from, next) => {
      if (store.getters.getIdToken == null) {
        next()
      } else {
        next("/")
      }
    }
  },
  {
    path: '/userpage',
    component: userpage,
    children: [{
        path: "",
        component: userInfo
      },
      {
        path: "messages",
        component: messages
      },
      // {path:"settings",component:settings}
      {path:"newMessage", component:newMessage}
    ],
    beforeEnter: (to, from, next) => {
      if (store.getters.getIdToken != null) {
        next()
      } else {
        next("/")
      }
    }
  }
]
