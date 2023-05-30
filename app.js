const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const { MONGOURL } = require('./config/key');   //get hosting URL of atlas host from key.js that exports them
const cors = require("cors");

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*"
    }
});
let users = [];
const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({ userId, socketId })
}
const remUser = (socketId) => {
    users = users.filter(user => { user.socketId !== socketId })
}
const getUser = (userId) => {
    return users.filter(user => user.userId === userId)
}
io.on("connection", (socket) => {
    
    socket.on("addUser", (userId) => {
        console.log("adding user")
        addUser(userId, socket.id);
        console.log(getUser(userId));
        io.emit("getUsers", users);
    })

    socket.on("sendMessage", ({ senderId, recieverId, text }) => {
        
        const user = getUser(recieverId);
        console.log(user);
        if(user[0]){
           io.to(user[0].socketId).emit("getMessage", {
                senderId, text
            })
        }
    })

    socket.on("disconnect", () => {
        console.log("user dissconnected")
        remUser(socket.id);
        io.emit("getUsers", users);
    })
})


const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json());    //let express accept data in req body by telling it type of data


mongoose.connect(MONGOURL); //connect to URL
mongoose.connection.on('connected', () => {            //CALLED UPON SUCCESSFULL CONNECTION
    console.log('connected to atlas server');
})


//import schemas using require as they are used at multiple places
require('./models/user');
mongoose.model('User');
require('./models/post');
mongoose.model('Post');
require('./models/conversation')
mongoose.model('Conversation')
require('./models/message')
mongoose.model('Message')

//import routes
app.use(require("./routes/auth"));  //import route from file and register them using app.use()
app.use(require('./routes/post'));
app.use(require('./routes/user'));
app.use(require('./routes/conversations'))
app.use(require('./routes/messages'))
if (process.env.NODE_ENV === "production") {

    const root = require('path').join(__dirname, 'client', 'build')
    app.use(express.static(root));
    app.get("*", (req, res) => {
        res.sendFile('index.html', { root });
    })
}

server.listen(PORT, () => {
    console.log("server on hi ", PORT);
})