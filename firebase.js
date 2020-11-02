var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
const lawsData = require ('./attachDeputy.js')

var firebaseConfig = {
    apiKey: "AIzaSyCENBN1x9_SCVvfuJjzg0LzIVciYhxkYZg",
    authDomain: "votingright-bb550.firebaseapp.com",
    databaseURL: "https://votingright-bb550.firebaseio.com",
    projectId: "votingright-bb550",
    storageBucket: "votingright-bb550.appspot.com",
    messagingSenderId: "1094933088907",
    appId: "1:1094933088907:web:73443810ed923ecd1c228e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
    // Get a reference to the database service
    var database = firebase.database();
    lawsData.then((laws)=>{
        database.ref('laws/07012020').set({
            laws
          });
    }) 