var display = document.getElementById('intro');
var btn = document.getElementById('nxt');
var reply = document.getElementById('studentans');
var radio = document.getElementById('radio');
var studentans = document.getElementById('studentans');
var submitq = document.getElementById('submit')
var h3 = document.getElementById('h3');

var timetable = document.getElementById('timetable');
var priority = document.getElementById('priority');
var pay = document.getElementById('pay');
var notif = document.getElementById('notif');

var table = document.getElementById("table");
var parentt = document.getElementById("parentt")

var advice = document.getElementById("advice");

var res = [];
var ct = 0;
var show = (info, key) => {
    if (info.type === "string") {


        console.log("Key string=>", key);


        display.style.display = "block";
        studentans.style.display = "block";
        display.innerHTML = "      "+info.question


    } else if (info.type === "radio_buttons") {

        console.log("Key radio=>", key);
        display.style.display = "block";
        display.innerHTML = "      "+info.question;
        studentans.style.display = "none";
        //   console.log("From radio buttons info",info.choices.length);

        for (var i = 0; i < info.choices.length; i++) {


            radio.innerHTML += `<p><input type="radio" name="amit" value = "${info.choices[i]}"> 
            ${info.choices[i]}</input></p>`
        }

    } else if (info.type === "check_boxes") {
        console.log("Key check=>", key);
        display.style.display = "block";
        display.innerHTML = "      "+info.question;
        studentans.style.display = "none";
        //   console.log(info.choices.length);

        for (var i = 0; i < info.choices.length; i++) {

            radio.innerHTML += `<p><input type="checkbox" name="ak" value = "${info.choices[i]}"> 
            ${info.choices[i]}</input></p>`
        }



    } else if (info.type === "number") {
        console.log("Key number=>", key);




        if (key != 20) {
            display.style.display = "block";
            studentans.style.display = "block";
            display.innerHTML = "      "+info.question
        } else if (key == 20) {
            display.style.display = "block";
            studentans.style.display = "none";
            display.innerHTML = "      "+info.question
            radio.style.display = "none";
            table.innerHTML =
                `  <table id="special">

                <tr>
                    <th>Subject</th>
                    <th>Marks(Out of 100)</th>
                </tr>
                <tr>
                    <td><input type="text" class="subject"></td>
                    <td><input type="text" class="hours"></td>
                </tr>
                <tr>
                    <td><input type="text" class="subject"></td>
                    <td><input type="text" class="hours"></td>
                </tr>
                <tr>
                    <td><input type="text" class="subject" ></td>
                    <td><input type="text" class="hours"></td>
                </tr>
                <tr>
                    <td><input type="text" class="subject" ></td>
                    <td><input type="text" class="hours"></td>
                </tr>
                <tr>
                    <td><input type="text" class="subject" ></td>
                    <td><input type="text" class="hours"></td>
                </tr>
                <tr>
                    <td><input type="text" class="subject" ></td>
                    <td><input type="text" class="hours"></td>
                </tr>
            </table>
                
                `
        }
    } else if (info.type === "intro") {
        console.log("Key intro=>", key);
        display.style.display = "none";
        studentans.style.display = "none";
        h3.style.display = "block"
        h3.innerHTML = info.question;


    }
}





// var arr = question.questions;;
var arr = [];


var db = firebase.firestore();

db.collection("questions_section_1").orderBy("serial").get().then((snapshot) => {

    snapshot.forEach((doc) => {
        // console.log(doc.data());

        arr.push(doc.data());
    })
})



var j = 0;
var p = 0;
var k = 1;
var x;
var special = document.getElementById("special")
var subject = document.getElementsByClassName("subject")
var hours = document.getElementsByClassName("hours")

var ct;
btn.addEventListener('click', () => {
    h3.style.display = "none";

    ct = 0;

    var input = document.getElementsByTagName("input");

    if (j - 1 == 20) {
        ct = 1;

        var time = []
        for (var i = 0; i < subject.length; i++) {
            if (subject[i].value != "") {
                time.push({
                    Subject: subject[i].value,
                    Hours: hours[i].value
                })
            }
        }
        res.push({
            question: x,
            answer: time
        })

    }
    table.innerHTML = "";


    if (input.length > 0 && j - 1 != 20) {
        ct = 1
        var totalselect = [];
        for (var i = 0; i < input.length; i++) {
            if (input[i].checked) {
                console.log(input[i].value);

                totalselect.push(input[i].value);
            }
        }
        res.push({
            question: x,
            answer: totalselect
        })
    }

    if (p == 0) {
        ct = 1
        p = p + 1;
        btn.innerHTML = "Next";

    }

    if (j == arr.length) {

        radio.innerHTML = "";
        studentans.style.display = "none";
        display.style.display = "none";
        btn.style.display = "none";
        submitq.style.display = "block";
        // parentt.style.display = "block";
        advice.innerHTML = "Please Click on Submit to Save Your Answers "

    }

    if (j < arr.length && p > 0) {

        radio.innerHTML = "";
        show(arr[j], j);

        if (ct == 0 && j != 1) {

            res.push({
                question: x,
                answer: studentans.value
            })
        }


    }

    console.log(res);


    // if (j != 0) console.log(res);

    // var input = document.getElementsByTagName("input");


    studentans.value = "";
    x = display.value;

    // if (j == 3)
    //     j = j + 1;
    j = j + 1;

})



function submit() {
    // submitq.style.display = "none";
    // pay.style.display = "block";
    // notif.style.display = "block";

    firebase.auth().onAuthStateChanged(user => {
        var db = firebase.firestore();
        if (user) {

            db.collection("questions_reply").doc(user.uid).set({
                Response_general: res
            }).then(()=>{
                location.href="/aftersubmit"
            })

        }
    })
}





//Firebase database

// var datadis=document.getElementById("data");
// //firebase database



//Retreiving data

// db.collection("users").get().then((snapshot)=>{

//     snapshot.forEach((doc)=>{
//         datadis.innerHTML=doc.data().address
//     })
// })

//Adding data

// db.collection("cities").doc("LA").set({
//     name: "Los Angeles",
//     state: "CA",
//     country: "USA"
// })
// .then(function() {
//     console.log("Document successfully written!");
// })
// .catch(function(error) {
//     console.error("Error writing document: ", error);
// });glologconsolet        console.log(studentans.value);gnsc.collectiondisplaisplupvarol