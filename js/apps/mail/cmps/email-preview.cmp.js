

export default {
  props: ["email"],
  template: `
    <tr @click="emailSelected">
        <td>{{email.to}}</td>
        <td>{{email.subject}} {{email.txt}}</td>
        <td>{{email.createdAt.toISOString().substring(0, 10)
}}</td>
    </tr>   
    `,
  methods: {
    emailSelected() {
      this.$emit("emailSelected", { ...this.email })
    },
  },
}
