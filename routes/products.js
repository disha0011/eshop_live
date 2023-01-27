const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Category=require("../MODELS/category")
const PRODUCT = require('../MODELS/product');

router.use(express.json());
// router.use(express.urlencoded());

// GET PRODUCT
router.get('/getproduct', (req, res) => {
    PRODUCT.find({}, (err, result) => {
        if (err) throw err;
        else {
            res.send(result);
        }
    });
});

// PUT PRODUCT
router.put("/putproduct/:id", async (req,res)=>{
    const product = await PRODUCT.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name
      },
      {new: true}
    );
    if (!product) return res.status(400).send("the product cannot be created!");
  
    res.send(product);
  });
  
  // DELETE PRODUCT
  router.delete("/deleteproduct/:id", async (req,res)=>{
    PRODUCT.findByIdAndRemove(req.params.id)
    .then((product)=>{
      if (product){
        return res
        .status(200)
        .json({success:true,messege:"the product is deleted"});
      }else{
        return res 
        .status(404)
        .json({success: false,message:"product not found"});
        }
    })
    .catch((err)=>{
      return res.status(500).json({success:false,error:err});
    });
  }); 



router.post('/postproduct',async (req, res) => {
    const categor=Category.findById(req.body.category);
    if(!categor) return res.status(400).send("Invalid Category")
    let product = new PRODUCT({
        name:req.body.name,
        description:req.body.description,
        richdescription:req.body.richdescription,
        image:req.body.image,
        images:req.body.images,
        brands:req.body.brands,
        price:req.body.price,
        category:req.body.category,
        countInStock:req.body.countInStock,
        rating:req.body.rating,
        isFeatured:req.body.isFeatured,
        dateCreated:req.body.dataCreated,
    });
     product = await product.save();
    if(!product) return res.status(500).send("The product cannot be created");
    else 
    res.send(product);
    // console.log("insert done");
});

module.exports = router;




//data
// {
//     "id": "P11",
//     "name": "tshirt",
//     "description": "amazing",
//     "richDescription": "12345",
//     "image": "imagepath",
//     "brand": "dior",
//     "price": "1000",
//     "category": "63ce87febe8ce6ce63d3c34b", //aa category vala data che aemathi category id lidhi che.
//     "countInStock": "90",
//     "rating": "5",
//     "isFeatured": "yes"
//   }