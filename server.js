const express = require('express');
const bodyParser = require('body-parser');
const products = require("./products2");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.get("/products", function(req,res){
        res.json(products)
});
app.get("/products/1",function(req,res){
        res.json(products[0])
});

app.post("/products",function(req,res) {
    let newProduct = req.body;
    products.push(newProduct)
    res.json(newProduct)
});
//Path Variables:
app.get("/products/name/:prodName",function(req,res){
        let filteredProd = products.filter(p=>p.name === req.params.prodName)
        res.json(filteredProd)
});
app.get("/products/:someid",function(req,res){
    let foundProd = products.find(p=>p["id"] == req.params.someid)
    res.json(foundProd)
});
app.listen(3000, (err)=>{
    if(err){
        console.log("Nothing here, kid", err)
    };
    console.log("Server running on port 3000...")
})
