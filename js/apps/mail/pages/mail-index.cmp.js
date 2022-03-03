import { mailService } from "../services/mail.service.js"
import mailList from "../cmps/mail-list.cmp.js"
import mailFilter from "../cmps/mail-filter.cmp.js"

export default{
    template: `
    <h1>Mail App</h1>



    <section class="main-page-container">
        <mail-filter class="mail-filter" @filtered="setFilter" />
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
            <mail-list :mails="mailsToShow"
              />
        </main>

    </section>
    `,
    components: {
        mailList,
        mailFilter,
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
        },
        mailsToShow(){
            if (!this.filterBy) return this.mails
            return this.mails.filter((mail) =>{
                return (mail.txt.includes(this.filterBy.txt) ||
                        mail.subject.includes(this.filterBy.txt) ||
                        mail.from.includes(this.filterBy.txt) ||
                        mail.to.includes(this.filterBy.txt)) &&
                        (mail.isRead && this.filterBy.readUnread.includes('read')) ||
                        (!mail.isRead && this.filterBy.readUnread.includes('unread'))
            })
        }
    },
    created() {
        mailService.query()
            .then(mails => this.mails = mails)
    },
    
    methods: {
        setFilter(filterBy){
            this.filterBy = filterBy;

        }
    }
}