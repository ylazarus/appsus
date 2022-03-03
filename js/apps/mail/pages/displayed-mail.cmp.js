import { mailService } from "../services/mail.service.js"
import { eventBus } from "../../../services/eventBus-service.js"


export default {
  template: `
        <section class="displayed-email-page main-layout">
          <h1>Email</h1>
          <div>

            <h1>{{mail.subject}}</h1>
            <h3>From: {{mail.from}}</h3>
            <p>{{mail.txt}}</p>
            <button class="btn" @click="markUnread">Mark as Unread</button>
            <button class="btn" @click="deleteMessage">Delete Message</button>
            <router-link class="btn" :to="'/compose/'+mail.id">Reply</router-link>
            <router-link class="btn" :to="'/mail/'+mail.prevMailId">Prev Email</router-link> | 
            <router-link class="btn" :to="'/mail/'+mail.nextMailId">Next Email</router-link> | 
            <router-link class="btn" to="/mail">Back</router-link>
          </div>
        </section>
            
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
    },
    reply(){

    }

  },
}
