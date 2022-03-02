export default {
  props: ["mail"],
  template: `
    <router-link :to="'/mail/'+mail.id">
    <li >
        <p :class="isBold">{{mail.to}}</p>
        <p><span :class="isBold">{{mail.subject}}</span> {{mail.txt}}</p>
        <p>{{sentAt}}</p>
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
