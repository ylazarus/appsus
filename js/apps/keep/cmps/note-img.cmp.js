export default {
    props: ['info'],
    template: `
    <section class="note-img">
        <h3 class="subject" :contenteditable="isEditable" @keyup="saveChange">{{subject}}</h3>
        <img :src="src" alt="select image">
        <div v-if="isUpdateMode"  class="update-note">
            <label>
                Enter image url: 
                <input type="text" placeholder="enter image url" v-model="src">
            </label>
            <button to="/keep" @click="updateNote">Save</button>
            <!-- <router-link to="/keep" @click="updateNote">Save</router-link> -->
            <pre>{{info}}</pre>
        </div>
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
        isEditable() {
            return this.info.isUpdateMode
        }
    },
    methods: {
        saveChange(ev) {
            this.info[ev.target.className] = ev.target.innerText
            console.log(this.info);
        },
        updateNote() {
            this.info.isUpdateMode = false
            this.$emit('update', {...this.info})
        }
    },
    watch: {
        src() {
            this.info.image = this.src
            console.log(this.src);
            console.log(this.info);
        }
    }
}