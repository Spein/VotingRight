var admin = require('firebase-admin');

var serviceAccount = require("./firebase/votingright-bb550-firebase-adminsdk-rjzc1-e1956e532d.json");

const lawsData = require('./attachDeputy.js')

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
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://votingright-bb550.firebaseio.com"
});
// Get a reference to the database service
var db = admin.database();
lawsData.then((laws) => {
    laws.forEach(law => {
        console.log(law.title.replace(/[\,,\.,\',\(,\),\°,\/]/g, ""))
        var ref = db.ref('laws/' + law.title.replace(/[\,,\.,\',\(,\),\°,\/]/g, ""))

        ref.set({
            law
        });
    })

}).then(console.log("done"))