import { mailService } from "../services/mail.service.js"
import { eventBus } from "../../../services/eventBus-service.js"


export default {
  template: `
        
        <h1>Email</h1>
        <h1>{{mail.subject}}</h1>
        <p>{{mail.txt}}</p>
        <button @click="markUnread">Mark as Unread</button>
        <button @click="deleteMessage">Delete Message</button>
        <router-link :to="'/mail/'+mail.prevMailId">Prev Email</router-link> | 
        <router-link :to="'/mail/'+mail.nextMailId">Next Email</router-link> | 
        <router-link to="/mail">Back</router-link>
            
    `,
  data() {
    return {
      mail: null,
    }
  },
  computed: {
    mailId() {
      return this.$route.params.mailId
    },
  },
  watch: {
    mailId: {
      handler() {
        this.loadMail()
      },
      immediate: true,
    },
  },

  methods: {
    loadMail() {
      mailService.get(this.mailId).then((mail) => {
        this.mail = mail
        this.mail.isRead = true
        mailService.save(this.mail)
      })
    },
    markUnread() {
      this.mail.isRead = false
      mailService.save(this.mail)
      .then(mail => this.mail=mail)
    },
    deleteMessage(){
      mailService.deleteMail(this.mail.id)
      .then(mail => {
        eventBus.emit("show-msg", { txt: "Your Message Has Been Deleted" })
        this.$router.push("/mail")
      })
    }
  },
}
