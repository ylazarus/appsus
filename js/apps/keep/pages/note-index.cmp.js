import noteList from "../cmps/note-list.cmp.js"

export default {
    template: `
    <h1>Keep App</h1>
    <router-link to="/keep/edit">Add Note</router-link>
    <router-view :types="noteTypes"></router-view>
    <note-list />
    `,
    components: {
        noteList,
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
