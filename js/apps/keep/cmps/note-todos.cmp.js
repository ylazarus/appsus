export default{
    props: ['info'],
    template: `
    <section class="note-todos">
        <h3>{{subject}}</h3>
        <ul>
            <li v-for="todo in todosList">
                {{todo.txt}}
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
            subject: this.info.subject,
            todosList: this.info.list,
            style: this.info.style,

        }
    },
    created() {
        console.log(this.info);
    },
}