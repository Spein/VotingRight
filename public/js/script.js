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


function getPleniary() {
    let date = document.getElementById('date').value;

    firebase.database().ref('laws/' + date)
        .once('value').then((data) => {
            console.log(data.val())
            return data.val()
        })


}