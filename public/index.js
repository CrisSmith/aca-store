
//display the products:
function Products(products){
    let featuredProducts = "";
    for(let i=0; i < products.length; i++){
    let product = products[i];
    featuredProducts += `
        <div>
            <div>${product.name}</div>
            <img src=${product.imgUrl}>
            <button class="details">Product Details</button>
            <br>
            <br>
        </div>
        `
        };
        document.getElementById("container").innerHTML = featuredProducts;
}
Products(products);


document.getElementById("btn").addEventListener('click',searchProducts);
document.getElementById("cart-btn").addEventListener('click',viewCart);
document.getElementById("add-btn").addEventListener('click',addToCart);
document.getElementById("cart").addEventListener('click', removeItem);
document.getElementById("container").addEventListener('click',showDetails);
document.getElementById("checkout-btn").addEventListener('click',showCheckout);

let searchbox = document.getElementById("searchbox");
let resultsbox = document.getElementById("resultsbox");
let cart = document.getElementById("cart");
let checkout = document.getElementById("checkout");
//let addBtn=document.getElementById("add-btn");

//search the products:
//CLASS NOTES: THINK ABOUT USING FILTER (products.filter)
//let filtedProducts = products.filter(p=> p.name===serachbox.value)...; then  Products(filteredProducts)
//this will return an array with the filtered products
//or use the 'includes' method:   p.name.indexOf includes()

function searchProducts(e){
    e.preventDefault();
    resultsbox.style.display = 'block';
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
//add an item to the cart from the search:
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
        description.innerHTML = `
        <div>Full Product Description: ${products[0].description}</div>
        <div>Catagory: ${products[0].category}</div>
        <div>Rating: ${products[0].rating}</div>
        <div>Price: ${products[0].price}</div>
        <div>Reviews: ${products[0].reviews[0].description}</div>
        <button id="add-btn">Add to cart</button>
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
        e.target.parentElement.appendChild(description)
    }
}

//show checkout form:

function showCheckout(e){
    e.preventDefault();
    checkout.style.display = 'block'
}

