const ejs = require("ejs");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");


const User = require("./models/User");


const authenticateUser = require("./middlewares/authenticateUser");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.port || 4000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose
  .connect("mongodb+srv://reyhan:reykan123@nodeblog.jdocm.mongodb.net/node-blog?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to mongodb cloud! :)");
  })
  .catch((err) => {
    console.log(err);
  });


// middlewares
app.use(bodyParser.urlencoded({ extened: true }));
app.use(express.static("public"));
app.use('/css', express.static(__dirname + 'public/css'));
app.use(express.static("views"));
app.use('/css', express.static(__dirname + 'views/css'));





app.set("view engine", "ejs");


app.all("/", (req, res) => {
  res.render(path.join(__dirname, "./views/index.ejs"));
})
app.all("/iindex", (req, res) => {
  res.render(path.join(__dirname, "./views/iindex.ejs"));
})

app.all("/ourteam", (req, res) => {
  res.render(path.join(__dirname, "./views/ourteam.ejs"));
})

/*
app.all("/board",(req,res)=>{ 
  res.render(  path.join(__dirname,"./views/views2/index.ejs")  );
})
app.all("/login",(req,res)=>{ 
res.render(  path.join(__dirname,"./views/login.ejs"));

})
app.all("/register",(req,res)=>{ 

res.render(  path.join(__dirname,"./views/register.ejs"));
})*/


// cookie session
app.use(
  cookieSession({
    keys: ["randomStringASyoulikehjudfsajk"],
  })
);

// route for serving frontend files
app
  //sayfada göstermek istediğin 
  .get("/", (req, res) => {
    res.render("index");
  })
  .get("/iindex", (req, res) => {
    res.render("iindex");
  })

  .get("/login", (req, res) => {
    res.render("login");
  })
  .get("/register", (req, res) => {
    res.render("register");
  })
  .get("/ourteam", (req, res) => {
    res.render("ourteam");
  })
  .get("/report", (req, res) => {
    res.render("views2/report.ejs");
  })
 
  .get("/board", authenticateUser, (req, res) => {
    res.render("views2/index.ejs", { user: req.session.user });

  });


// route for handling post requirests
app
  .post("/login", async (req, res) => {
    const { email, password } = req.body;

    // check for missing filds
    if (!email || !password) {
      res.send("Please enter all the fields");
      return;
    }

    const doesUserExits = await User.findOne({ email });

    if (!doesUserExits) {
      res.send("invalid username or password");
      return;
    }

    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExits.password
    );

    if (!doesPasswordMatch) {
      res.send("invalid useranme or password");
      return;
    }

    // else he\s logged in
    req.session.user = {
      email,
    };

    res.redirect("/board");
  })
  .post("/register", async (req, res) => {
    const { email, password } = req.body;

    // check for missing filds
    if (!email || !password) {
      res.send("Please enter all the fields");


      return;
    }

    const doesUserExitsAlreay = await User.findOne({ email });

    if (doesUserExitsAlreay) {
      res.send("A user with that email already exits please try another one!");


      return;
    }

    // lets hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    const latestUser = new User({ email, password: hashedPassword });

    latestUser
      .save()
      .then(() => {
        res.send("registered account!");
        return;
      })
      .catch((err) => console.log(err));
  });

//logout
app.get("/logout", authenticateUser, (req, res) => {
  req.session.user = null;
  res.redirect("/login");
});



//const request = require('request');
/*
const serialPort =require('serialport')
const port =new serialPort(
    'COM5',
    {baudRate:115200}
)
const parser=new serialPort.parsers.Readline()
port.pipe(parser)
var d=parser.on('data',(line)=>{
    return line
})*/

/*
var position = [
    39.9639,
    32.8383 
];
// Tek bir yönde hareket ediyor.
var deltaPosition = {x:Math.random()-.5,y:Math.random()-.5};
deltaPosition.x *=.001;
deltaPosition.y *=.001; 



  function SendRandom(){
    position[0] += deltaPosition.x;
    position[1] += deltaPosition.y;
    
   

    request.post(
      
      {
        
        url:'http://localhost:4000/api/v1/send/0000/telemetry', 
        form: { 
          
          temperature:20,
            humidity:(Math.random()*10 + 70 ).toFixed(1), 
            position: position
           
        }
    }, 
        function(err,httpResponse,body){ 
            console.log(err,body)
        }
    )

}

setInterval(SendRandom,2000);





*/




//exports = 'Merhaba Node.js';




 app.post('/', exports.yaz=function(req, res) { 

  
  var mesaj= JSON.stringify(req.body);
return mesaj;

  
  })
  
  






// server config
app.use(require("./api.js").router)

app.listen(PORT, () => console.log(`Server Listening on ${PORT}`));
