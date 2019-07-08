
//CLASS NOTES: variables reset when you refresh the page- how do you prevent this? try: seessionStorage
document.getElementById("btn").addEventListener('click',searchProducts);
document.getElementById("cart-btn").addEventListener('click',viewCart);
document.getElementById("add-btn").addEventListener('click',addToCart);
document.getElementById("cart").addEventListener('click', removeItem);
document.getElementById("checkout-btn").addEventListener('click',showCheckout);
let searchbox = document.getElementById("searchbox");
let resultsbox = document.getElementById("resultsbox");
let cart = document.getElementById("cart");
let checkout = document.getElementById("checkout");
let totalcart=[];

window.onload=()=>{
    Products(products);
}
//Display the products:
function Products(products){
    let featuredProducts = "";
    for(let i=0; i < products.length; i++){
        let product = products[i];
        featuredProducts += `
        <div id="ft-product">
            <img src=${product.imgUrl}>
            <div>${product.name}</div>
            <div>${product.price}</div>
            <div>Rating: ${product.rating}</div>
            <div>Reviews: ${product.reviews.length}</div>
            <button onclick="addAnItem(${product.id})">Add to cart</button>
            <button onclick="ProductDetail(${product.id})">View Details</button>
            <br>
        </div>`
        };
    document.getElementById("container").innerHTML = featuredProducts;
}
Products(products);

//Show product details:
function ProductDetail(id){
    document.getElementById("container").style.display = "none";
    document.getElementById("featured-banner").style.display = "none";
    let prod = products.find((p)=>{
        return p.id === id;
    });
    document.getElementById("prodDetails").innerHTML = `
        <h2>${prod.name}</h2>
        <div>FULL PRODUCT INFO: ${prod.description}</div>
        <div>Catagory: ${prod.category}</div>
        <div>Rating: ${prod.rating}</div>
        <div>Price: ${prod.price}</div>
        <div>Top Reviews:
        <li>${prod.reviews[0].description}</li>
        <li>${prod.reviews[1].description}</li>
        </div>
        <button onclick="addAnItem(${prod.id})">Add to cart</button>
        <select id="pick-amt">
           <option value="default">--Qty--</option>
           <option value="1">Qty: 1</option>
           <option value="2">Qty: 2</option>
           <option value="3">Qty: 3</option>
           <option value="4">Qty: 4</option>
           <option value="5">Qty: 5</option>
           <option value="6">Qty: 6</option>
           <option value="7">Qty: 7</option>
           <option value="8">Qty: 8</option>
           <option value="9">Qty: 9</option>
           <option value="10">Qty: 10</option>
        </select>`;
}
//Search the products:
function searchProducts(e){
    e.preventDefault();
    resultsbox.style.display = 'block';
    for(let i=0; i < products.length; i++){
    if (searchbox.value === products[i].name.toLowerCase()) {
        resultsbox.innerHTML = 
        `<div>Matching Products: ${products[i].name}</div>`
        };
    };
}

//View shopping cart:
function viewCart(e){
    e.preventDefault();
    cart.style.display = 'block';
}

//Add an item to the cart from the search:
function addToCart(e){
    e.preventDefault();
    let cartList = document.getElementById("cart");
    let li = document.createElement("li");
    products.filter((prod)=>{
        if(searchbox.value === prod.name.toLowerCase()){
            li.innerHTML = `
            <div>
                 <li>${prod.name}</li>
                <li>${prod.price}</li>
                <button class="remove">Remove</button>
            </div>`;
            totalcart.push(prod.price);
        };
        cartList.appendChild(li);
    });
}

//add an item to cart from featured products list:
function addAnItem(id){
    let prod = products.find((p)=>{
        return p.id === id;
    });
    let cartList = document.getElementById("cart");
    let li = document.createElement("li");
    li.innerHTML = `
        <div>
            <li>${prod.name}</li>
            <li>${prod.price}</li>
            <button class="remove">Remove</button>
        </div>`;
    cartList.appendChild(li);
    totalcart.push(prod.price);
    alert(`Added ${prod.name} to cart`);
}

//remove an item from cart:
function removeItem(e){
    if(e.target.className == "remove"){
        e.target.parentElement.parentElement.remove();   
    };
}

//Calculate total prices in cart: change strings to numbers; use reduce method to sum array;
function returnTotal(){
    let intPrices=[];
    totalcart.forEach((prod)=>{
        intPrices.push(prod = Number(prod.replace(/[^0-9.-]+/g,"")));
    });
    let totalPrice = intPrices.reduce((a,b) => a + b, 0);
    let finalNumber= "$"+totalPrice.toFixed(2);
    document.getElementById("totalPrice").innerHTML= "Order Total: " + finalNumber
}

//Show checkout form:
function showCheckout(e){
    e.preventDefault();
    checkout.style.display = 'block';
    returnTotal(totalcart); 
}

