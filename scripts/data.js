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

var messagesRef = firebase.database()
   .ref('botform');

 var database = firebase.database();

 database.ref('botform').once('value', function(snapshot) {
   if (snapshot.exists()) {
     var content = '';
     snapshot.forEach(function(data) {
       var val = data.val();
        console.log(val.name)
        console.log(val.prompt)
       content += `<div class="col"><a href="${val.name.toLowerCase()}/${val.name.toLowerCase()}.html" target="_blank" style="color:transparent"><div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url(${val.imageurl});">
       <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1" style="background:#000;opacity:0.5">
       <h3 class="pt-5 mt-5 mb-4 display-10 lh-1 fw-light">${val.name}</h3><p>${val.description}</p></div></div></a></div>`
     });
     $('#bots').append(content);
   }
 });

