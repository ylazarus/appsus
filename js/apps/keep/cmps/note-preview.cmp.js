import noteTxt from "./note-txt.cmp.js"
import noteTodos from "./note-todos.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteVideo from "./note-video.cmp.js"

export default{
    props: ['note'],
    template: `
        <component :is="note.typeNote" :info="note.info"  :id="note.id" @click="updateNote(note.id)"></component>
    `,
    components: {
        noteTxt,
        noteTodos,
        noteImg,
        noteVideo,
    },
    data() {
        return {
            // note: this.note
        }
    },
    created() {
    },
    methods: {
        updateNote(id){
            this.$router.push(`/keep/edit/${id}`)
        } 
    }
}