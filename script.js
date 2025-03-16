
const cartIcon= document.querySelector("#cart-icon");
const cart = document.querySelector(".cart2");
const cartClose = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {
button.addEventListener("click", event => {
const productBox= event.target.closest(".pro");
addToCart(productBox);
});
});

const cartCount= document.querySelector(".cart-content");
const addToCart = productBox => {
const productImgSrc= productBox.querySelector("img").src;
const productTitle= productBox.querySelector("h5").textContent;
const productPrice= productBox.querySelector("h4").textContent;

const cartBox= document.createElement("div");
cartBox.classList.add("cart-box");
cartBox.innerHTML=`  <img src="${productImgSrc}" alt="" class="cart-img">
                    <div class="cart-detail">
                        <h2 class="cart-product-title">${productTitle}}</h2>
                        <span class="cart-price">${productPrice}</span>
                        <div class="cart-quantity">
                            <button id="decrement">-</button>
                            <span class="number">1</span>
                            <button id="increment">+</button>
                        </div>
                    </div>
                    <i class="fa fa-trash" aria-hidden="true" cart-remove></i> `;
        cartContent.appendChild(cartBox);
    };

