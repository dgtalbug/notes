const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config/config');
const mongoose = require('mongoose');
require('dotenv').config();
require('./routes/routes')(app);


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect(process.env.Database, 
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true }).then(()=> {
        console.log("Connected")
    }).catch((err) => {
        console.log(err)
        process.exit();
    });

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

app.get('/',(req,res) => {
    res.json({
        "Message":'Hello World'
    });
});