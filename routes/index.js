const express = require('express');
const router = express.Router();

const users = require('./users')
router.use('/user' , users);

const category = require('./categories')
router.use('/category' , category);

const product = require('./products')
router.use('/product' , product);

const order=require('./orders')
router.use('/order' , order);


module.exports = router;