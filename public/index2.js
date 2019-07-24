let state = {
    searchText:"",
    addedProduct:null
}
let cart = [];
let totalcart =[];
let addCartbtn =null;
let emailInput = null;
let passwordInput = null;
let signupForm = null;
let home= null;
let main = null;
let checkoutBtn= null
let signUpbtn = null
let checkoutForm = null
  
window.onload=()=>{
    main = document.getElementById("main");
    signupForm = document.getElementById("sign-up-form");
    home = document.getElementById("home");
    addCartbtn = document.getElementById("add-btn")
    emailInput = document.getElementById("email")
    passwordInput= document.getElementById("password")
    signUpbtn = document.getElementById("sign-up-btn")
    checkoutBtn= document.getElementById("checkout-btn")
    signUpbtn.onclick = signUp;
    checkoutForm = document.getElementById("checkout")
    listProducts(products);
}
//Sign up and POST to Users:
function signUp(){
    let email = emailInput.value;
    let password = passwordInput.value;
    home.style.display ="block";
    signupForm.style.display = "none";
    let options ={
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({email:email, password:password})
    };
    fetch("https://acastore.herokuapp.com/users", options)
    .then(res=>res.json())
    .then(newUser=>console.log(newUser))
}
//Make your addedProduct equal to your search input value:
function handleChange(e){
  state.searchText = e.value;
}
//Search products:
function search(){
    let filteredProducts = products.filter(p=>p.name.indexOf(state.searchText) > -1);
    listProducts(filteredProducts);
}
//Show product details:
function productDetail(id){
    addCartbtn.style.display ="block";
    let prod = products.find(p=>p.id === id);
    state.addedProduct = prod;
    main.innerHTML = `
        <h2>${prod.name}</h2>
        <div>FULL PRODUCT INFO: ${prod.description}</div>
        <div>Catagory: ${prod.category}</div>
        <div>Rating: ${prod.rating}</div>
        <div>Price: ${prod.price}</div>
        <div>Top Reviews:
        <div>${prod.reviews[0].description}</div>
        </div>`;
}
//GET request to /products:
function getProducts() {
    fetch("https://acastore.herokuapp.com/products")
    .then(res=> res.json())
    .then((products)=> {
        let outputList = '<h2>Products</h2>';
        products.map((p)=> {
            outputList +=  `
            <hr><div onclick="productDetail(${p.id})">
                <div>${p.name}</div>
            </div>`
        })
        main.innerHTML = outputList
    });
}

//List Products(no GET request):
function listProducts(products){
    let prodDivs = products.map(p=>{
      return `
      <hr><div onclick="productDetail(${p.id})">
        <div>${p.name}</div>
      </div>`
    });
    main.innerHTML = prodDivs.join("");
  }
//Add product to cart: 
function addToCart(prod){
    cart.push(prod);
    totalcart.push(prod.price);
    console.log(totalcart)
    showHome();
}
//return to home page:
function showHome(){
    addCartbtn.style.display="none";
    state.addedProduct = null
    listProducts(products);
}
function placeOrder(){
    alert("Thank you! Your Order has been placed")
}
//View shopping cart:
function viewCart(){
    listProducts(cart);
    let elm = document.createElement('div');
    elm.innerHTML="<button onClick='showCheckout()'>Proceed to Checkout</button>";
    main.appendChild(elm)
}
//show checkout:
function showCheckout(){
    listProducts(cart);
    returnTotal();
    let checkoutForm = document.createElement('div');
    checkoutForm.innerHTML=`
    <div>Confirm Your Order by Clicking Below:</div>
    <button onClick='placeOrder()'>Place Order</button>`;
    main.appendChild(checkoutForm)
}
//Calculate total prices in cart: change strings to numbers; use reduce method to sum array;
function returnTotal(){
    let intPrices=[];
    totalcart.forEach((prod)=>{
        intPrices.push(prod = Number(prod.replace(/[^0-9.-]+/g,"")));
    });
    let totalPrice = intPrices.reduce((a,b) => a + b, 0);
    let finalNumber= "$"+totalPrice.toFixed(2);
    main.innerHTML= "Order Total: " + finalNumber
}
//Are you still there? feature:
let userActive = false;
document.querySelector("body").addEventListener('click',checkActivity)

function checkActivity(e){
    e.preventDefault();
    userActive = true;
}
function alertQuestion(){
    if(!userActive){
       alert("Are you still there?");
       userActive = true
    }  
    else userActive = false
}
let interval = setInterval(alertQuestion,60000) 



