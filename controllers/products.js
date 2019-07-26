let products = require('../products2')

exports.list = function list(req,res){
    res.json(products)
}
exports.show = function show(req,res){
    let foundProd = products.find(p=>p["id"] == req.params.someid)
    res.json(foundProd)
}
exports.showByName = function showByName(req,res){
    let filteredProd = products.filter(p=>p.name === req.params.prodName)
    res.json(filteredProd)
}
exports.create = function create(req,res){
    let newProduct = req.body;
    products.push(newProduct)
    res.json(newProduct)
}
exports.update = function update(req,res){
    let foundProdIndex = products.findIndex((p => p["id"] == req.params.someid));
    products[foundProdIndex] = req.body
    res.json(req.body)
}
exports.remove = function remove(req,res){
    let foundProdIndex = products.findIndex((p => p["id"] == req.params.someid));
    products[foundProdIndex]= req.body
    req.body ={}
    res.send("deleted")
}