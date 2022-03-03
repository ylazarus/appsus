export default {
    props: ['info'],
    template: `
    <section class="note-img">
        <h3 class="subject" :contenteditable="isEditable" @keyup="saveChange">{{subject}}</h3>
        <img :src="src" alt="select image">
        <router-link to="/keep" @click="deleteNote">Delete</router-link>
        
        <div v-if="isUpdateMode"  class="update-note">
            <label>
                Enter image url: 
                <input type="text" placeholder="enter image url" v-model="src">
            </label>
            <router-link to="/keep" @click="updateNotes">Save</router-link>
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
    computed: {
        isEditable() {
            return this.info.isUpdateMode
        }
    },
    methods: {
        saveChange(ev) {
            this.info[ev.target.className] = ev.target.innerText
        },
        updateNotes() {
            this.info.isUpdateMode = false
            this.$emit('update', {...this.info})
        },
        deleteNote() {
            this.$emit('delete', {...this.info})
        }
    },
    watch: {
        src() {
            this.info.image = this.src
        }
    }
}