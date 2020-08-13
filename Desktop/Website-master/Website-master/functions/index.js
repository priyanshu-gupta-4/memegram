const functions = require('firebase-functions');

var express = require("express")
var app = express();
var bodyparser = require('body-parser')

require('./public/js/payment')(app)

app.engine("html", require("ejs").renderFile);
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public/'));



app.get("/", (req, res) => {
    res.render("index.html");
})
app.get("/team", (req, res) => {

    res.render("team.html");
})
app.get("/midpage", (req, res) => {

    res.render("midpage.html");
})
app.get("/afterpayment", (req, res) => {

    res.render("afterpayment.html");
})

app.get("/video", (req, res) => {
    res.render("video.html")
})

app.get("/notif", (req, res) => {
    res.render("notif.html")
})

app.get("/blog", (req, res) => {
    res.render("blogrough.html");
})

app.get("/program", (req, res) => {
    res.render("program.html");
})

app.get("/testimonial", (req, res) => {
    res.render("testimonial.html");
})

//After Login pages

app.get("/middleware", (req, res) => {
    res.render("middleware.html");
})

app.get("/schoolpage", (req, res) => {
    res.render("schoolpage.html");
})

app.get("/collegepage", (req, res) => {
    res.render("collegepage.html");
})

app.get("/parentpage", (req, res) => {
    res.render("parentpage.html");
})

app.get("/workingprofpage", (req, res) => {
    res.render("workingprof.html");
})


app.get("/aftertimetable", (req, res) => {
    res.render("aftertimetable.html");
})

app.get("/logreg", (req, res) => {
    res.render("logreg.html")
})
app.get("/appointment", (req, res) => {
    res.render("appointment.html")
})


//POST Route

app.post("/middleware", (req, res) => {
    res.render("middleware.html");
})

app.get("/school", (req, res) => {
    res.render("test.html");
})
app.get("/afterlogin", (req, res) => {
    res.render("afterlogin.html");
})

app.get("/college", (req, res) => {
    res.render("collegeq.html");
})

app.get("/parent", (req, res) => {
    res.render("parent.html");
})

app.get("/mentorpage", (req, res) => {
    res.render("mentorpage.html");
})
app.get("/mentorlogin", (req, res) => {
    res.render("mentor.html");
})


app.get("/profile", (req, res) => {
    res.render("profile.html");
})

app.get("/joinus", (req, res) => {
    res.render("joinus.html")
})

var mentoremail;
app.get("/mentor_dashboard/:id", (req, res) => {
    mentoremail = req.params.id;
    res.render("mentor_dashboard.ejs", { name: mentoremail });
})



app.get("/parent", (req, res) => {
    res.render("parent.html");
})

app.get("/timetable", (req, res) => {
    res.render("timetable.html");
})



app.get("/priority", (req, res) => {
    res.render("priority.html");
})

app.get("/schedule", (req, res) => {
    res.render("schedule.html");
})
app.get("/streams", (req, res) => {
    res.render("streams.html");
})

app.get("/blog/:id", (req, res) => {
    var x = req.params.id;
    res.render("blog_description.ejs", { x: x })
})
app.get("/sports", (req, res) => {
    res.render("sportsq.html");
})


var key;
//Specific User Page
app.get("/user/:id", (req, res) => {
    key = req.params.id;
    res.render("users.ejs", { key: key });
})

app.get("/collegetrack", (req, res) => {
    res.render("collegetracks.html")
})


app.get("/first", (req, res) => {
    res.render("first.html");
})

app.post("/successfull", (req, res) => {

    var msg = (req.body.RESPMSG);

    var code = req.body.RESPCODE;
    res.render("successfull.ejs", { msg: msg, code: code });
})

app.get("/aftersubmit", (req, res) => {
    res.render("aftersubmit.html");
})

app.get("/failure", (req, res) => {
    res.render("failure.html");
})

app.get("/successfull", (req, res) => {
    res.render("successfull.html");
})
app.get("/mentorfeedback", (req, res) => {
    res.render("mentorfeedback.ejs", { key: key, mentoremail: mentoremail })
})

app.get("/studentfeedback", (req, res) => {
    res.render("studentfeedback.html");
})

app.get("/affirmations", (req, res) => {
    res.render("affirmations.html")
})

app.get("/activity", (req, res) => {
    res.render("activity.html")
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);