import { mailService } from "../services/mail.service.js"
import { eventBus } from "../../../services/eventBus-service.js"

export default {
  template: `
        <section class="displayed-email-page  main-layout">
          <div class="mail-display-card page-as-card-layout flex flex-column">

            <h1>Subject: {{mail.subject}}</h1>
            <h3>From: {{mail.from}}</h3>
            <p class="mail-txt">{{mail.txt}}</p>
              
            <div class="first-buttons-row flex ">

                <button class="btn" @click="markUnread">Mark as Unread</button>
                <button class="btn" @click="deleteMessage">Delete Message</button>
                <router-link class="btn" :to="'/compose/'+mail.id">Reply</router-link>
                <router-link class="btn" :to="'/keep/edit/'+mail.id">Save in Notesus</router-link>

            </div>
              
            <div class="second-buttons-row flex ">
                <router-link class="btn" :to="'/mail/'+mail.prevMailId">Prev Email</router-link>
                <router-link class="btn" :to="'/mail/'+mail.nextMailId">Next Email</router-link>
                <router-link class="btn" to="/mail">Back To Inbox</router-link>
            </div>
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
      mailService.save(this.mail).then((mail) => {
        this.mail = mail
        eventBus.emit("show-msg", { txt: "Marked Unread" })
      })
    },
    deleteMessage() {
      mailService.deleteMail(this.mail.id).then((mail) => {
        eventBus.emit("show-msg", { txt: "Your Message Has Been Deleted" })
        this.$router.push("/mail")
      })
    },
    reply() {},
  },
}
