
//display the products:
let featuredProducts = "";
for(let i=0; i < products.length; i++){
let product = products[i];
featuredProducts += `
    <div>
        <div>${product.name}</div>
        <img src=${product.imgUrl}>
        <div>Rating:${product.rating}</div>
        <div>Price:${product.price}</div>
        <button class="details">Product Details</button>
        <br>
        <br>
    </div>
    `
};
//listening for events:
document.getElementById("container").innerHTML = featuredProducts;
document.getElementById("btn").addEventListener('click',searchProducts);
document.getElementById("cart-btn").addEventListener('click',viewCart);
document.getElementById("add-btn").addEventListener('click',addToCart);
document.getElementById("cart").addEventListener('click', removeItem);
document.getElementById("container").addEventListener('click',showDetails);
let searchbox = document.getElementById("searchbox");
let resultsbox = document.getElementById("resultsbox");
let cart = document.getElementById("cart");
let addBtn=document.getElementById("add-btn");

//search the products:
function searchProducts(e){
    e.preventDefault();
    for(let i=0; i < products.length; i++){
    if (searchbox.value === products[i].name) {
        resultsbox.innerHTML = 
        `<div>Matching Products: ${products[i].name}</div>`
        }
    }
}
//view shopping cart:
function viewCart(e){
    e.preventDefault();
    cart.style.display = 'block'
}
//add an item to the cart:
function addToCart(e){
    e.preventDefault();
    let item = searchbox.value;
    let cartList = document.getElementById("cart");
    let li = document.createElement("li");
    li.innerHTML = `
        <div>
            <li>${item}</li>
            <button class="remove">Remove</button>
        </div>`;
    cartList.appendChild(li)
}
//remove an item from cart:
function removeItem(e){
    if(e.target.className == "remove"){
        e.target.parentElement.parentElement.remove();
    }
}
//show product details:
function showDetails(e){
    if(e.target.className == "details"){
        let description = document.createElement("div")
        description.innerHTML = `<div>FULL PRODUCT DESCRIPTION: ${products[1].description}</div>`
        e.target.parentElement.appendChild(description)
    }
}