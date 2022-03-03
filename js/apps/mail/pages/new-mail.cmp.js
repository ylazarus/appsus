import { mailService, loggedinUser } from "../services/mail.service.js"
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
            <input type="text" v-model="message.subject" placeholder="Subject">
        </label>
        <br>
        <textarea v-model="message.txt" cols="30" rows="10"></textarea>
            <br>
            <button>Submit</button>
    </form>
    <pre>{{message}}</pre>
    <pre>{{tempMessage}}</pre>
    
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