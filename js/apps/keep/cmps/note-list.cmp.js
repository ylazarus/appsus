import { notesService } from "../services/note.service.js"
import { eventBus } from "../../../services/eventBus-service.js"
import notePreview from "./note-preview.cmp.js"

export default {
    template: `
    <section class="note-list">
        <ul v-if="notesToShow">
            <li v-for="note in notesToShow">
                <note-preview :note="note" :key="note.id"/>
            </li>
        </ul>
    </section>
    
    `,
    components: {
        notePreview,
    },
    data() {
        return {
            notes: null
        }
    },
    created() {
        this.getNotes()
        this.unsubscribe = eventBus.on('updateList', this.getNotes)
    },
    methods: {
        getNotes() {
            console.log('query');
            notesService.query()
                .then(notes => {this.notes = notes})
        },
    },
    computed: {
        notesToShow() {
            return this.notes
        }
    },
    unmounted() {
        console.log('unmounted');
        this.unsubscribe();
    }
}