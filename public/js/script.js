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


function getLaw() {

    firebase.database().ref('laws/')
        .once('value').then((laws) => {
            let lawsObj = laws.val()
            Object.keys(lawsObj).map(function(objectKey, index) {
                var div = document.getElementById("laws-container")
                console.log(div)
                var objectLaw = lawsObj[objectKey];
                let yesParl = objectLaw.law.participants[0].approuved ? objectLaw.law.participants[0].approuved.length : 0

                let noParl = objectLaw.law.participants[0].refused ? objectLaw.law.participants[0].refused.length : 0
                let humParl = objectLaw.law.participants[0].abstained ? objectLaw.law.participants[0].abstained.length : 0
                let nowhereParl = 75 - yesParl - noParl - humParl
                console.log(noParl, yesParl, humParl, nowhereParl)
                div.innerHTML += `<div class="law-container ${objectLaw.law.sanction} ">
                <div class="sanction-container"><i class="fas fa-times" aria-hidden="true"></i></div>
                <div class="row law-title">
                    <h3>${objectLaw.law.title}</h3>
                    <h5 class="law-date">Examinée lors de la <span id="debate-type">séance plénière</span> du <span id="debate-date">${objectLaw.law.date}</span></h5>
                    <div class="row more-details">
                        <p>En savoir plus <i class="fas fa-caret-square-right" aria-hidden="true"></i></p>
                    </div>
                </div>
    
    
                <div class="row sanction-row">
                    <div class="column sanction-item" > 
                        <i class="far fa-grin-hearts" aria-hidden="true" style="font-size:${yesParl+34}px"></i>
                        <span id="pro-number">${yesParl}</span></div>
                    <div class="column sanction-item"><i class="far fa-tired" aria-hidden="true" style="font-size:${noParl+34}px"></i>
    
                        <span id="cons-number">${noParl}</span></div>
                    <div class="column sanction-item"><i class="far fa-meh-blank" aria-hidden="true"style="font-size:${humParl+34}px"></i>
    
                        <span id="abst-number">${humParl}</span></div>
                    <div class="column sanction-item"><i class="fas fa-user-injured" aria-hidden="true"style="font-size:${nowhereParl+34}px"></i>
    
                        <span id="absent-number">${nowhereParl}</span></div>
                </div>
    
            </div>`
                    //console.log(objectLaw.law.title);
            });
        })


}
getLaw()