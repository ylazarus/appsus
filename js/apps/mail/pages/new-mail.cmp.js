import { mailService, loggedinUser } from "../services/mail.service.js"
import { eventBus } from "../../../services/eventBus-service.js"


export default{
    template: `
    <h1 class="mail-compose-title">Compose Mail</h1>
    <form class="mail-compose-card flex flex-column" @submit.prevent="send">
        <!-- <label>To: -->
            <input class="mail-compose-to" type="email" required v-model="message.to" placeholder="To: example@example.com">
        <!-- </label> -->
        <!-- <br> -->
        <!-- <label>Subject: -->
            <input class="mail-compose-subject" type="text" v-model="message.subject" placeholder="Subject">
        <!-- </label> -->
        <br>
        <textarea v-model="message.txt" class="mail-compose-txt"></textarea>
            <br>
            <button class="btn" >Send</button>
    </form>
    `,
    data() {
        return {
            message: null,
            
        }
    },
    created(){
        const id = this.$route.params.mailId
        if (id){
            mailService.get(id)
                .then(mail => {
                    // this.tempMessage = mail
                    this.message = mail
                    this.message.isRead = true
                    let wasFrom = this.message.from
                    let wasTo = this.message.to
                    this.message.to = wasFrom 
                    this.message.from = wasTo
                    this.message.subject = 'Re: ' + this.message.subject
                    this.message.txt = '\n \n \n' + this.message.txt
                })
        } else {
            this.message =  mailService.getDraft()
        }
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