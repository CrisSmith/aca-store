const express = require('express');
const router = express.Router();
const {list,show,showByName,create,update,remove} = require('../controllers/products')

router.get("/products", list);
router.get("/products/:someid", show);
router.get("/products/name/:prodName", showByName);
router.post("/products", create);
router.put("/products/:someid", update);
router.delete("/products/:someid", remove);
    
module.exports = router