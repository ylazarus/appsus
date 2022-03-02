export default{
    props: ['info'],
    template: `
    <section class="note-video">
        <h3>{{subject}}</h3>
    </section>
    `,
    data() {
        return {
            subject: this.info.subject,
            src: this.info.src,
            style: this.info.style,
        }
    },
    created() {
        console.log(this.info);
    }
}