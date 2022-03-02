import { mailService } from "../services/mail.service.js"

export default {
  template: `

        <h1>Email</h1>
        <h1>{{mail.subject}}</h1>
        <p>{{mail.txt}}</p>
        <router-link :to="'/mail/'+mail.prevBookId">Prev Email</router-link> | 
        <router-link :to="'/mail/'+mail.nextBookId">Next Email</router-link> | 
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
      mailService.get(this.mailId).then((mail) => (this.mail = mail))
    },
  },
}
