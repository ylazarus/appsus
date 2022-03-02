export default {
    props: ['info'],
    template: `
    <section class="note-img">
        <h3 :contenteditable="isEditable">{{subject}}</h3>
        <img :src="src" alt="select image">
        <input type="text" placeholder="enter image url" v-model="src">
        <pre>{{info}}</pre>
    </section>
    `,
    data() {
        return {
            subject: this.info.subject,
            src: this.info.image,
            style: this.info.style,
            isUpdateMode: this.info.isUpdateMode
        }
    },
    created() {
        console.log(this.info);
    },
    computed: {
        isEditable(){
            return this.info.isUpdateMode
        }
    }
}