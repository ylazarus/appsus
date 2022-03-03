export default{
    template: `
        <header class="header-container">
            <nav class="app-header main-layout flex space-between">
                <router-link class="appsus-link clean-link" to="/">Appsus</router-link>
                <div class="header-links flex clean-list">
                    <router-link class="keepsus-link clean-link" to="/mail">Mailsus</router-link>
                    <router-link class="keepsus-link clean-link" to="/keep">Keepsus</router-link>
                    <router-link class="about-link clean-link" to="/about">About</router-link>
                </div>
            </nav>
        </header>
    `,
}