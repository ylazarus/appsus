import { mailService } from "../services/mail.service.js"
import { eventBus } from "../../../services/eventBus-service.js"


export default{
    template: `
    <h1>Compose Mail</h1>
    <form @submit.prevent="send">
        <label>To:
            <input type="email" required v-model="message.to" placeholder="example@example.com">
        </label>
        <br>
        <label>Subject:
            <input type="text" v-model="message.subject" placeholder="example@example.com">
        </label>
        <!-- <label>
            <input v-model="message.txt" type="text">
        </label>     -->
        <br>
        <textarea v-model="message.txt" cols="30" rows="10"></textarea>
            <br>
            <button>Submit</button>
    </form>
    
    `,
    data() {
        return {
            message: null
        }
    },
    created(){
        this.message =  mailService.getDraft()
    },
    methods:{
        send(){
            mailService.send(this.message)
            .then((mail) =>{
                eventBus.emit("show-msg", { txt: "Your Message Has Been Sent" })
                this.$router.push("/mail")
            })
        }

    }
}