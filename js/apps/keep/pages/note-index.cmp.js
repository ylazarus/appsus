import noteList from "../cmps/note-list.cmp.js"
import noteFilter from "../cmps/note-filter.cmp.js"

export default {
    template: `
    <section class="main-layout note-index main-app">
        <header class="note-header flex flex-column">
            <h1 class="note-logo">Keepsus</h1>
            <note-filter :types="noteTypes"></note-filter>
        </header>
        <router-link class="btn add-btn" :to="routeLink" @click="switchLink">{{routeTxt}}</router-link>
        <router-view :types="noteTypes" @saved="switchLink"></router-view>
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
            },
            isEdit: false
        }
    },
    methods: {
        switchLink() {
            this.isEdit = !this.isEdit
        }
    },
    computed: {
        routeLink(){
            return this.isEdit ? '/keep' : '/keep/edit'
        },
        routeTxt() {
            return this.isEdit ? 'Close' : 'Add note'
        },
    }
}
