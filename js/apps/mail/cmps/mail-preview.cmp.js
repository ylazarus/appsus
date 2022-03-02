

export default {
  props: ["mail"],
  template: `
    <router-link :to="'/mail/'+mail.id">
    <tr>
        <td>{{mail.to}}</td>
        <td><span class="mail-subject">{{mail.subject}}</span> {{mail.txt}}</td>
        <td>{{sentAt}}</td>
      </tr>   
    </router-link>
    `,
  computed: {
      sentAt(){
        return new Date(this.mail.sentAt).toISOString().substring(0, 10)

      }
  }
}
