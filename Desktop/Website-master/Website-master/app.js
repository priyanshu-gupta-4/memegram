var express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    path = require('path');


app.engine("html", require("ejs").renderFile);
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public/'));

app.get("/", (req, res) => {
    res.render("index.html");
})
app.get("/team", (req, res) => {

    res.render("team.html");
})

app.get("/weeklyprogress", (req, res) => {
    res.render("weeklypro.html");
})

app.get("/program", (req, res) => {
    res.render("program.html");
})

app.get("/testimonial", (req, res) => {
    res.render("testimonial.html");
})
app.get("/appointment", (req, res) => {
    res.render("testimonial.html");
})

app.listen(3000, (err) => {
    if (err)
        console.log("Error Occurred");
    else
        console.log("Server Running on port 3000");

})