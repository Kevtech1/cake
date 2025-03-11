document.addEventListener("DOMContentLoaded", () => {
    const products = document.querySelectorAll(".pro");
    const cartCount = document.getElementById("cart-count");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to update cart count
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // Update count on page load
    updateCartCount();

    products.forEach(product => {
        product.addEventListener("dblclick", () => {
            const productName = product.querySelector(".des h5").textContent;
            const productPrice = product.querySelector(".des h4").textContent;
            const productImage = product.querySelector("img").src;
            
            // Create product object
            const cartItem = { name: productName, price: productPrice, image: productImage };
            
            // Add to cart
            cart.push(cartItem);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        });
    });
});
