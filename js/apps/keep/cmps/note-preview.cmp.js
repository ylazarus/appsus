import noteTxt from "./note-txt.cmp.js"
import noteTodos from "./note-todos.cmp.js"
import noteImg from "./note-todos.cmp.js"
import noteVideo from "./note-video.cmp.js"

export default{
    props: ['note'],
    template: `
    <section class="preview">
        <component :is="note.typeNote" :info="note.info"  :id="note.id" ></component>
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
            // note: this.note
        }
    },
    created() {
        console.log(this.note);
    }
}