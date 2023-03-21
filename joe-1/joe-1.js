const bot = '../assets/bot.svg'
      const user = '../assets/user.svg'
      const form = document.querySelector('form')
      const chatContainer = document.querySelector('#chat_container')
      const msgs =[]
      const firebaseConfig = {
        apiKey: "AIzaSyCAzupEfPnjlZa8k4p9lXMqNhFwe_JSc3Y",
        authDomain: "openai-41fb8.firebaseapp.com",
        databaseURL: "https://openai-41fb8-default-rtdb.firebaseio.com",
        projectId: "openai-41fb8",
        storageBucket: "openai-41fb8.appspot.com",
        messagingSenderId: "807371754493",
        appId: "1:807371754493:web:99e627918257a663026794"
      };
      firebase.initializeApp(firebaseConfig);
      
       var database = firebase.database();
       var prompt_val = '';
       var ikey='-NNslc0QdjjEYGQlGaAG';
       database.ref().child('/botform/-NR2EfTtRyoueE5h3UbG/').once('value', function(snapshot) {

               var val = snapshot.val();
               prompt_val = val.prompt 
              //ikey = data.key
            
       });
      var msgs1 =''
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
      
      function typeText(element, text) {
          let index = 0
          let interval = setInterval(() => {
              if (index < text.length) {
                  element.innerHTML += text.charAt(index)
                  index++
              } else {
                  clearInterval(interval)
              }
          }, 20)
      }
      
      // generate unique ID for each message div of bot
      // necessary for typing text effect for that specific reply
      // without unique ID, typing text will work on every element
      function generateUniqueId() {
          const timestamp = Date.now();
          const randomNumber = Math.random();
          const hexadecimalString = randomNumber.toString(16);
          var result = `id-${timestamp}-${hexadecimalString}`;
          return  result;
         // console.log(timestamp)
          //console.log("resulttimestamp")
      }
      
      function chatStripe(isAi, value, uniqueId) {
          return (
             `
              <div class="wrapper ${isAi && 'ai'}">
                  <div class="chat">
                      <div class="profile">
                          <img 
                            src=${isAi ? bot : user} 
                            alt="${isAi ? 'bot' : 'user'}" 
                          />
                      </div>
                      <div class="message" id=${uniqueId}>${value}</div>
                  </div>
              </div>
          `
          )
      }
      function getInputVal(id) {
          return document.getElementById(id).value;
      }
      
          
      
      const handleSubmit = async (e) => {
          console.log(prompt_val)
      
         // const finalkey = ikey
      
         // var messagesRef = firebase.database()
        // .ref().child('/botform/' + finalkey);
         
         var message = getInputVal('promptmsgs');
         prompt_val = prompt_val.concat(getInputVal('promptmsgs'))

        
      
      
        // messagesRef.update({prompt:message});
        
         
          e.preventDefault()
      
          const data = new FormData(form)
         //msgs.push(prompt_val + getInputVal('promptmsgs'))
      
          // user's chatstripe
          chatContainer.innerHTML += chatStripe(false,data.get('prompt'))
      
      
          // to clear the textarea input 
          form.reset()
      
          // bot's chatstripe
          const uniqueId = generateUniqueId()
          chatContainer.innerHTML += chatStripe(true, " ", uniqueId)
      
          // to focus scroll to the bottom 
          chatContainer.scrollTop = chatContainer.scrollHeight;
      
          // specific message div 
          const messageDiv = document.getElementById(uniqueId)
      
      
          // messageDiv.innerHTML = "..."
          loader(messageDiv)
      
          const response = await fetch('https://chat-server-o6nz.onrender.com', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  prompt:prompt_val
              })
          })
          console.log(prompt_val)
          clearInterval(loadInterval)
          messageDiv.innerHTML = " "
      
          if (response.ok) {
              const data = await response.json();
              const parsedData = data.bot.trim() 
              typeText(messageDiv, parsedData)
             // confirm
             // console.log(msgs)
              msgs1 = parsedData

          } else {
              const err = await response.text()
      
              messageDiv.innerHTML = "Something went wrong"
              alert(err)
          }
          prompt_val = prompt_val.concat(msgs1)
          console.log(prompt_val)
      }
      
      form.addEventListener('submit', handleSubmit)
      form.addEventListener('keyup', (e) => {
          if (e.keyCode === 13) {
              handleSubmit(e)
          }
      })