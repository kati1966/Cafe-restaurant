let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* =========================
   بررسی تعداد محصولات
========================= */

cart = cart.map(function(product) {

    if (!product.quantity) {
        product.quantity = 1;
    }

    return product;

});


/* =========================
   ذخیره سبد خرید
========================= */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


/* =========================
   تعداد محصولات سبد خرید
========================= */

function getCartCount() {

    let count = 0;

    cart.forEach(function(product) {

        count += product.quantity || 1;

    });

    return count;

}


/* =========================
   بروزرسانی عدد سبد خرید
========================= */

function updateCartCount() {

    const cartCount =
        document.getElementById("cart-count");

    if (cartCount) {

        cartCount.textContent =
            getCartCount();

    }

}


/* =========================
   افزودن به سبد خرید
========================= */

function addToCart(name, price) {

    const existingProduct =
        cart.find(function(product) {

            return product.name === name;

        });


    if (existingProduct) {

        existingProduct.quantity =
            (existingProduct.quantity || 1) + 1;

    } else {

        cart.push({

            name: name,
            price: Number(price),
            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

    alert(name + " به سبد خرید اضافه شد 🛒");

}


/* =========================
   افزایش تعداد محصول
========================= */

function increaseQuantity(name) {

    const product =
        cart.find(function(item) {

            return item.name === name;

        });


    if (product) {

        product.quantity += 1;

        saveCart();

        updateCartCount();

        showCart();

    }

}


/* =========================
   کاهش تعداد محصول
========================= */

function decreaseQuantity(name) {

    const product =
        cart.find(function(item) {

            return item.name === name;

        });


    if (product) {

        product.quantity -= 1;


        if (product.quantity <= 0) {

            cart = cart.filter(function(item) {

                return item.name !== name;

            });

        }


        saveCart();

        updateCartCount();

        showCart();

    }

}


/* =========================
   نمایش سبد خرید
========================= */

function showCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");


    if (!cartItems || !cartTotal) {

        return;

    }


    cartItems.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>سبد خرید شما خالی است.</p>";

    } else {

        cart.forEach(function(product) {

            const quantity =
                product.quantity || 1;

            const price =
                Number(product.price);

            const itemTotal =
                price * quantity;


            const item =
                document.createElement("div");

            item.classList.add("cart-item");


            item.innerHTML = `

                <h3>${product.name}</h3>

                <p>
                    قیمت: ${price.toLocaleString()} تومان
                </p>

                <div class="quantity-controls">

                    <button onclick="increaseQuantity('${product.name}')">
                        ➕
                    </button>

                    <span>
                        ${quantity}
                    </span>

                    <button onclick="decreaseQuantity('${product.name}')">
                        ➖
                    </button>

                </div>

                <p>
                    جمع: ${itemTotal.toLocaleString()} تومان
                </p>

            `;


            cartItems.appendChild(item);

            total += itemTotal;

        });

    }


    cartTotal.textContent =
        total.toLocaleString();

}


/* =========================
   پاک کردن کامل سبد خرید
========================= */

function clearCart() {

    const confirmClear = confirm(
        "آیا مطمئن هستید که می‌خواهید تمام محصولات سبد خرید را پاک کنید؟"
    );


    if (confirmClear) {

        cart = [];

        localStorage.removeItem("cart");

        updateCartCount();

        showCart();

    }

}


/* =========================
   رفتن به صفحه ثبت سفارش
========================= */

function checkout() {

    if (cart.length === 0) {

        alert("سبد خرید شما خالی است!");

        return;

    }


    window.location.href =
        "checkout.html";

}


/* =========================
   نمایش خلاصه سفارش
========================= */

function showCheckoutSummary() {

    const checkoutItems =
        document.getElementById("checkout-items");

    const checkoutTotal =
        document.getElementById("checkout-total");


    if (!checkoutItems || !checkoutTotal) {

        return;

    }


    checkoutItems.innerHTML = "";

    let total = 0;


    cart.forEach(function(product) {

        const quantity =
            product.quantity || 1;

        const price =
            Number(product.price);

        const itemTotal =
            price * quantity;


        const item =
            document.createElement("div");

        item.classList.add("checkout-item");


        item.innerHTML = `

            <h3>${product.name}</h3>

            <p>
                ${quantity} عدد ×
                ${price.toLocaleString()} تومان
            </p>

            <span>
                ${itemTotal.toLocaleString()} تومان
            </span>

        `;


        checkoutItems.appendChild(item);

        total += itemTotal;

    });


    checkoutTotal.textContent =
        total.toLocaleString();

}


/* =========================
   فرم ثبت نهایی سفارش
========================= */

function setupCheckoutForm() {

    const checkoutForm =
        document.getElementById("checkout-form");


    if (!checkoutForm) {

        return;

    }


    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            if (cart.length === 0) {

                alert("سبد خرید شما خالی است!");

                window.location.href =
                    "cart.html";

                return;

            }


            /* دریافت اطلاعات مشتری */

            const customerName =
                document.getElementById(
                    "customer-name"
                ).value;


            const customerPhone =
                document.getElementById(
                    "customer-phone"
                ).value;


            const customerAddress =
                document.getElementById(
                    "customer-address"
                ).value;


            /* پاک کردن سبد خرید */

            cart = [];

            localStorage.removeItem("cart");

            updateCartCount();


            /* مخفی کردن فرم و خلاصه سفارش */

            checkoutForm.style.display =
                "none";

            const orderSummary =
                document.querySelector(
                    ".order-summary"
                );


            if (orderSummary) {

                orderSummary.style.display =
                    "none";

            }


            /* نمایش پیام موفقیت */

            const orderSuccess =
                document.getElementById(
                    "order-success"
                );


            if (orderSuccess) {

                orderSuccess.classList.add(
                    "show"
                );

            }

        }
    );

}


/* =========================
   اجرای اولیه
========================= */

updateCartCount();

showCart();

showCheckoutSummary();

setupCheckoutForm();


/* =========================
   Hamburger Menu
========================= */

const menuToggle =
    document.getElementById("menu-toggle");

const mainNav =
    document.getElementById("main-nav");


if (menuToggle && mainNav) {

    menuToggle.addEventListener(
        "click",
        function() {

            mainNav.classList.toggle("active");

        }
    );

}

/* =========================
   فرم ثبت‌نام
========================= */

const registerForm =
    document.getElementById("register-form");

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const fullname =
                document.getElementById("fullname").value.trim();

            const email =
                document.getElementById("register-email").value.trim();

            const password =
                document.getElementById("register-password").value;

            const confirmPassword =
                document.getElementById("confirm-password").value;


            /* بررسی اطلاعات */

            if (!fullname || !email || !password || !confirmPassword) {

                alert("لطفاً تمام فیلدها را تکمیل کنید.");

                return;
            }


            /* بررسی تطابق رمز عبور */

            if (password !== confirmPassword) {

                alert("رمز عبور و تکرار رمز عبور یکسان نیستند.");

                return;
            }


            /* ذخیره اطلاعات کاربر در مرورگر */

            const user = {

                fullname: fullname,
                email: email,
                password: password

            };


            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );


            alert(
                "ثبت‌نام با موفقیت انجام شد 🌷"
            );


            /* انتقال به صفحه ورود */

            window.location.href =
                "login.html";

        }
    );

}
