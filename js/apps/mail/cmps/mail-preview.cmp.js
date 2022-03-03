export default {
  props: ["mail"],
  template: `
    <router-link :to="'/mail/'+mail.id">
    <li >
      
        <p :class="isBold">From: {{mail.from}}</p>
        <p><span class="mail-subject" :class="isBold">{{mail.subject}}</span></p>
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
