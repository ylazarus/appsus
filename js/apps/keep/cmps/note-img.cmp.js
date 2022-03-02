export default {
    props: ['info'],
    template: `
    <section class="note-img">
        <h3 class="subject" :contenteditable="isEditable" @keyup="save">{{subject}}</h3>
        <img :src="src" alt="select image">
        <input v-if="isUpdateMode" type="text" placeholder="enter image url" v-model="src">
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
    },
    methods: {
        save(ev){
            console.log(ev);
            console.log(ev.target.className);
            console.log(ev.target.innerText);
        }
    },
    watch: {
        src(){
            this.info.image = this.src
            console.log(this.src);
        }
    }
}