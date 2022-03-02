import { router } from "./router.js";

const options = {
    template: `
        <section>
            <!-- <app-header /> -->
            <!-- <user-msg /> -->
            <router-view />
        </section>
    `,
    // components:{
    //    appHeader,
    //    userMsg 
    // }
};

const app = Vue.createApp(options);
app.use(router)
app.mount('#app');