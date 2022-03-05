export default {
    props: ['info', 'colorsList'],
    template: `
    <section class="note-txt" :style="backGroundColor">
        <h3 class="subject" data-name="subject" :contenteditable="isEditable" @keyup="saveChange">{{subject}}</h3>
        <p class="text" data-name="text" :contenteditable="isEditable" @keyup="saveChange">{{text}}</p>
        <div v-if="isUpdateMode"  class="update-note edit-buttons">
            <button class="btn" @click="deleteNote"><i class="fa-solid fa-trash-can"></i></button>
            <button class="btn" @click="updateNotes"><i class="fa-solid fa-v"></i></button>
            <button class="btn" @click="isOpenColors = !isOpenColors"><i class="fa-solid fa-palette"></i></button>
            <div v-if="isOpenColors" class="colors">
                <button v-for="(value, name) in colorsList" :class="'color-btn-'+name" :data-name="value" @click="changeColor"></button>
            </div>
            <button title="Send as Email" class="btn" @click="sendMile"><i class="fa-solid fa-paper-plane"></i></button>

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
        },
        sendMile() {
            this.info.isUpdateMode = false
            this.$emit('send', { ...this.info })
        }
    },
}