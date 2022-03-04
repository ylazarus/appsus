export default{
    props: ['info', 'colorsList'],
    template: `
    <section class="note-video" :style="backGroundColor">
    <h3 class="subject" data-name="subject" :contenteditable="isEditable" @keyup="saveChange">{{subject}}</h3>
        <iframe width="150" height="100" 
            :src="src">
        </iframe>
        
        <div v-if="isUpdateMode"  class="update-note">
            <label>
                Enter video url: 
                <input type="text" placeholder="enter video url" v-model="src">
            </label>
            <button class="btn" @click="deleteNote">Delete</button>
            <button class="btn" @click="updateNotes">Save</button>
            <button class="btn" @click="isOpenColors = !isOpenColors">Color</button>
            <div v-if="isOpenColors" class="colors">
                <button v-for="(value, name) in colorsList" :class="'color-btn-'+name" :data-name="value" @click="changeColor"></button>
            </div>
        </div>
    </section>
    `,
    data() {
        return {
            subject: this.info.subject,
            src: this.info.video,
            style: this.info.style,
            isUpdateMode: this.info.isUpdateMode,
            isOpenColors: false

        }
    },
    computed: {
        isEditable() {
            return this.info.isUpdateMode
        },
        backGroundColor(){
            return `background-color: ${this.style.backGroundColor}`
        }
    },
    methods: {
        changeColor(ev) {
            this.info.style.backGroundColor = ev.target.dataset.name
            this.isOpenColors = false
        },
        saveChange(ev) {
            this.info[ev.target.dataset.name] = ev.target.innerText
        },
        updateNotes() {
            this.info.isUpdateMode = false
            this.$emit('update', { ...this.info })
        },
        deleteNote() {
            this.$emit('delete', { ...this.info })
        }
    },
    watch: {
        src() {
            this.info.video = this.src
        }
    }
}