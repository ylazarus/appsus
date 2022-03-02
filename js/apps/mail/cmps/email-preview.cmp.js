

export default {
  props: ["email"],
  template: `
    <tr @click="emailSelected">
        <td>{{email.to}}</td>
        <td><span class="email-subject">{{email.subject}}</span> {{email.txt}}</td>
        <td>{{sentAt}}</td>
    </tr>   
    `,
  methods: {
    emailSelected() {
      this.$emit("emailSelected", { ...this.email })
    },
  },
  computed: {
      sentAt(){
        return new Date(this.email.sentAt).toISOString().substring(0, 10)

      }
  }
}
