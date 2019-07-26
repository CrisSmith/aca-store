const express = require('express');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/products');


const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(productsRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, (err)=>{
    if(err){
        console.log("Nothing here, kid", err)
    };
    console.log("Server running on port 5000...")
})
