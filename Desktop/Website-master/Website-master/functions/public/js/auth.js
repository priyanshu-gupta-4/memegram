(function() {

    //Intialize firebase
    const config = {
        apiKey: "AIzaSyBF6ucSKByFpQ9vQNwfb1i4JOVGyfaHPfw",
        authDomain: "mentormitr-bbff5.firebaseapp.com",
        databaseURL: "https://mentormitr-bbff5.firebaseio.com",
        projectId: "mentormitr-bbff5",
        storageBucket: "mentormitr-bbff5.appspot.com",
        messagingSenderId: "177887019473",
        appId: "1:177887019473:web:4f7049f36129cc4b0860f0",
        measurementId: "G-B7VNS84ZJ9"
    };


    firebase.initializeApp(config);



    const btnLogout = document.getElementById('btnLogout');
    btnLogout.addEventListener('click', e => {

        e.preventDefault();
        firebase.auth().signOut().then(() => {
            location.href = '/';
        });

    })

    const name = document.getElementById("h1");





    firebase.auth().onAuthStateChanged(user => {
        var db = firebase.firestore();
        if (user) {
       
            var x=user.displayName.split(" ");
            name.innerHTML = "Hi " + x[0] + "!!!";
            console.log(user);

        }
    })

}())