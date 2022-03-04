export default {
    template: `
    <section class="search-options flex flex-column">
      <div class="search-bar">
        <input class="mail-search" v-model="filterBy.txt" title="Search Mail" type="text" placeholder="Search Mail">
        <button class="btn" @click.stop="setFilter">Search</button>
    </div>
      <div class="read-inputs flex">
        <label><input @change="setFilter" value="read" v-model="filterBy.readUnread" type="checkbox" title="Show Read">Show Read</label>
        <label><input @change="setFilter" value="unread" v-model="filterBy.readUnread" type="checkbox" title="Show Unread">Show Unread</label>
      </div>
      <div class="sort-inputs flex">  
        <label><input type="radio" value="createdDate" v-model="sortBy" @change="setSort">Sort By Date</label>
        <label><input type="radio" value="subject" v-model="sortBy" @change="setSort">Sort By Subject</label>
      </div>
      </section>
      `,
    data() {
      return {
        filterBy: {
          txt: '',
          readUnread: ['read', 'unread'],
          
        },
        sortBy: 'createdDate'
      }
    },
    methods: {
      setFilter() {
        this.$emit("filtered", { ...this.filterBy })
      },
      setSort(){
        this.$emit("sorted", this.sortBy)

      }
    },
  }