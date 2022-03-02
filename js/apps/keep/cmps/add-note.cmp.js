import { notesService } from "../services/note.service.js"

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
            <component :is="selectedType" :info="noteToEdit.info"  :id="noteToEdit.id" ></component>
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
            selectedType: null
        }
    },
    created() {
        const id = this.$route.params.noteId
        if (id) {
            notesService.getNoteById(id)
                .then(note => {
                    console.log(note);
                    this.noteToEdit = note
                    this.selectedType = note.typeNote
                this.renderNote()})
        }
    },
    methods: {
        renderNote() {
            this.noteToEdit.typeNote = this.selectedType
            this.noteToEdit.info[this.NoteTypes[this.selectedType]] = this.NoteTypes[this.selectedType] +''
            this.noteToEdit.info.isUpdateMode = true
            this.isUpdate = !this.isUpdate
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