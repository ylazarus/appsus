import { mailService } from "../services/mail.service.js"
import mailList from "../cmps/mail-list.cmp.js"

export default{
    template: `
    <h1>Mail App</h1>
    <input class="mail-search" title="Search Mail" type="text" placeholder="Search Mail">
    <input type="checkbox" title="Show Read/Unread" class="show-read-unread">
    <section class="main-page-container">
        <nav class="mail-nav">
        <router-link to="/compose">+ Compose</router-link>
            <ul>
                <!-- each is essentially a filter -->
                <li>Inbox <span>({{unreadCount}} unread)</span></li>
                <li>Sent</li>
                <!-- <li>Drafts</li> -->
                <!-- <li>Starred</li> -->
            </ul>
        </nav>
        <main class="mail-container">
            <mail-list :mails="mails"
              />
        </main>

    </section>
    `,
    components: {
        mailList,
    },
   
    data() {
        return {
             mails: null,
             
             filterBy: null,

        }
    },
    computed: {
        unreadCount(){
            let count = 0
            this.mails.forEach(mail => {
                if (!mail.isRead) count++
            });
            return count
        }
    },
    created() {
        mailService.query()
            .then(mails => this.mails = mails)
    },
    
    methods: {
        
    }
}