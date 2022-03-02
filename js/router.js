const routes = [
    {
      path: "/",
      component: homePage
    },
    // {
    //   path: "/about",
    //   component: aboutPage,
    //   children: [
    //     {
    //       path: 'team',
    //       component: aboutTeam
    //     },
    //     {
    //       path: 'services',
    //       component: aboutServices
    //     }
    //   ]
    // },
    // {
    //   path: "/book",
    //   component: bookApp
    // },
    // {
    //   path: "/book/:bookId",
    //   component: bookDetails
    // },
    // {
    //   path: "/add",
    //   component: addBook
    // }
  ]
  
  export const router = VueRouter.createRouter({
      routes,
      history: VueRouter.createWebHashHistory()
  })