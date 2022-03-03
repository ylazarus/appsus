import appHome from "./pages/app-home.cmp.js"
import appAbout from "./pages/app-about.cmp.js"
import mailIndex from "./apps/mail/pages/mail-index.cmp.js"
import noteIndex from "./apps/keep/pages/note-index.cmp.js"
import addNote from "./apps/keep/cmps/add-note.cmp.js"
import displayedMail from "./apps/mail/pages/displayed-mail.cmp.js"
import newMail from "./apps/mail/pages/new-mail.cmp.js"





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
      path: "/compose/:mailId?",
      component: newMail
    },
    {
      path: "/keep",
      component: noteIndex,
      children: [
        {
            path: 'edit/:noteId?',
            component: addNote
        }
    ]
    },
  ]
  
  export const router = VueRouter.createRouter({
      routes,
      history: VueRouter.createWebHashHistory()
  })