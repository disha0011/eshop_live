const { Category } = require("../MODELS/category");
const express = require("express");
const router = express.Router();
const CATEGORY = require('../MODELS/category')


//GET CATEGORY
router.get("/getcategory", async (req, res) => {
  const categoryList = await CATEGORY.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});


//GET CATEGORY USING ID
router.get("getcategory/:id", async (req, res) => {
  const categoryList = await CATEGORY.findById(req.params.id);

  if (!categoryList) {
    res.status(500).json({ message: "the category given by the id was not found..." });
  }
  res.status(200).send(categoryList);
});


//UPDATE CATEGORY
router.put("/putcategory/:id", async (req, res) => {
  const categoryList = await CATEGORY.findByIdAndUpdate(
   req.params.id,
   {
    id: req.body.id,
    name: req.body.name,
    color: req.body.color,
    icon: req.body.icon,
    image: req.body.image
   },
   {new:true}

  );

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});



//DELETE CATEGORY
router.delete("/deletecategory/:id", async (req, res) => {
  const categoryList = await CATEGORY.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});




router.post("/postcategory", async (req, res) => {
  let category = new CATEGORY({
    id: req.body.id,
    name: req.body.name,
    color: req.body.color,
    icon: req.body.icon,
    image: req.body.image,
  });
  category = await category.save();

  if (!category) return res.status(400).send("the category cannot be created!");

  res.send(category);
});

module.exports = router;
