export default{
    props: ['info'],
    template: `
    <section class="note-todos">
        <h3>{{subject}}</h3>
        
    </section>
    `,
    data() {
        return {
            subject: this.info.subject,
            todosList: this.info.list,
            style: this.info.style,

        }
    },
    created() {
        console.log(this.info);
    },
}