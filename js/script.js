// Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart-int");
let closeCart = document.querySelector("#close-cart");

// Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active");
}

// Close Cart
closeCart.onclick = () => {
    cart.classList.remove("active");
}

// Clear Button
let clearCart = document.querySelector(".btn-clear");

clearCart.addEventListener('click', () => {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    localStorage.clear();
    updatetotal();
});

// Cart Working and scroll bar
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}
else {
    ready();
}

// Macking fuction
function ready() {
    // Remove Items From Cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    // Quantity Changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    // Add to Cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }


    // Clear Cart
    document
        .getElementsByClassName("btn-clear")[0]
        .addEventListener('click', clearCart);

}

// Add to Cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}


// Add Product To Cart
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            var quantityInput = cartItemsNames[i].parentElement.getElementsByClassName("cart-quantity")[0];
            var newQuantity = parseInt(quantityInput.value) + 1;
            quantityInput.value = newQuantity;
            updatetotal();
            return;
        }
    }
    var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" min="1" max="20" class="cart-quantity">
    </div>
    <!-- Remove Cart -->
    <i class='bx bxs-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener('change', quantityChanged);

    updatetotal();
    saveCart();
}

// Local Storage
function saveCart() {
    console.log("Cart Saved...1")
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var cartItems = [];
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var cartProduct = {};
        console.log("Cart Saved...2")
        cartProduct.title = cartBox.getElementsByClassName("cart-product-title")[0].innerText;
        cartProduct.price = cartBox.getElementsByClassName("cart-price")[0].innerText;
        cartProduct.quantity = cartBox.getElementsByClassName("cart-quantity")[0].value;
        cartItems.push(cartProduct);
    }
    // Saving to Local Storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("Cart Saved...3")
}




// Quantity Changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }else if(isNaN(input.value) || input.value > 20){
        input.value = 20;
    }
    updatetotal();
}


// Remove Items From Cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    localStorage.clear();
    updatetotal();
}

// Update Total
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    // Rounding Off Total
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

// Search Box
const search = () =>{
    const searchbox = document.getElementById("search-box").value.toUpperCase();
    const storeitems = document.getElementById("product");
    const product = document.querySelectorAll(".box");
    const pname = storeitems.getElementsByTagName("h3");

    for(var i = 0; i < product.length; i++){
        let match = product[i].getElementsByTagName("h3")[0];

        if(match){
            let textvalue = match.textContent || match.innerHTML;

            if(textvalue.toUpperCase().indexOf(searchbox) > -1){
                product[i].style.display = "";
            }
            else{
                product[i].style.display = "none";
            }
        }
    }
}



// Check Out
var checkoutBtn = document.getElementById('checkout-btn');
checkoutBtn.addEventListener('click', buyButtonClicked);

function buyButtonClicked() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    if (cartContent.childNodes.length === 1 ) {
        alert("Your cart is empty. Please add items to cart before placing an order.");
        return;
    }
    else{
        window.location.href="../html/order.html"
    }
}