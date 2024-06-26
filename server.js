const express=require("express");
const dotenv=require("dotenv");
dotenv.config();
const server=express();
// server.use(express.json())
const mongoose=require("mongoose");
const router=require("./Router/Router");
const path = require("path");
const Router=require("./Router/CreatePost");
const userRouter=require("./Router/UserDetailsRouter");
const cors = require("cors");
 server.use(express.json());
server.use(cors());

const PORT=process.env.PORT || 5000
// saving the frontend code in the server


mongoose.connect(process.env.URL)
.then((res)=>{
    console.log("database connected")
    server.listen(PORT,()=>{
        console.log(`server is running ${PORT}`)
    })
})
.catch((err)=>{
    console.log(err)
})

// const __dirname=path.resolve();

server.use(Router);
server.use(router);
server.use(userRouter)
server.use(express.static(path.join(__dirname, "/frontend/build")));
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend" ,"build" ,"index.html")),
  function (err) {
    return res.status(500).send(err)
  }
});

