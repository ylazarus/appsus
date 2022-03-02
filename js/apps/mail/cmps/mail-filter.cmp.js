// export default {
//     template: `
//           <section class="book-filter">
//               <label>
//               Search By Name
//               <input type="text" v-model="filterBy.title" placeholder="Search...">
//               </label>
//               <label>
//               Search By Price
//               <input type="number" v-model.number="filterBy.lowRange" placeholder="Price Range From">
//               <input type="number" v-model.number="filterBy.highRange" placeholder="Price Range To">
//               </label>
//               <button @click.stop="setFilter">Search</button>
//           </section>
//       `,
//     data() {
//       return {
//         filterBy: {
//           title: "",
//           lowRange: 0,
//           highRange: Infinity
//         },
//       }
//     },
//     methods: {
//       setFilter() {
//         this.$emit("filtered", { ...this.filterBy })
//       },
//     },
//   }