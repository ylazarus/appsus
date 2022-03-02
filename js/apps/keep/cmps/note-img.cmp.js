export default {
    props: ['info'],
    template: `
    <section class="note-img">
        <h3>{{subject}}</h3>
        <img :src="src">        
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