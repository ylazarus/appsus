

export default {
  props: ["email"],
  template: `
    <tr @click="emailSelected">
        <td>{{email.to}}</td>
        <td>{{email.subject}} {{email.txt}}</td>
        <td>{{email.createdAt}}</td>
    </tr>   
    `,
  methods: {
    emailSelected() {
      this.$emit("emailSelected", { ...this.email })
    },
  },
}
