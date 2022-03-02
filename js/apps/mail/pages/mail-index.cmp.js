import { mailService } from "../services/mail.service.js"
import emailList from "../cmps/email-list.cmp.js"
import displayedEmail from "../cmps/displayed-email.cmp.js"

export default{
    template: `
    <h1>Mail App</h1>
    <input class="mail-search" title="Search Mail" type="text" placeholder="Search Mail">
    <input type="checkbox" title="Show Read/Unread" class="show-read-unread">
    <section class="main-page-container">
        <nav class="mail-nav">
            <button>+ Compose</button>
            <ul>
                <!-- each is essentially a filter -->
                <li>Inbox</li>
                <li>Sent</li>
                <!-- <li>Drafts</li> -->
                <!-- <li>Starred</li> -->
            </ul>
        </nav>
        <main class="email-container">
            <h1>emails here</h1>
            <email-list v-if="!selectedEmail" :emails="emails" @emailSelected="emailSelected"/>
            <displayed-email v-if="selectedEmail" :currEmail="selectedEmail" />
        </main>

    </section>
    `,
    components: {
        emailList,
        displayedEmail
    },
   
    data() {
        return {
             emails: null,
             selectedEmail: null,
             filterBy: null,

        }
    },
    created() {
        mailService.query()
            .then(emails => this.emails = emails)
    },
    methods: {
        emailSelected(email){
            this.selectedEmail = email

        }
    }
}