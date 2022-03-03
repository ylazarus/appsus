import { notesService } from "../services/note.service.js"
import { eventBus } from "../../../services/eventBus-service.js"

import noteTxt from "./note-txt.cmp.js"
import noteTodos from "./note-todos.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteVideo from "./note-video.cmp.js"

export default {
    props: ['types'],
    template: `
    <section class="add-note">
        <label v-if="!isUpdate">Select a note type:
            <select v-model="selectedType" @change="renderNote" >
                <option v-for="(value, name) in NoteTypes" :value="name">{{value}}</option>
            </select>
            
        </label>
            <component :is="selectedType" :info="noteToEdit.info" @update="saveNote" @delete="deleteNote"></component>
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
                    console.log(note);
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
            }
            this.noteToEdit.info.isUpdateMode = true
            this.isUpdate = !this.isUpdate
        },
        saveNote(info) {
            this.noteToEdit.info = info
            if (this.noteToEdit.id) {
                console.log(this.noteToEdit);
                console.log('update');
                notesService.update({ ...this.noteToEdit })
                .then(()=> eventBus.emit('updateList'))

            } else {
                console.log('save');
                notesService.save({ ...this.noteToEdit })
                .then(()=> eventBus.emit('updateList'))
            }
        },
        deleteNote() {
            if (! this.noteToEdit.id) return
            console.log('delete');
            notesService.remove(this.noteToEdit.id)
                .then(()=> eventBus.emit('updateList'))
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