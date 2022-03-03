

export default {
    template: `
    <section class="note-filter">
        <label> Search: 
            <input type="search" placeholder="Search..." v-model="filterBy.search">
        </label>
        <label>
            <select v-model="filterBy.type" @change="">
            <option v-for="(value, name) in NoteTypes" :value="value">{{name}}</option>
            </select>
        </label>
    </section>
    `,
    components: {
        noteList,
    },
    data() {
        return {
            filterBy: {
                search: '',
                type: '',
            },
            noteTypes: {
                noteTxt: 'text',
                noteTodos: 'list',
                noteImg: 'image',
                noteVideo: 'video',
            }
        }
    },
    methods: {
        
    }
}