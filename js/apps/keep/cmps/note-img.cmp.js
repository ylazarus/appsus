export default {
    props: ['info', 'colorsList'],
    template: `
    <section class="note-img"  :style="backGroundColor">
        <h3 class="subject" data-name="subject" :contenteditable="isEditable" @keyup="saveChange">{{subject}}</h3>
        <img :src="src" alt="select image">
       
        <div v-if="isUpdateMode"  class="update-note">
            <label>
                Enter image url: 
                <input type="text" placeholder="enter image url" v-model="src">
            </label>
            <div class="edit-buttons">
                
                <button title="Delete" class="btn" @click="deleteNote"><i class="fa-solid fa-trash-can"></i></button>
                <button title="Save" class="btn" @click="updateNotes"><i class="fa-solid fa-floppy-disk"></i></button>
                <button title="Change Background Color" class="btn" @click="isOpenColors = !isOpenColors"><i class="fa-solid fa-palette"></i></button>
                <div v-if="isOpenColors" class="colors">
                    <button v-for="(value, name) in colorsList" :class="'color-btn-'+name" :data-name="value" @click="changeColor"></button>
                </div>
                <button title="Send as Email" class="btn" @click="sendMile"><i class="fa-solid fa-paper-plane"></i></button>
            </div>

        </div>
    </section>
    `,
    data() {
        return {
            subject: this.info.subject,
            src: this.info.image,
            style: this.info.style,
            isUpdateMode: this.info.isUpdateMode,
            isOpenColors: false

        }
    },
    computed: {
        isEditable() {
            return this.info.isUpdateMode
        },
        backGroundColor(){
            return `background-color: ${this.style.backGroundColor}`
        }
    },
    methods: {
        changeColor(ev) {
            this.info.style.backGroundColor = ev.target.dataset.name
            this.isOpenColors = false
        },
        saveChange(ev) {
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
    watch: {
        src() {
            this.info.image = this.src
        }
    }
}