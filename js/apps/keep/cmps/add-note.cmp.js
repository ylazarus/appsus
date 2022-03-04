import { notesService } from "../services/note.service.js"
import { eventBus } from "../../../services/eventBus-service.js"

import noteTxt from "./note-txt.cmp.js"
import noteTodos from "./note-todos.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteVideo from "./note-video.cmp.js"
import noteVideoCmp from "./note-video.cmp.js"

export default {
    props: ['types'],
    template: `
    <section class="add-note flex flex-column">
        <label v-if="!isUpdate">Select a note type:
            <select v-model="selectedType" @change="renderNote" >
                <option v-for="(value, name) in NoteTypes" :value="name">{{value}}</option>
            </select>
        </label>
            <component :is="selectedType" class="note-to-add" :info="noteToEdit.info" @update="saveNote" @delete="deleteNote"></component>
            <router-link to="/keep" class="btn">Close</router-link>
    </section>
    `,
    components: {
        noteTxt,
        noteTodos,
        noteImg,
        noteVideo,
    },
    data() {
        return {
            noteToEdit: notesService.getEmptyNote(),
            NoteTypes: this.types,
            isUpdate: null,
            selectedType: null,
            noteId: this.$route.params.noteId
        }
    },
    created() {
        if (this.noteId) {
            notesService.get(this.noteId)
                .then(note => {
                    this.noteToEdit = note
                    this.selectedType = note.typeNote
                    this.renderNote()
                })
        }
    },
    methods: {
        renderNote() {
            if (!this.noteToEdit.id) {
                this.noteToEdit.typeNote = this.selectedType
                this.noteToEdit.info[this.NoteTypes[this.selectedType]] = this.NoteTypes[this.selectedType] + ''
                if (this.selectedType === 'noteTodos') {
                    this.noteToEdit.info.list = [{ txt: 'wat todo?', isDone: false, idx: 0 }]
                }
            }
            this.noteToEdit.info.isUpdateMode = true
            this.isUpdate = !this.isUpdate
        },
        saveNote(info) {
            this.noteToEdit.info = info
            this.noteToEdit.id
            if (this.noteToEdit.id) {
                console.log('update');
                notesService.update({ ...this.noteToEdit })
                    .then((note) => {
                        eventBus.emit('updateList')
                        
                        // this.$forceUpdate()
                        
                    })
                    .then(()=>this.$router.push('/keep'))

            } else {
                console.log('save');
                notesService.save({ ...this.noteToEdit })
                    .then((note) => {
                        eventBus.emit('updateList')
                        this.$router.push('/keep')
                    })

            }
        },
        deleteNote() {
            if (!this.noteToEdit.id){
                this.$router.push('/keep')

                return
            }
            console.log('delete');
            notesService.remove(this.noteToEdit.id)
                .then((note) => {
                    eventBus.emit('updateList')
                    this.$router.push('/keep')
                })

        }
    },
    watch: {
        isUpdate() {
            console.log(this.isUpdate);
            console.log(this.selectedType);
            console.log(this.noteToEdit);
        },
        // noteToEdit : {
        //     handler() {

        //     },
        //     deep: true
        // }
    }
}