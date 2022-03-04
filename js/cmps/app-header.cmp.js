export default{
    template: `
        <header class="header-container">
            <nav class="app-header main-layout flex space-between">
                <router-link class="appsus-link clean-link" to="/">Appsus</router-link>
                <button v-if="!menuOpen" class="close-menu btn" @click="menuOpen=true">☰</button>
                <div :class="isMenuOpen" class="header-links flex clean-list">
                    <button class="hamburger-menu btn" @click="menuOpen=false">X</button>
                    <router-link @click="menuOpen=false" class="keepsus-link clean-link" to="/mail">Mailsus</router-link>
                    <router-link @click="menuOpen=false" class="keepsus-link clean-link" to="/keep">Keepsus</router-link>
                    <router-link @click="menuOpen=false" class="about-link clean-link" to="/about">About</router-link>
                </div>
            </nav>
        </header>
    `,
    data (){
        return{
            menuOpen: false
        }
    },
    computed: {
        isMenuOpen(){
            return {menuopen: this.menuOpen}
        }
    }
}