import { eventBus } from "../../../services/eventBus-service.js"

export default {
    props: ['types'],
    template: `
    <section class="note-filter">
        <label> Search: 
            <input type="search" placeholder="Search..." v-model="filterBy.search">
        </label>
        <label>
            <select v-model="filterBy.type">
            <option v-for="(value, name) in types" :value="name">{{value}}</option>
            </select>
        </label>
        <button @click="setFilter">Filter</button>
        <button @click="resetFilter">Reset filter</button>
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