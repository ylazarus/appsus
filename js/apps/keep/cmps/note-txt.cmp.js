export default {
    props: ['info', 'colorsList'],
    template: `
    <section class="note-txt" :style="backGroundColor">
        <h3 class="subject" data-name="subject" :contenteditable="isEditable" @keyup="saveChange">{{subject}}</h3>
        <p class="text" data-name="text" :contenteditable="isEditable" @keyup="saveChange">{{text}}</p>
        <div v-if="isUpdateMode"  class="update-note">
            <button class="btn" @click="deleteNote">Delete</button>
            <button class="btn" @click="updateNotes">Save</button>
            <button class="btn" @click="isOpenColors = !isOpenColors">Color</button>
            <div v-if="isOpenColors" class="colors">
                <button v-for="(value, name) in colorsList" :class="'color-btn-'+name" :data-name="value" @click="changeColor"></button>
            </div>
        </div>
    </section>
    `,
    data() {
        return {
            subject: this.info.subject,
            text: this.info.text,
            style: this.info.style,
            isUpdateMode: this.info.isUpdateMode,
            isOpenColors: false
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
        changeColor(ev) {
            this.info.style.backGroundColor = ev.target.dataset.name
            this.isOpenColors = false
        },
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