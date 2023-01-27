const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const USER = require('../MODELS/user');

router.post("/postuser", async (req, res) => {
  let user = new USER({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });
  user = await user.save();
  if (!user) return res.status(400).send("the user cannot be created!");
  res.send(user);
});

router.get("/getuser", async (req, res) => {
  const userList = await USER.find({});

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send({success : true  ,data : userList});
});


// //search by id
// //localhost:3300/api/user/getuser/63cbcc49aadcaf7266ab99dd aa id che _id che e.
router.get("/getuser/:id", async (req,res)=>{
  console.log(req.params)
  const user = await USER.findById(req.params.id);

  if(!user) {
    res 
      .status(500)
      .json({message:"The user with the given id was not found."});
    }
    res.status(200).send(user);
});


// // PUT USER
// //localhost:3300/api/user/putuser/63cbcc49aadcaf7266ab99dd
router.put("/putuser/:id", async (req,res)=>{
  const user = await USER.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {new: true}
  );
  if (!user) return res.status(400).send("the category cannot be created!");

  res.send(user);
});

// // DELETE USER
////localhost:3300/api/user/deleteuser/63cbcc49aadcaf7266ab99dd
router.delete("/deleteuser/:id", async (req,res)=>{
  USER.findByIdAndRemove(req.params.id)
  .then((user)=>{
    if (user){
      return res
      .status(200)
      .json({success:true,messege:"the category is deleted"});
    }else{
      return res 
      .status(404)
      .json({success: false,message:"category not found"});
      }
  })
  .catch((err)=>{
    return res.status(500).json({success:false,error:err});
  });
}); 

// USER LOGIN
const jwt = require("jsonwebtoken");
router.post("/login",async (req, res) => {
  const user = await USER.findOne({email:req.body.email});
  const secret = process.env.secret;
  if(!user) {
    return res.status(400).send("user not found");
}

if (user && bcrypt.compare(req.body.passwordHash, user.passwordHash)){
const token = jwt.sign(
  {
    "name": user.name,
    "email": user.email
  },
  secret,
  { expiresIn: "1d" }
);

res.status(200). send({ user: user.email, token: token });
} else {
  res.status(400). send("password is wrong!");
}
});



module.exports = router;
















// const express = require("express");
// const bcrypt = require("bcryptjs");
// const router = express.Router();
// const USER = require('../MODELS/user');

// router.post("/postuser", async (req, res) => {
//   let user = new USER({
//     id: req.body.id,
//     name: req.body.name,
//     email: req.body.email,
//     passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
//     phone: req.body.phone,
//     isAdmin: req.body.isAdmin,
//     street: req.body.street,
//     apartment: req.body.apartment,
//     zip: req.body.zip,
//     city: req.body.city,
//     country: req.body.country,
//   });
//   user = await user.save();
//   if (!user) return res.status(400).send("the user cannot be created!");
//   res.send(user);
// });

// router.get("/getuser", async (req, res) => {
//   const userList = await USER.find({});

//   if (!userList) {
//     res.status(500).json({ success: false });
//   }
//   res.send({success : true  ,data : userList});
// });


// //search by id
// //localhost:3300/api/user/getuser/63cbcc49aadcaf7266ab99dd aa id che _id che e.
// router.get("/getuser/:id", async (req,res)=>{
//   console.log(req.params)
//   const user = await USER.findById(req.params.id);

//   if(!user) {
//     res 
//       .status(500)
//       .json({message:"The user with the given id was not found."});
//     }
//     res.status(200).send(user);
// });


// // PUT USER
// //localhost:3300/api/user/putuser/63cbcc49aadcaf7266ab99dd
// router.put("/putuser/:id", async (req,res)=>{
//   const user = await USER.findByIdAndUpdate(
//     req.params.id,
//     {
//       name: req.body.name,
//       email: req.body.email
//     },
//     {new: true}
//   );
//   if (!user) return res.status(400).send("the category cannot be created!");

//   res.send(user);
// });

// // DELETE USER
// ////localhost:3300/api/user/deleteuser/63cbcc49aadcaf7266ab99dd
// router.delete("/deleteuser/:id", async (req,res)=>{
//   USER.findByIdAndRemove(req.params.id)
//   .then((user)=>{
//     if (user){
//       return res
//       .status(200)
//       .json({success:true,messege:"the category is deleted"});
//     }else{
//       return res 
//       .status(404)
//       .json({success: false,message:"category not found"});
//       }
//   })
//   .catch((err)=>{
//     return res.status(500).json({success:false,error:err});
//   });
// }); 

// module.exports = router;

