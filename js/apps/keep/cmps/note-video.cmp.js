export default{
    props: ['info'],
    template: `
    <section class="note-video">
        <h3>{{subject}}</h3>
        <iframe width="150" height="100"
            :src="src">
        </iframe>
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