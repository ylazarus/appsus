export default {
    props: ['info'],
    template: `
    <section class="note-txt" :style="backGroundColor">
    <h3 class="subject" data-name="subject" :contenteditable="isEditable" @keyup="saveChange">{{subject}}</h3>
        <p class="text" data-name="text" :contenteditable="isEditable" @keyup="saveChange">{{text}}</p>
        <div v-if="isUpdateMode"  class="update-note">
        <button class="btn" @click="deleteNote">Delete</button>
        <button class="btn" @click="updateNotes">Save</button>
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
        },
        backGroundColor() {
            return `background-color: ${this.style.backGroundColor}`
        }
    },
    methods: {
        saveChange(ev) {
            console.log(ev);
            this.info[ev.target.dataset.name] = ev.target.innerText
        },
        updateNotes() {
            this.info.isUpdateMode = false
            this.$emit('update', { ...this.info })
        },
        deleteNote() {
            this.$emit('delete', { ...this.info })
        }
    },
}