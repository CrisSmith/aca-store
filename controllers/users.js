let users = require('../users')

//GET
exports.list= function list(req,res){
    res.json(users)
}
//GET w request varaiables:
exports.show= function show(req,res){
    let foundUser = users.filter(u=>u["id"]==req.params.someid)
    res.json(foundUser)
}
//POST
exports.create= function create(req,res){
    let newUser ={
        email: req.body.email,
        password: req.body.password
    };
    users.push(newUser)
    res.json(users)
}
//PUT
exports.update= function update(req,res){
    let updatedUser = req.body;
    users.forEach(u => {
        if(u["id"] == req.params.someid){
            u.id=updatedUser.id,
            u.email=updatedUser.email;
            u.password=updatedUser.password;
            res.json({msg:"user info updated",u})
        }
    });
}
//DELETE
exports.remove= function remove(req,res){
    req.body ={}
    res.json({msg:"user deleted"})
}