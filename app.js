/**This file will contain about JWT tokens how server will send jwt token to client
 after client got login , and how client send jwt token along with request (api)
 and how server will verift manipulated tokens .

 How to store senstive data in database , incase of login password is correct or not...
 */

const express = require("express");
const app =  express();
const jwt  = require("jsonwebtoken")

app.use(express.json());

app.post("/login" , (req,res)=>{
    const {email,password} = req.body;  // data coming from client
    var token =  jwt.sign({email:email , isAdmin : false},"shhhhh")   // creating jwt token in server
    res.json(token) // sending jwt token to client
})

app.get("/productInfo" ,(req,res)=>{
    var usertoken = req.headers.authorization; //accessing token which is send by the client
    try{
        var decoded = jwt.verify(usertoken , "shhhhh") // verifying the token
    res.json(decoded) // if valid token it sends data , if invalid sends error.
    }catch(err){
        res.json(err)
    }
    
})

/**if user requested without sending any token means user not logged in it will get undefined.. */

app.get("/productInfo" ,(req,res)=>{
    var usertoken = req.headers.authorization; //accessing token which is send by the client
    if(usertoken == undefined){
        return res.json("Login Required")
    }else{  
        try{
            var decoded = jwt.verify(usertoken , "shhhhh") // verifying the token
        res.json(decoded) // if valid token it sends data , if invalid sends error.
        }catch(err){
            res.json(err)
        }       
    } 
})

/**If user registering , the data should be encrypted , toencrypt we use pacakge called bcrypt */

const bcrypt = require("bcrypt")
const hasingpassword = bcrypt.hashSync("madhu1234" , 10);  //salt =10
console.log(hasingpassword)

//to decoding 

const result = bcrypt.compareSync("madhu1234", "hasingpassword")
console.log(result)

app.listen("3000",()=>{
    console.log("Server running")
})