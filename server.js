require("dotenv").config();
const express = require("express");
const cors = require("cors")
const routes = require("./router")
const app = express();
app.use(express.json());
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
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
})
module.exports = app