const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const ORDER = require('../MODELS/order');
const OrderItem = require("../MODELS/order-item");
const  mongoose = require("mongoose");

//GET ORDER
router.get("/getorder", async (req, res) => {
  const orderList = await ORDER.find()
    .populate("user","name")
    // .sort({dateOrderered:-1});

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(orderList);
});
// router.get("/getorder", async (req, res) => {
//   const orderList = await ORDER.find();

//   if (!orderList) {
//     res.status(500).json({ success: false });
//   }
//   res.status(200).send(orderList);
// });

//Get ORDER ID
router.get("/getorder/:id", async (req,res)=>{
  console.log(req.params)
  const order = await ORDER.findById(req.params.id);

  if(!order) {
    res 
      .status(500)
      .json({message:"The order with the given id was not found."});
    }
    res.status(200).send(order);
})

  
// POST ORDER
router.post("/postorder", async (req, res) => {
  const orderItemsIds = Promise.all(
    req.body.orderitems.map(async (orderitem) => {
      let newOrderItem = new OrderItem({
        quantity: orderitem.quantity,
        product: orderitem.product,
      });
      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );

  const orderItemsIdsResolved = await orderItemsIds;
  const totalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product",
        "price"
      );
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    })
  );

  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
  let order = new ORDER({
    id:req.body.id,
    orderItems: orderItemsIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user,
  });
  order = await order.save();

  if (!order) return res.status(400).send("the order cannot be created!");

  res.status(200).send(order);
});

// router.post("/postorder", async (req, res) => {
//   let order = new ORDER({
//     id:{type:String,required:true},
//     orderitems:{type:Array,required:true},
//     shippingAddress1:{type:String,required:true},
//     shippingAddress2:{type:String,required:true},
//     city:{type:String,required:true},
//     zip:{type:String,required:true},
//     country:{type:String,required:true},
//     phone:{type:Number,required:true},
//     status:{type:String,required:true},
//     totalprice:{type:Number,required:true},
//     user:{type:Object,required:true},
//     // dateOrdered:{type:Date,required:true},
//   });
//   order = await order.save();
//   if (!order) return res.status(400).send("the order cannot be created!");
//   res.send(order);
// });


module.exports = router;


  
    // orderitems:[{"quantity":3,"Product":"63cbce45aadcaf7266ab99e2"}],
    // shippingAddress1:"surat",
    // shippingAddress1:"surat",
    // city:"surat",
    // zip:"395010",
    // country:"india",
    // phone:"7816254636",
    // user:"63cbcc49aadcaf7266ab99dd",
   