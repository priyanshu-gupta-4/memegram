const express = require('express');
const app = express();
const PORT = process.env.PORT||5000;
const mongoose = require('mongoose');
const {MONGOURL} = require('./config/key');   //get hosting URL of atlas host from key.js that exports them
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))
app.use(express.json());    //let express accept data in req body by telling it type of data


mongoose.connect(MONGOURL); //connect to URL
mongoose.connection.on('connected',()=>{            //CALLED UPON SUCCESSFULL CONNECTION
    console.log('connected to atlas server');
})                                              


//import schemas using require as they are used at multiple places
require('./models/user');
mongoose.model('User');
require('./models/post');
mongoose.model('Post');
//import routes
app.use(require("./routes/auth"));  //import route from file and register them using app.use()
app.use(require('./routes/post'));
app.use(require('./routes/user'));

if (process.env.NODE_ENV === "production") {

    const root = require('path').join(__dirname, 'client', 'build')
    app.use(express.static(root));
    app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})
}

app.listen(PORT,()=>{
    console.log("server on hi ",PORT);
})