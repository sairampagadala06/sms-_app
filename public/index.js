
var numberinput=document.getElementById("number");
var msginput=document.getElementById("msg");
var button=document.querySelector(".button");


var respons=document.getElementById("response");

function handleSMSStatus(data) {
    console.log("succesfull");
  respons.innerHTML = "<h5>SMS sent successfully to " + data.nmbr + "</h5>";
}
//catching io operation from server side
const socket = io();
socket.on('smsStatus', (data) => handleSMSStatus(data)); // Assuming response is defined elsewhere

button.addEventListener("click",sendmsg);
//event on click send
function sendmsg(){
    const number=numberinput.value.replace(/\D/g/'');
    const text=msginput.value;
    console.log(numberinput.value);
    //fetching server side post 
    fetch('/',{
        method:"post",
        headers:{
            'content-type' :'application/json'
        },
        body: JSON.stringify({number:number,text:text})
    })
    .then(function(res){
        console.log(res);
    })
    .catch(function(err){
        console.log(err);
    })

}
