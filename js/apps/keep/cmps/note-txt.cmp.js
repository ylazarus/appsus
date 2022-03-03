export default{
    props: ['info'],
    template: `
    <section class="note-txt" >
    <h3 class="subject" :contenteditable="isEditable" @keyup="saveChange">{{subject}}</h3>
        <p class="text" :contenteditable="isEditable" @keyup="saveChange">{{text}}</p>
        <router-link to="/keep" @click="deleteNote">Delete</router-link>
        
        <div v-if="isUpdateMode"  class="update-note">
            <router-link to="/keep" @click="updateNotes">Save</router-link>
            <pre>{{info}}</pre>
        </div>
    </section>
    `,
    data() {
        return {
            subject: this.info.subject,
            text: this.info.text,
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
}