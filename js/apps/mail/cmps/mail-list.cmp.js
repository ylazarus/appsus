import mailPreview from "./mail-preview.cmp.js"

export default{
    props: ['mails'],
    template: `
        <table class="mail-list">
            <tbody v-for="mail in mails" :key="mail.id" class="mail-preview-container">
                <mail-preview :mail="mail" @mailSelected="mailSelected"/>
            </tbody>
        </table>
    `,
    components: {
        mailPreview
    },
    methods: {
        emailSelected(mail){
            this.$emit("mailSelected", mail)
        }
    }
}