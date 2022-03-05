import mailPreview from "./mail-preview.cmp.js"

export default {
    props: ['mails'],
    template: `
        <section class="mail-list">
            <ul class="mail-preview-container">
                <mail-preview v-for="mail in mails" :key="mail.id" :mail="mail" />
            </ul>
        </section>
    `,
    components: {
        mailPreview
    },
    methods: {

    }
}