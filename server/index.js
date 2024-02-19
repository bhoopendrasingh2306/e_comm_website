const express = require("express");
const cors = require("cors");
const multer = require("multer"); //this library is used to upload files by user
require("./db/config");
const users = require("./db/users");
const products = require("./db/Product");
const images = require("./db/images");
const app = express();

const jwt = require("jsonwebtoken");
const jwtKey = "e-comm";



app.use(express.json());
app.use(cors()); //the are midddle wares used with use keyword

//we will pass our resp.send(result) as resp.send({result, auth: token}) inside jwt.sign
//sinup
app.post("", async (req, resp) => {
  let valu = new users(req.body); //users specify the schema which is imported above from db folder
  let result = await valu.save();
  result = result.toObject();
  delete result.password;
  // this jwt token will be generated when we signup 
  jwt.sign({result} , jwtKey , {expiresIn:"2h"}, (err,token) =>{
    if(err){
      resp.send({result: "something went wrong or token expired"})
    }
    else{resp.send({result , auth: token})};
  }) 

});

// jwt token for signup and login are not same

app.post("/login", async (req, resp) => {
  console.log("login api", req.body);
  if (req.body.email && req.body.password) {
    // user stores output return by the database
    let user = await users.findOne(req.body).select("-password");
    if (user) {

      // this jwt token is generated while login expiresin defines time after which token will be expired
      jwt.sign({user} , jwtKey , {expiresIn:"2h"}, (err,token) =>{
        if(err){
          resp.send({result: "something went wrong or token expired"})
        }
        else{resp.send({user , auth: token})};
      }) 

    } else {
      resp.send({ result: "No user found!" });
    }
  } else {
    resp.send({ result: "No user found!" });
  }
});

app.post("/add-product",verifyToken, async(req,resp)=>{
  let prodvalu = new products(req.body);
  let result = await prodvalu.save();
   result = result.toObject();
  resp.send(result);
})



app.get("/products", verifyToken, async(req,resp)=>{
  // console.log("queryy",req.params);
  let resultlist = await products.find({userId: req.user._id});
  if(resultlist.length>0){
    resp.send(resultlist)
  }else{
    resp.send({result:"No products found"})
  }
})

app.delete("/product/:id" , verifyToken, async (req,resp)=>{
  //int this method we need a schema on the basis of which we delete the entry so 
  //here _id is a field in schema and on basis of _id we delete the entry 
  //req.params.id  will return us the value of id of the entry we want to delete
  const result = await products.deleteOne({_id:req.params.id})
  resp.send(result);
});


//finf for prefilling the fields
app.get("/product/:id", verifyToken ,async (req,resp)=>{
  let result= await products.findOne({_id:req.params.id});
  if(result){
    resp.send(result);
  }
  else{
    resp.send({result : "no result found "});
  }
})


app.put("/product/:id", verifyToken, async (req,resp)=>{


  //in this update method we pass two parameters in {} braces first for identifier or for identifying schema and the other{}braces contains $set :  any new value we want to give such as req.body (takes something written in the body)
  let result = await products.updateOne(
    {_id:req.params.id},
    {
      $set :req.body
    }
  )
  resp.send(result);
})


app.get("/search/:key", verifyToken , async(req,resp)=>{
  //"$or"  it is a property which we use while we have to search a product on basis of different properties
  let result = await products.find({
    "$or":[
      {name:{$regex:req.params.key}},
      {price:{$regex:req.params.key}},
      {company:{$regex:req.params.key}},
      {category:{$regex:req.params.key}}
    ]
  });
  resp.send(result);
})


function verifyToken(req , resp ,next){
  let token = req.headers['authorization'];
  if(token){
    token = token.split(' ')[1];
    jwt.verify(token, jwtKey ,(err, valid)=>{
      if(err){
        resp.status(401).send({result : "please add valid token"})
      }else{
        req.user = valid.user
        // console.log("validity:",valid)
        next();
      }
    })
  }else{
    resp.status(403).send({result : "please add token with header"});
  }
  console.log("middleware called", token);
}

app.get("/profile/:id", async(req,resp)=>{
  let userProfile = await users.findOne({_id:req.params.id});
  if(userProfile){
    resp.send(userProfile)
  }else{
    resp.send({result:"No user found"})
  }
})


const storage = multer.diskStorage({
  destination: function(req,file, cb){
    return cb(null , "./profile_images")
  },
  filename: function (req,file, cb){
    return cb(null,`${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({storage});

app.post("/profileUpload", upload.single('file'), async (req,resp)=>{

  let img = new images(req.file);
  let result = await img.save();
   result = result.toObject();
  resp.send(result);
  console.log("result is",result);
  console.log("body print",req.body)
  console.log("file print",req.file)
  // resp.send("success upload");
})

app.listen(3003);
