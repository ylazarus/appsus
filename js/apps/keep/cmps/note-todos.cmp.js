export default {
    props: ['info', 'colorsList'],
    template: `
    <section class="note-todos" :style="backGroundColor">
    <h3 class="subject" data-name="subject" :contenteditable="isEditable" @keyup="saveChange">{{subject}}</h3>
        <ul>
            <li class="todo-line" v-for="(todo, index) in todosList" >
                <input type="checkbox" v-model="todo.isDone">
                <p :class="'' +todo.idx" :data-name="'' +todo.idx" :contenteditable="isEditable" @keyup="saveChange">{{todo.txt}}</p>
            </li>
        </ul>
        
        <div v-if="isUpdateMode"  class="update-note edit-buttons">
            <button class="btn" @click="addLine">Add line</button>

            <button title="Delete" class="btn" @click="deleteNote"><i class="fa-solid fa-trash-can"></i></button>
                <button title="Save" class="btn" @click="updateNotes"><i class="fa-solid fa-floppy-disk"></i></button>
                <button title="Change Background Color" class="btn" @click="isOpenColors = !isOpenColors"><i class="fa-solid fa-palette"></i></button>
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
            todosList: this.info.list,
            style: this.info.style,
            isUpdateMode: this.info.isUpdateMode,
            isOpenColors: false

        }
    },
    created() {
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
        addLine() {
            this.todosList[this.todosList.length] = { txt: 'wat todo?', isDone: false, idx: this.todosList.length }
        },
        saveChange(ev) {
            if (ev.target.dataset.name === 'subject') {
                this.info.subject = ev.target.innerText
            } else this.todosList[ev.target.dataset.name].txt = ev.target.innerText
        },
        updateNotes() {
            this.info.list = this.todosList
            this.info.isUpdateMode = false
            this.$emit('update', { ...this.info })
        },
        deleteNote() {
            this.$emit('delete', { ...this.info })
        },
        sendMile() {
            this.info.list = this.todosList
            this.info.isUpdateMode = false
            this.$emit('send', { ...this.info })
        }
    },
}