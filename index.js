const express = require('express');
const mysql = require('mysql');
const path = require('path');
const connection = require('./database')
const session = require('express-session')


const directpath = path.join(__dirname,'public');




const app = express();


app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use( session({
    secret: 'secret hemant',
    resave: true,
    saveUninitialized : true
}
)
)

app.set('view engine','ejs');

app.use(express.static(directpath));



app.get('/',(req,res)=>{
    
     
    res.render('register');

      
     
})

app.get('/register',(req,res)=>{
    
     
    res.render('register');

      
     
})






app.post('/register', function(req,res,next){


      const username = req.body.name;
      const email = req.body.email;
      const pass = req.body.password;

      console.log(req.body);
   
       connection.connect(()=>{
        
          sql = "Insert Into register SET ? ";
            
         connection.query(sql,req.body);
         
        res.redirect('/login');

      })
   





} )



app.get('/login',(req,res)=>{
    res.render('login');
})



app.post('/login',(req,res)=>{
      
    let username = req.body.name;
    let pass = req.body.password;
   
     console.log(username);
     console.log(pass);

    if( username && pass )
    {
        
       
         connection.query("SELECT * FROM register WHERE name = ? AND password = ?", [username,pass],function(err,result,fields){
          
  
            console.log(err);
  
            if(result.length>0) 
            {
                req.session.loggedin = true;
                req.session.name = username;
                res.redirect('/home');
            }
            else {
                res.send("Incorrect username and password");
            }
           
        
    
   

});  
   
    } } );

app.get('/home',(req,res)=>{
    
  
    if(req.session.loggedin)
   {
    res.render('home',{username: req.session.name})
   }
   else 
   {
     res.send("wrong username and password");
   }

})






app.get('/about',(req,res)=>{
    

    if(req.session.loggedin)
   {
    res.render('about',{username: req.session.name})
   }
   else 
   {
     res.send("wrong username and password");
   }

     
})


app.get('/projects',(req,res)=>{
    

    if(req.session.loggedin)
    {
     res.render('projects',{username: req.session.name})
    }
    else 
    {
      res.send("wrong username and password");
    }

     
})








app.get('/contact',(req,res)=>{
    
    if(req.session.loggedin)
   {
    res.render('contact',{username: req.session.name})
   }
   else 
   {
     res.send("wrong username and password");
   }
})








app.listen(8000);