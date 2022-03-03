export default {
    props: ['info'],
    template: `
    <section class="note-todos" :style="backGroundColor">
    <h3 class="subject" :contenteditable="isEditable" @keyup="saveChange">{{subject}}</h3>
        <ul>
            <li v-for="(todo, index) in todosList" >
                <p :class="'' +todo.idx" :contenteditable="isEditable" @keyup="saveChange">{{todo.txt}}</p>
                <input type="checkbox" v-model="todo.isDone">
            </li>
        </ul>
        
        <div v-if="isUpdateMode"  class="update-note">
            <button class="btn" @click="addLine">Add line</button>
            <button class="btn" @click="deleteNote">Delete</button>
            <button class="btn" @click="updateNotes">Save</button>
        </div>
    </section>
    `,
    data() {
        return {
            subject: this.info.subject,
            todosList: this.info.list,
            style: this.info.style,
            isUpdateMode: this.info.isUpdateMode,
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
        addLine() {
            this.todosList[this.todosList.length] = { txt: 'wat todo?', isDone: false, idx: this.todosList.length }
        },
        saveChange(ev) {
            if (ev.target.className === 'subject') {
                this.info.subject = ev.target.innerText

            }
            this.todosList[ev.target.className].txt = ev.target.innerText
        },
        updateNotes() {
            this.info.list = this.todosList
            this.info.isUpdateMode = false
            this.$emit('update', { ...this.info })
        },
        deleteNote() {
            this.$emit('delete', { ...this.info })
        }
    },
}