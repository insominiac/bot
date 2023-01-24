var firebaseConfig = {
    apiKey: "AIzaSyArIyFKvHKgy5ZJWFeuDJyLpqd1GApsrrY",
 authDomain: "chatbot-ca9b4.firebaseapp.com",
 databaseURL: "https://chatbot-ca9b4-default-rtdb.firebaseio.com",
 projectId: "chatbot-ca9b4",
 storageBucket: "chatbot-ca9b4.appspot.com",
 messagingSenderId: "329318236351",
 appId: "1:329318236351:web:4ab6ab3ce70a6899f8860a"
};

firebase.initializeApp(firebaseConfig);

var messagesRef = firebase.database()
   .ref('botform');

 var database = firebase.database();

 database.ref('botform').on('value', function(snapshot) {
   if (snapshot.exists()) {
     var content = '';
     snapshot.forEach(function(data) {
       var val = data.val();
        console.log(val.name)
       content += `<div class="col"><a href=${val.name.toLowerCase()}.html><div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('unsplash-photo-1.jpg');">
       <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
       <h3 class="pt-5 mt-5 mb-4 display-10 lh-1 fw-light">${val.name}</h3></div></div></a></div>`
     });
     $('#bots').append(content);
   }
 });

