require("dotenv").config();
const express = require("express");
const {Server} = require ("socket.io");
const {createServer} = require("http");
const cors = require("cors")
const routes = require("./router")
const app = express();
app.use(express.json());
const server = createServer();
const io = new Server(server);

const PORT = process.env.port|4000;
app.use(cors({
    origin: "*"
}))
app.use("/api/v1",routes);
app.get("/api",(req,res)=>{
    res.status(200);
    return res.json({
        message:"Welcome to Health Pro Platform"
    })
})
server.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
})
module.exports = app