export default {
  props: ["mail"],
  template: `
    <router-link class="clean-link" :to="'/mail/'+mail.id">
    <li class="flex space-between clean-list  email-list" >
      <div class="from-subject flex space-between">    
          <p :class="isBold">{{mail.from}}</p>
          <p><span class="mail-subject no-overflow" :class="isBold">{{mail.subject}}</span></p>
      </div>
      <p :class="isBold" >{{sentAt}}</p>
    </li>   
    </router-link>
    `,
  methods: {
    
  },
  computed: {
    sentAt() {
      return new Date(this.mail.sentAt).toISOString().substring(0, 10)
    },
    isBold() {
      return { bold: !this.mail.isRead }
    },
  },
}
