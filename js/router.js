import appHome from "./pages/app-home.cmp.js"
import appAbout from "./pages/app-about.cmp.js"
import mailIndex from "./apps/mail/pages/mail-index.cmp.js"
import noteIndex from "./apps/keep/pages/note-index.cmp.js"




const routes = [
    {
      path: "/",
      component: appHome
    },
    {
      path: "/about",
      component: appAbout,
    },
    {
      path: "/mail",
      component: mailIndex
    },
    {
      path: "/keep",
      component: noteIndex
    },
    // {
    //   path: "/add",
    //   component: addBook
    // }
  ]
  
  export const router = VueRouter.createRouter({
      routes,
      history: VueRouter.createWebHashHistory()
  })