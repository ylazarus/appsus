import { notesService } from "../services/note.service.js"
import { mailService } from "../../mail/services/mail.service.js"
import { eventBus } from "../../../services/eventBus-service.js"

import noteTxt from "./note-txt.cmp.js"
import noteTodos from "./note-todos.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteVideo from "./note-video.cmp.js"

export default {
    props: ['types'],
    template: `
    <section class="add-note flex flex-column">
        <label v-if="!isUpdate">Select a note type:
            <select v-model="selectedType" @change="renderNote" >
                <option v-for="(value, name) in NoteTypes" :value="name">{{value}}</option>
            </select>
        </label>
            <component :is="selectedType" class="note-to-add" 
            :info="noteToEdit.info" :colorsList="colorsList" 
            @send="sendMile" @update="saveNote" @delete="deleteNote">
            </component>
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
            noteId: this.$route.params.noteId,
            colorsList: {
                yellow: '#ebeb81',
                pink: '#d87093',
                green: '#adff2f',
                white: '#ffffff',
            }
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
                .catch(() => {
                    mailService.get(this.noteId).then((mail) => {
                        this.noteToEdit = notesService.getEmptyNote(),
                            this.noteToEdit.id = mail.id
                        this.noteToEdit.typeNote = 'noteTxt'
                        this.selectedType = this.noteToEdit.typeNote
                        this.noteToEdit.info.subject = mail?.subject || 'no subject'
                        this.noteToEdit.info.text = mail?.txt || 'no body'
                        this.renderNote()
                    })
                })
        }
    },
    methods: {
        renderNote() {
            if (!this.noteToEdit.id) {
                this.noteToEdit.typeNote = this.selectedType
                this.noteToEdit.info[this.NoteTypes[this.selectedType]] = this.NoteTypes[this.selectedType] + ''
                if (this.selectedType === 'noteTodos') {
                    this.noteToEdit.info.list = [{ txt: 'What Needs To Be Done?', isDone: false, idx: 0 }]
                }
            }
            this.noteToEdit.info.isUpdateMode = true
            this.isUpdate = !this.isUpdate
        },
        saveNote(info, send) {
            this.noteToEdit.info = info
            if (this.noteToEdit.id) {
                console.log('update');
                notesService.update({ ...this.noteToEdit })
                    .then((note) => {
                        eventBus.emit('updateList')
                        eventBus.emit("show-msg", { txt: "Update successfully" })
                        return note
                        // this.$forceUpdate()

                    })
                .then((note) => {
                    if (!send){
                        this.$router.push('/keep')
                    } else this.$router.push('/compose/'+note.id)
                 })

            } else {
                notesService.save({ ...this.noteToEdit })
                    .then((note) => {
                        eventBus.emit('updateList')
                        eventBus.emit("show-msg", { txt: "Save successfully" })
                        this.$emit('saved')
                        this.$router.push('/keep')
                    })

            }
        },
        sendMile(info) {
            this.noteToEdit.info = info
            this.saveNote(info, 'send')
        },
        deleteNote() {
            if (!this.noteToEdit.id) {
                eventBus.emit("show-msg", { txt: "Delete successfully" })
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