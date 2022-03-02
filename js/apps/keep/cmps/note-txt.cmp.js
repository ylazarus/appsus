export default{
    props: ['info'],
    template: `
    <section class="note-txt" >
        <h3>{{subject}}</h3>
        <p>{{body}}</p>
    </section>
    `,
    data() {
        return {
            subject: this.info.subject,
            body: this.info.body,
            style: this.info.style,

        }
    },
    created() {
        console.log(this.info);
    }
}