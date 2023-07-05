require("dotenv").config();
const express = require("express");
// const mongoose = require("mongoose");
// require("./database/database").connect();
const bodyParser = require("body-parser");
// const fileUpload = require("express-fileupload");
const cors =require('cors')
const path = require('path')
const busboy = require('connect-busboy')
const socketIO = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
// const { setupSocket } = require('./socketLogic');
// const io = socketIO(server);
const io = require("socket.io")(server, {
    transports: ['websocket', 'polling'],
    secure: true,
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
app.use(cors())
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));  
// app.use(express.static((path.join(__dirname, 'public'))))
app.use('/public',express.static('public'))
app.use(busboy())
const router = require("./routes/router.js");
const socketLogic = require("./socket/socketManager.js");


// app.use(fileUpload());
app.use("/uploads",express.static('uploads'))
app.use("/", router);

// Cors
// setupSocket(io);
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers" ,"Origin ,X-requested-With , Content , Accept , Content-type,Authorization")
  res.setHeader("Access-Control-Allow-Methods","GET , POST,PUT,DELETE,PATCH,OPTIONS");
  next() 

})


io.on("connection", (socket) => {
  console.log("New socket connection:", socket.id);

  let socketData = new socketLogic(io,socket)
  socketData.joinRoom()

})
const port=process.env.PORT || 4300

server.listen(port, () => {
  console.log(`Server running on port 4300...!`);
});