import { notesService } from "../services/note.service.js"
import notePreview from "./note-preview.cmp.js"

export default{
    template: `
    <section class="note-list">
        <ul v-if="notes">
            <li v-for="note in notes">
                <note-preview :note="note"/>
            </li>
        </ul>
    </section>
    
    `,
    components: {
        notePreview,
    },
    data () {
        return {
            notes: null
        }
    },
    created() {
        notesService.query()
        .then(notes => this.notes=notes)
        console.log(this.notes);

    },
}