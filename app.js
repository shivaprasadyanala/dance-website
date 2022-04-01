const express = require('express');
const path = require('path')
const fs = require('fs')
const app = express()
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
    // mongodb://mongo:********@containers-us-west-28.railway.app:6437
mongoose.connect('mongodb+srv://shiva:shiva@cluster0.nqjru.mongodb.net/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 80;


//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const contact = mongoose.model('contact', contactSchema);

//express specific stuff
app.use('/static', express.static('static'))
app.use(express.urlencoded());

//pug specific stuff
app.set('view engine', 'pug') //set template engine as pug
app.set('views', path.join(__dirname, 'views')) //set the views directory

//endpoints

app.get('/', (req, res) => {
    res.status(200).render('home')
})

app.get('/contact', (req, res) => {
    res.status(200).render('contact')
})

app.post('/contact', (req, res) => {
    var myData = new contact(req.body)
    myData.save().then(() => {
        res.send("this item has been saved to the database");
    }).catch(() => {
        res.status(400).send("item was not saved to database")
    });
    // res.status(200).render('contact')
})

//start the service
app.listen(port, () => {
    console.log("the server is started running");
})