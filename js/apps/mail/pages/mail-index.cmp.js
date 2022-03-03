import { mailService, loggedinUser} from "../services/mail.service.js"
import mailList from "../cmps/mail-list.cmp.js"
import mailFilter from "../cmps/mail-filter.cmp.js"

export default{
    template: `
    <main class="mail-page-container main-layout">
    <header class="main-page-header flex">    
        <h1 class="mail-logo">Mail App</h1>
        <mail-filter @sorted="setSort" @filtered="setFilter" />
    </header>
        <div class="nav-mail-container flex">
            <nav class="mail-nav flex flex-column">
                <router-link class="btn" to="/compose">+ Compose</router-link>
                <button class="btn" @click="setCurrFolder('inbox')">Inbox <span>({{unreadCount}} unread)</span></button>
                <button class="btn" @click="setCurrFolder('sent')">Sent</button>
            </nav>
            <section class="mail-container">
                <mail-list :mails="mailsToShow"/>
            </section>
        </div>
    </main>
    `,
    components: {
        mailList,
        mailFilter,
    },
   
    data() {
        return {
            mails: null,
            filterBy:  {
                txt: '',
                readUnread: ['read', 'unread'],
              },
            sortBy: 'createdDate',
            currFolder: 'inbox'

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
            // if (!this.filterBy) return this.mails
            let filtered = this.mails.filter(mail =>{
                return (mail.txt.includes(this.filterBy.txt) ||
                        mail.subject.includes(this.filterBy.txt) ||
                        mail.from.includes(this.filterBy.txt) ||
                        mail.to.includes(this.filterBy.txt)) &&
                        (mail.isRead && this.filterBy.readUnread.includes('read')) ||
                        (!mail.isRead && this.filterBy.readUnread.includes('unread'))
            })
            console.log(filtered);
            let folderFilter
            if (this.currFolder === 'inbox'){
                console.log('we are checking the inbox');
                folderFilter = filtered.filter(mail=>{
                    return mail.to === loggedinUser.mail
                })
            } else if (this.currFolder === 'sent'){
                folderFilter = filtered.filter(mail=>{
                    return mail.from === loggedinUser.mail
                })
            }
            console.log(folderFilter);
            if (this.sortBy === 'createdDate') folderFilter.sort(function(a, b){return b.sentAt-a.sentAt})
            if (this.sortBy === 'subject') folderFilter.sort(function(a, b){return a.subject-b.subject})
            
            return folderFilter
        },
        

    },
    created() {
        mailService.query()
            .then(mails => {
                this.mails = mails
            })
    },
    
    methods: {
        setFilter(filterBy){
            this.filterBy = filterBy;
        },
        setSort(sortBy){
            this.sortBy = sortBy
        },
        setCurrFolder(folder){
            this.currFolder = folder
        }
    }
}