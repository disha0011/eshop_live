const mongoose = require("mongoose")

const OrdersSchema = new mongoose.Schema({
    id:{type:String,required:true},
    orderItems: [{ type: mongoose.Schema.Types.ObjectId,ref:"orderitems",required: true }],  
    shippingAddress1: { type: String, required: true },
    shippingAddress2: { type: String, required: true },
    city:{ type: String, required: true },
    zip: { type: Number, required: true },
    country: { type: String, required: true },
    phone: { type: Number, required: true },
    status:{ type: String, required: true ,default:"pending"},
    totalPrice: { type: Number},
    user: { type: mongoose.Schema.Types.ObjectId, required: true,ref:"User"},
    dateOrdered: { type: Date, default:Date.now },


})

const order = mongoose.model("orders",OrdersSchema);

module.exports=order;