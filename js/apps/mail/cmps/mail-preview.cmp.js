export default {
  props: ["mail"],
  template: `
    <router-link class="clean-link" :to="'/mail/'+mail.id">
    <li class="flex space-between clean-list  email-list" >
      <p class="mail-from" :class="isBold">{{mail.from}}</p>
      <p class="mail-subject" :class="isBold">{{mail.subject}}</p>
      <p class="sent-at" :class="isBold" >{{sentAt}}</p>
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
