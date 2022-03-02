import appHome from "./pages/app-home.cmp.js"
import appAbout from "./pages/app-about.cmp.js"
import mailIndex from "./apps/mail/pages/mail-index.cmp.js"
import noteIndex from "./apps/keep/pages/note-index.cmp.js"
import displayedMail from "./apps/mail/cmps/displayed-mail.cmp.js"






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
      path: "/mail/:mailId",
      component: displayedMail
    },
    {
      path: "/keep",
      component: noteIndex
    },
  ]
  
  export const router = VueRouter.createRouter({
      routes,
      history: VueRouter.createWebHashHistory()
  })