import { notesService } from "../services/note.service.js"


export default {
    // props: [],
    template: `
    <section class="add-note">
        <p>add</p>

    </section>
    `,
    data() {
        return {
            noteToEdit: notesService.getEmptyNote()
        }
    },
    created() {
        const id = this.$route.params.noteId
        if (id) {
            notesService.getNoteById(id)
                .then(note => this.note = note)
        }
    }
}