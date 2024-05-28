
 import { Vonage } from "@vonage/server-sdk";
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app=express();
const port=4000;
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});

//post
app.post('/',(req,res) =>{
    res.send(req.body)
    console.log(req.body);
    const number=req.body.number;
    const text=req.body.text;
//api constructer
    const vonage=new Vonage({
        apiKey:"fdeecb64",
    apiSecret:"wbLf0rvv0pwdulAL"
    });
    const to=number;
    const from="916305457320";
    async function sendSMS() {
      await vonage.sms.send({to, from, text})
            .then(resp => { console.dir(resp);
                const data={
                    id : resp.messages[0]['message-id'],
                    nmbr : resp.messages[0]['to']
                }
                io.emit('smsStatus',data);

             })
            .catch(err => { console.log('There was an error sending the messages.'); console.error(err);});
    }
    
    sendSMS();
});
import {Server as Socket} from "socket.io";
//listen to server
const server=app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
});
export default server;
//intiallising io 
const io=new Socket(server);
io.on("connection",(socket)=>{
    console.log("connected");
    io.on("disconnection",()=>{
    console.log("disconnected");
    })
})

