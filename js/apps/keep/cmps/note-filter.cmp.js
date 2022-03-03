import { eventBus } from "../../../services/eventBus-service.js"

export default {
    props: ['types'],
    template: `
    <section class="note-filter">
            <input type="search" placeholder="Search note" v-model="filterBy.search">
        <label>
            <select v-model="filterBy.type">
            <option v-for="(value, name) in types" :value="name">{{value}}</option>
            </select>
        </label>
        <button class="btn" @click="setFilter">Filter</button>
        <button class="btn" @click="resetFilter">Reset filter</button>
    </section>
    `,
    data() {
        return {
            filterBy: {
                search: '',
                type: '',
            },
        }
    },
    methods: {
        setFilter(){
            console.log(this.filterBy);
            eventBus.emit('setFilter', this.filterBy)
        },
        resetFilter(){
            this.filterBy.search = ''
            this.filterBy.type = ''
            this.setFilter()
        }
    }
}