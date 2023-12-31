const express = require("express")
const path = require("path")
const nodemailer = require('nodemailer')
const compression= require('compression')


const directpath = path.join(__dirname, "public")

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")

app.set('views', path.join(__dirname, 'views'));


app.use(express.static(directpath,{ maxAge: 31536000 }))

app.use(compression())

//port 8000 

const PORT = process.env.PORT || 8000




// home page

app.get("/", (req, res) => {
  res.render("home")
})



//-----------------------------------




// about page


app.get("/about", (req, res) => {
  res.render("about")
})




// ---------------------------------

// project page




app.get("/projects", (req, res) => {
  res.render("projects")
})






// ---------------------------------

// contact page


app.get("/contact", (req, res) => {
  res.render("contact")
})


// ---------------------------------


app.listen(PORT, function(){
  console.log('listening on 8000')
})
