import { notesService } from "../services/note.service.js"
import { eventBus } from "../../../services/eventBus-service.js"
import notePreview from "./note-preview.cmp.js"

export default {
    template: `
    <section class="note-list">
        <ul v-if="notesToShow" class="grid">
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
            notes: null,
            filterBy: null,
        }
    },
    created() {
        this.getNotes()
        this.unsubscribe1 = eventBus.on('updateList', this.getNotes)
        this.unsubscribe2 = eventBus.on('setFilter', this.setFilter)
    },
    methods: {
        getNotes() {
            console.log('query');
            notesService.query()
                .then(notes => { this.notes = notes })
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        notesToShow() {
            if (!this.filterBy) return this.notes
            const regex = new RegExp(this.filterBy.search, 'i')
            let filtered = this.notes.filter(note => regex.test(note.info.subject))
            if (this.filterBy.type) {
                filtered = filtered.filter(note => note.typeNote === this.filterBy.type)
            }
            return filtered
        }
    },
    unmounted() {
        console.log('unmounted');
        this.unsubscribe1();
        this.unsubscribe2();
    }
}