const express = require("express");
const app=express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv/config");

mongoose.pluralize(null);
mongoose.set("strictQuery",true);


app.use(express.json());
app.use(cors());
app.options("*",cors());

const router = require('./routes/index')

app.use('/api' , router)

mongoose
    // .connect("mongodb://localhost:27017/node_5",{
    .connect(process.env.CONNECTION_STRING,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>console.log("connected!"))
    .catch((err)=> {
        console.log(err);
    })

const PORT = process.env.PORT || 5500;
app.listen(PORT,()=>{
    console.log(`server listen successfully: http://localhost:${PORT}`);
});
