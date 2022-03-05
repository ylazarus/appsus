export default {
    template: `
    <main class="app-home main-layout flex">
        <h1>Welcome To Appsus!</h1>
        <h2>Select An App:</h2>
        <div class="homepage-container  flex">

            <router-link to="/mail"><img title="To Mailsus" src="img/mail.png" alt=""></router-link>
            
            <router-link to="/keep"><img title="To Keepsus" src="img/note.png" alt=""></router-link>
        </div>

    </main>
    `
}