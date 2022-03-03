export default{
    props: ['info'],
    template: `
    <section class="note-video">
    <h3 class="subject" :contenteditable="isEditable" @keyup="saveChange">{{subject}}</h3>
        <iframe width="150" height="100"
            :src="src">
        </iframe>
        <router-link to="/keep" @click="deleteNote">Delete</router-link>
        
        <div v-if="isUpdateMode"  class="update-note">
            <label>
                Enter video url: 
                <input type="text" placeholder="enter video url" v-model="src">
            </label>
            <router-link to="/keep" @click="updateNotes">Save</router-link>
            <pre>{{info}}</pre>
        </div>
    </section>
    `,
    data() {
        return {
            subject: this.info.subject,
            src: this.info.video,
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
            this.info.video = this.src
        }
    }
}