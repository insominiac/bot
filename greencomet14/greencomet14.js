const bot = "../assets/bot.svg"
const user = "../assets/user.svg"
const form = document.querySelector("form")
const chatContainer = document.querySelector("#chat_container")
var firebaseConfig = {apiKey: "AIzaSyArIyFKvHKgy5ZJWFeuDJyLpqd1GApsrrY",authDomain: "chatbot-ca9b4.firebaseapp.com",      
 databaseURL: "https://chatbot-ca9b4-default-rtdb.firebaseio.com",
 projectId: "chatbot-ca9b4",storageBucket: "chatbot-ca9b4.appspot.com",
 messagingSenderId: "329318236351",
 appId: "1:329318236351:web:4ab6ab3ce70a6899f8860a"};firebase.initializeApp(firebaseConfig);
 var messagesRef = firebase.database().ref("botform");
 var database = firebase.database();
 var prompt_val = "";
 database.ref("botform").once("value", function(snapshot)
 {if (snapshot.exists()) {snapshot.forEach(function(data) {var val = data.val();
 prompt_val = val.prompt});}});
 let loadInterval
function loader(element) {
    element.textContent = ''

    loadInterval = setInterval(() => {
        // Update the text content of the loading indicator
        element.textContent += '.';

        // If the loading indicator has reached three dots, reset it
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
}
 function typeText(element, text) {let index = 0 
 let interval = setInterval(() => {if (index < text.length) {element.innerHTML += text.charAt(index)
 index++ } else { clearInterval(interval) }}, 20)}
 function generateUniqueId() {const timestamp = Date.now();
 const randomNumber = Math.random();
 const hexadecimalString = randomNumber.toString(16);
 var result = `id-${timestamp}-${hexadecimalString}`
 console.log(timestamp)
 console.log(`${timestamp}-${hexadecimalString}`)
 console.log("result:",result)
 return  result;}
 function chatStripe(isAi, value, uniqueId) {return (`<div class="wrapper ${isAi && "ai"}"><div class="chat"> <div class="profile"><img src=${isAi ? bot : user} alt="${isAi ? "bot" : "user"}" /></div><div class="message" id=${uniqueId}>${value}</div> </div> </div>`)}
 function getInputVal(id) {return document.getElementById(id).value;}
 const handleSubmit = async (e) => {var message = getInputVal("promptmsgs");
 console.log(message)
 var newContactForm = messagesRef.push();
 newContactForm.update({prompt:message,});
 e.preventDefault()
 const data = new FormData(form)
 chatContainer.innerHTML += chatStripe(false,data.get("prompt"))
 form.reset()
 const uniqueId = generateUniqueId()
 chatContainer.innerHTML += chatStripe(true, " ", uniqueId)
 chatContainer.scrollTop = chatContainer.scrollHeight;
const messageDiv = document.getElementById(uniqueId)
loader(messageDiv)     
 const response = await fetch("https://chat-server-o6nz.onrender.com", {method: "POST",headers: {"Content-Type": "application/json",},
body: JSON.stringify({prompt:data.get("prompt")})})
console.log(prompt_val)
clearInterval(loadInterval)
messageDiv.innerHTML = " "
if (response.ok) {const data = await response.json();
const parsedData = data.bot.trim()
 typeText(messageDiv, parsedData)} else {const err = await response.text()
 messageDiv.innerHTML = "Something went wrong"
alert(err)}}
 form.addEventListener("submit", handleSubmit)
 form.addEventListener("keyup", (e) => {if (e.keyCode === 13) {handleSubmit(e)}})