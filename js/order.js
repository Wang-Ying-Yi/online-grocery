// Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart-int");
let closeCart = document.querySelector("#close-cart");

// Open Cart
// cartIcon.onclick = () => {
//     cart.classList.add("active");
// }

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

    // Check out Button
    // var checkoutBtn = document.getElementById("checkout-btn");
    // checkoutBtn.addEventListener('click', buyButtonClicked);

    // Clear Cart
    document
        .getElementsByClassName("btn-clear")[0]
        .addEventListener('click', clearCart);
}


// Load Cart
function loadCart() {
    console.log("Loading cart...1")
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems) {
        for (var i = 0; i < cartItems.length; i++) {
            var cartItem = cartItems[i];
            addProductToCart(cartItem.title, cartItem.price, cartItem.quantity);
        }
        console.log("Loading cart...2")
    }
}
loadCart();

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

// Check Out
// function buyButtonClicked() {
//     var cartContent = document.getElementsByClassName("cart-content")[0];
//     if (cartContent.childNodes.length === 1) {
//         alert("Your cart is empty. Please add items to cart before placing an order.");
//         return;
//     }
//     else{
//         alert("Your Order is placed, please complete the form after clicking OK button.");
//     }
// }


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
}



// Quantity Changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}


// Remove Items From Cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
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


// Get the current date and time
var currentDate = new Date();
var orderDate = currentDate.toLocaleDateString();
var orderTime = currentDate.toLocaleTimeString();

// Get Content from Cart
var cartContent = document.getElementsByClassName("cart-content")[0];

// Calculate total cost of the order
var cartItems = cartContent.getElementsByClassName("cart-box");
var totalCost = 0;
for (var i = 0; i < cartItems.length; i++) {
    var itemPrice = parseFloat(cartItems[i].getElementsByClassName("cart-price")[0].textContent.replace("$", ""));
    var itemQuantity = parseInt(cartItems[i].getElementsByClassName("cart-quantity")[0].value);
    totalCost += itemPrice * itemQuantity;
}

// Display order details
var orderDetails = "Order Details:\n";
orderDetails += "Date: " + orderDate + "\n";
orderDetails += "Time: " + orderTime + "\n\n";
for (var i = 0; i < cartItems.length; i++) {
    var itemName = cartItems[i].getElementsByClassName("cart-product-title")[0].textContent;
    var itemPrice = cartItems[i].getElementsByClassName("cart-price")[0].textContent;
    var itemQuantity = cartItems[i].getElementsByClassName("cart-quantity")[0].value;
    orderDetails += itemName + " x " + itemQuantity + " = " + itemPrice + "\n";
}
orderDetails += "\nTotal Cost: $" + totalCost.toFixed(2);



console.log(orderDetails);

function getOrderDetails() {
    // Implement the logic to retrieve and return the order details
    return orderDetails;
}

// EmailJS
function sendMail() {
    var name = document.getElementById('name').value;
    var address = document.getElementById('address').value;
    var suburb = document.getElementById('suburb').value;
    var state = document.getElementById('state').value;
    var country = document.getElementById('country').value;
    var email = document.getElementById('email').value;
    var orderDetails = getOrderDetails(); // Assuming you have a function to retrieve order details

    const serviceID = "service_28nkshb";
    const templateID = "template_0e6ijpx";
    var sendButton = document.getElementById('sendButton');

    if (address === "" || suburb === "" || state === "" || country === "" || email === "") {
        alert("Please complete the form. Thank you!");
        return;
    } else if (!validateEmail(email)) {
        alert("Error sending email!\nPlease enter a valid email address. Thank you!");
        return;
    } else {
        sendButton.disabled = true; // Disable the button to prevent multiple clicks
        var params = {
            name: name,
            address: address,
            suburb: suburb,
            state: state,
            country: country,
            email: email,
            orderDetails: orderDetails,
            message: "Order Confirmation"
        };

        emailjs.send(serviceID, templateID, params)
            .then(
                res => {
                    document.getElementById('name').value = "";
                    document.getElementById('address').value = "";
                    document.getElementById('suburb').value = "";
                    document.getElementById('state').value = "";
                    document.getElementById('country').value = "";
                    document.getElementById('email').value = "";
                    console.log(res);
                    alert("Thank you for your order!");
                })
            .catch((err) => {
                console.log(err);
                alert("Error sending email. Please try again later.");
            })
            .finally(() => {
                sendButton.disabled = false; // Enable the button after email is sent or if there was an error
            });
    }
}

function validateEmail(email) {
    // Regular expression for email validation
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

var cartContent = document.getElementsByClassName("cart-content")[0];
while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
}
updatetotal();