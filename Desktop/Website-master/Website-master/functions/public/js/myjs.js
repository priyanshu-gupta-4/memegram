var arr = [];
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

    const student = document.getElementById('Student')
    const college = document.getElementById('College')
    const parentt = document.getElementById('Parent')
    const wp = document.getElementById('wp')
    const mentor = document.getElementById('mentor');

    const first = document.getElementById('first');
    const second = document.getElementById('second');
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const txtPassword1 = document.getElementById('txtPassword1');
    //login ka email aur pass
    const logtxtEmail = document.getElementById('logtxtEmail');
    const logtxtPassword = document.getElementById('logtxtPassword');
    //
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');

    const pnumber = document.getElementById("pnumber");

    

    btnLogin.addEventListener('click', e => {
        e.preventDefault
        const email = logtxtEmail.value;
        const pass = logtxtPassword.value;
        const auth = firebase.auth();
        //Sign In
        const promise = auth.signInWithEmailAndPassword(email, pass);
         promise.catch(e => alert("Email/Password is incorrect"));
    });


        // Add sign up event
    btnSignUp.addEventListener('click', e => {

        e.preventDefault();
        //TODO->Check 4 Real Email
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        var individual;



        if (student.checked == true) individual = student.value
        else if (college.checked == true) individual = college.value
        else if (parentt.checked == true) individual = parentt.value
        else if (wp.checked == true) individual = wp.value
        else if (mentor.checked == true) individual = mentor.value

        console.log(individual);

        if (txtPassword.value != txtPassword1.value) alert("Incorrect Confirm Password")
        else {

            //Sign In
             const promise = auth.createUserWithEmailAndPassword(email, pass).then((cred) => {

            var h = first.value + " " + second.value;

                console.log("phone number", pnumber.value);

                cred.user.updateProfile({
                    displayName: h,
                    photoURL: individual,
                    phoneNumber: pnumber.value
                })
            });


            promise
                .catch(e => alert(e.message));


        }


    });
    function login() {
        var signup = document.getElementById('id02');
        signup.style.display = "none"
        var modal = document.getElementById('id01');
        modal.style.display = "block"
            // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none ";
            }
        }


        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // console.log(user);
                // console.log(user.photoURL);
                // console.log(user.displayName);
                // console.log(user.email)
                //  btnLogout.classList.remove("invisible");

                // user.phoneNumber = pnumber.value
                // console.log(user);

                location.href = "/middleware";


            } else {
                    // alert("You need to Login/SignUp first");
                    //location.href = "/testimonial";

                    //  alert("Please Log In... You are currently logged out");
                    //  btnLogout.classList.add("invisible");

                }
            })


        btnmentor.addEventListener('click', () => {

            location.href = "/mentorlogin";

        })


        function resetpass() {

            firebase.auth().sendPasswordResetEmail(logtxtEmail.value)
            alert("Password reset has been send to your registered email");
        }

    }
    function signup() {


            // var modal1 = document.getElementById('id01');
            // modal1.style.display = "none";
            var modal = document.getElementById('id02');

            modal.style.display = "block"
            var modal1 = document.getElementById('id01');

            modal1.style.display = "none"

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                navigate.style.display="flex";
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }


        var db = firebase.firestore();
        db.collection("blogs").orderBy("date", "desc").get().then((snapshot) => {
            snapshot.forEach((doc) => {
                arr.push(doc.data());
            })

            var title1 = document.getElementById("title1")
            var title2 = document.getElementById("title2")
            var time1 = document.getElementById("time1");
            var time2 = document.getElementById("time2");

            title1.innerHTML = arr[0].title;
            time1.innerHTML = arr[0].creator

            title2.innerHTML = arr[1].title;
            time2.innerHTML = arr[1].creator
		})


		function openForm() {
			document.getElementById("myForm").style.display = "block";
		}
	
		function closeForm() {
			document.getElementById("myForm").style.display = "none";
		}