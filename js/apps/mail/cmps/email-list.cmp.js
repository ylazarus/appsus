import emailPreview from "./email-preview.cmp.js"

export default{
    props: ['emails'],
    template: `
        <table class="email-list">
            <tbody v-for="email in emails" :key="email.id" class="book-preview-container">
                <email-preview :email="email" @emailSelected="emailSelected"/>
            </tbody>
        </table>
    `,
    components: {
        emailPreview
    },
    methods: {
        emailSelected(email){
            console.log(email);
        }
    }
}