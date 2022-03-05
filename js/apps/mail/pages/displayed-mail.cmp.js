import { mailService } from "../services/mail.service.js"
import { eventBus } from "../../../services/eventBus-service.js"

export default {
  template: `
        <section class="displayed-email-page  main-layout">
          <div class="mail-display-card page-as-card-layout flex flex-column">

            <h1>Subject: {{mail.subject}}</h1>
            <h3>From: {{mail.fullname}} <{{mail.from}}></h3>
            <p class="mail-txt">{{mail.txt}}</p>
              
            <div class="first-buttons-row flex ">

                <button class="btn" title="Mark Unread" @click="markUnread"><i class="fa-solid fa-envelope"></i></button>
                <button class="btn" title="Delete Message" @click="deleteMessage"><i class="fa-solid fa-trash-can"></i></button>
                <router-link class="btn" title="Reply" :to="'/compose/'+mail.id"><i class="fa-solid fa-reply"></i></router-link>
                <router-link class="btn" title="Save in Keepsus" :to="'/keep/edit/'+mail.id"><i class="fa-solid fa-paper-plane"></i></router-link>

            </div>
              
            <div class="second-buttons-row flex ">
                <router-link class="btn" title="Previous Email" :to="'/mail/'+mail.prevMailId"><i class="fa-solid fa-angles-left"></i></router-link>
                <router-link class="btn" title="Next Email" :to="'/mail/'+mail.nextMailId"><i class="fa-solid fa-angles-right"></router-link>
                <router-link class="btn" title="Back To Inbox" to="/mail"><i class="fa-solid fa-inbox"></i></router-link>
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
    reply() { },
  },
}
