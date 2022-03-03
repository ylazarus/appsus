export default {
    template: `
    <section>
        <input class="mail-search" v-model="filterBy.txt" title="Search Mail" type="text" placeholder="Search Mail">
        <button @click.stop="setFilter">Search</button>
        <label>Show Read<input @change="setFilter" value="read" v-model="filterBy.readUnread" type="checkbox" title="Show Read"></label>
        <label>Show Unread<input @change="setFilter" value="unread" v-model="filterBy.readUnread" type="checkbox" title="Show Unread"></label>
    </section>
      `,
    data() {
      return {
        filterBy: {
          txt: '',
          readUnread: ['read', 'unread'],
          
        },
      }
    },
    methods: {
      setFilter() {
        this.$emit("filtered", { ...this.filterBy })
      },
    },
  }