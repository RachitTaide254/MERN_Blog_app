const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const secret = 'secret-token-key'
const cookieParser = require('cookie-parser')
      
const app = express();
app.use(cors({credentials:true,origin:'*'}));
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 8080;


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Databse"))
  .catch((err) => console.log(err));

//schema
const userSchema = mongoose.Schema({
  firstName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  name:String
  //image: String,
});

//
const userModel = mongoose.model("user", userSchema); 

//api
app.get("/", (req, res) => {
  res.send("Server is running");
});

//sign up
app.post("/signup", async (req, res) => {
   //console.log(req.body,"body");
  const { email,firstName ,password} = req.body;
  if(!email){ 
    //console.log('email empty')
    return   
  }
 var result = await userModel.findOne({ email: email })
    if (result) {
      res.send({ message: "Email id is already register", alert: false });
    } else {
      // await userModel.create({
      //   name:firstName,
      //   email: email,  
      //   password:password,
      // })
      var newUser = new userModel({
        email:req.body.email,
        firstname:req.body.firstName,
        password:req.body.password
      });
      await newUser.save();
    //   const data = new userModel(
    //     // firstName:firstName,
    //     // email: email, 
    //     // password:password,
    //     req.body
    // );
    //   const save = await data.save();
    //   console.log(save,'save')
      res.send({ message: "Successfully sign up", alert: true });
    }
  });

//api login
app.post("/login", async (req, res) => {
  //console.log(req.body,'login');
  const { email } = req.body;
  var result = await userModel.findOne({ email: email })
    if (result) {
      var token = jwt.sign({email,id:result._id},secret)      
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        email: result.email,
        token:token
      }; 
      res.send({
        message: "Login is successfully",
        alert: true,
        data: dataSend,   
      });
    } else {
      res.send({
        message: "Email is not available, please sign up",
        alert: false,
      });
    }
  
});

app.get("/profile", async (req, res) => {
  try{
    const token = req.headers.authorization.split(" ")[1]
    var atok = jwt.verify(token,secret)
    res.send({
      message: "Profile is successfully",
      alert: true,
      data: atok,    
    });
  }catch(e){
   // console.log(e)
  }
})
//product section

const schemaBlog = mongoose.Schema({
  Title: String,
  image: String,
  content: String,
  createdBy:String
});
const blogModel = mongoose.model("blog",schemaBlog)



// //save product in data 
// //api
app.post("/uploadBlog",async(req,res)=>{
    // console.log(req.body) 
    const token = req.headers.authorization.split(" ")[1]
    var tok = jwt.verify(token,secret)
    //console.log(atok,'token')
    const data = new blogModel(req.body)
    data.createdBy = tok.email;
    const datasave = await data.save()
    //console.log(datasave,'assds')
    res.send({message : "Upload successfully",alert:true})
})

// //
app.get("/blogs",async(req,res)=>{
  const data = await blogModel.find({})
 // console.log(data,'data') 
  res.send(JSON.stringify(data))
})

app.get("/blog/:id",async(req,res)=>{
  const {id} = req.params; 
 // console.log(id)
  const data = await blogModel.find({_id:id})
 // console.log(data,'data') 
  res.send(JSON.stringify(data))
})
 

app.put("/editblog/:id",async(req,res)=>{
  const {id} = req.params; 
  //console.log(req.body)
  const data = await blogModel.findOneAndUpdate({_id:id},{Title:req.body.Title,image:req.body.image,content:req.body.content})
 // console.log(data,'data') 
  res.send({data:JSON.stringify(data),alert:true})
})
// /*****payment getWay */
// //console.log(process.env.STRIPE_SECRET_KEY)


// const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)

// app.post("/create-checkout-session",async(req,res)=>{

//      try{
//       const params = {
//           submit_type : 'pay',
//           mode : "payment",
//           payment_method_types : ['card'],
//           billing_address_collection : "auto",
//           shipping_options : [{shipping_rate : "shr_1N0qDnSAq8kJSdzMvlVkJdua"}],

//           line_items : req.body.map((item)=>{
//             return{
//               price_data : {
//                 currency : "inr",
//                 product_data : {
//                   name : item.name,
//                   // images : [item.image]
//                 },
//                 unit_amount : item.price * 100,
//               },
//               adjustable_quantity : {
//                 enabled : true,
//                 minimum : 1,
//               },
//               quantity : item.qty
//             }
//           }),

//           success_url : `${process.env.FRONTEND_URL}/success`,
//           cancel_url : `${process.env.FRONTEND_URL}/cancel`,

//       }

      
//       const session = await stripe.checkout.sessions.create(params)
//       // console.log(session)
//       res.status(200).json(session.id)
//      }
//      catch (err){
//         res.status(err.statusCode || 500).json(err.message)
//      }

// })


//server is ruuning
app.listen(PORT, () => console.log("server is running at port : " + PORT));
