import noteList from "../cmps/note-list.cmp.js"
import noteFilter from "../cmps/note-filter.cmp.js"

export default {
    template: `
    <section class="main-layout">

        <h1>Keep App</h1>
        <note-filter :types="noteTypes"></note-filter>
        <router-link to="/keep/edit">Add Note</router-link>
        <router-view :types="noteTypes"></router-view>
        <note-list />
    </section>
    `,
    components: {
        noteList,
        noteFilter,
    },
    data() {
        return {
            noteTypes: {
                noteTxt: 'text',
                noteTodos: 'list',
                noteImg: 'image',
                noteVideo: 'video',
            }
        }
    }
}
