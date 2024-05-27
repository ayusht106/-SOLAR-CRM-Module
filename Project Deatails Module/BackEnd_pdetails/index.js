const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
var bodyParser=require('body-parser');

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());
mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true, useNewUrlParser: true}
)
.then(() => {
    console.log("connected to mongodb Atlas");
})
.catch((err) => {
    console.error("Error connecting",err);
});

const detailroutes= require("./Routes/detail");

const hroutes=require("./Routes/homeRoutes");

app.use("/api/login", hroutes);


app.use("/api/details",detailroutes);
app.listen(3020,() =>{
    console.log("Server Running")
});