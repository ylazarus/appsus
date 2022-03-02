export default {
    props: ['note'],
    template: `
    <section class="note-img">
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