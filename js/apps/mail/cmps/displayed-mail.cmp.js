import { mailService } from "../services/mail.service.js"

export default {
  template: `
        <pre v-model="mail"></pre>
        <h1>Email</h1>
        <h1>{{mail.subject}}</h1>
        <p>{{mail.txt}}</p>
        <button @click="markUnread">Mark as Unread</button>
        <router-link :to="'/mail/'+mail.prevMailId">Prev Email</router-link> | 
        <router-link :to="'/mail/'+mail.nextMailId">Next Email</router-link> | 
        <router-link to="/mail">Back</router-link> | 
            
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
    },
  },
}
