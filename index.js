const express = require("express");
const path = require("path");
const nodemailer = require('nodemailer');

const directpath = path.join(__dirname, "public");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static(directpath));


//port 8000 

const PORT = process.env.PORT || 8000;




// home page

app.get("/", (req, res) => {
  res.render("home");
});



//-----------------------------------




// about page


app.get("/about", (req, res) => {
  res.render("about");
});




// ---------------------------------

// project page




app.get("/projects", (req, res) => {
  res.render("projects");
});






// ---------------------------------

// contact page


app.get("/contact", (req, res) => {
  res.render("contact");
});


// ---------------------------------

// contact form 

app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  // Configure your email sending (replace with your email service details)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password'
    }
  });

  const mailOptions = {
    from: email,
    to: 'your-email@example.com',
    subject: 'Contact Us Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Error sending the form.');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Form submitted');
    }
  });
});



app.listen(PORT, function(){
  console.log('listening on 8000');
});
