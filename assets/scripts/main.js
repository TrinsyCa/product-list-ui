const sectionMain = document.getElementById("sectionMain");
const cardProducts = document.getElementById("cardProducts");
const cardBanner = document.querySelector(".card-banner"); 
const cardTitle = document.querySelector(".card-title"); 

function cardProductsH() {
    if(window.innerWidth <= 750 || window.innerHeight <= 1050) {
        let windowSpace = 405;
        if(window.innerWidth <= 400) {
            windowSpace -= 75;
        }
        cardProducts.style.height = (window.innerHeight - windowSpace) + "px";
    }
    else {
        cardProducts.style.height = (sectionMain.scrollHeight - 180) + "px";
    }
}
window.addEventListener("DOMContentLoaded", cardProductsH);
window.addEventListener("resize", cardProductsH);

const groupBtns = document.querySelectorAll("#groupBtn");
groupBtns.forEach((groupBtn) => {
    groupBtn.addEventListener("click", () => {
        groupBtn.classList.toggle("active-group");
        const productGroup = groupBtn.nextElementSibling;
        if(productGroup) {
            productGroup.classList.toggle("active-group");
            if (productGroup.classList.contains("active-group")) {
                productGroup.style.height = `${productGroup.scrollHeight + 20}px`;
            } else {
                productGroup.style.height = "0";
            }
        }
    });
});

const productLists = document.querySelectorAll(".product-list");
productLists.forEach((list) => {
    list.addEventListener("click", (event) => {
        const clickTarget = event.target;
        if (clickTarget.classList.contains("product") && clickTarget.id !== "groupBtn") {
            // Product Click Event
            if (list.classList.contains("product-group")) {
                list.classList.add("active-product");
            }
            if(list.classList.contains("product-group") && list.classList.contains("active-group")) {
                setTimeout(() => {
                    list.classList.add("lock");
                }, 200);
            }
            else {
                list.classList.add("lock");
            }
            clickTarget.classList.add("active");
            if(totalClick === 0) {
                totalWidth(clickTarget);
                totalClick++;
            }
            if(productImgBool === 0) {
                productImage(clickTarget);
                productImgBool++;
            }
            setTimeout(() => {
                clickTarget.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest"
                });
            }, 300);
        }
    });
});

function adjustScale() {
    const container = document.querySelector('.container');
    if(window.innerWidth > 750 && window.innerHeight > 1050) {
        const scaleValue = window.innerHeight / 1050;
        container.style.transform = `scale(${Math.min(scaleValue, 1)})`;
    }
    else {
        container.style.transform = 'scale(1)';
    }
}

window.addEventListener('load', adjustScale);
window.addEventListener('resize', adjustScale);

const allProducts = document.querySelectorAll(".product");
const productBackBtns = document.querySelectorAll(".productBackBtn");
productBackBtns.forEach((backBtn) => {
    backBtn.addEventListener("click", () => {
        allProducts.forEach((product) => {
            if(product.classList.contains("active") && product.id !== "groupBtn") {
                product.classList.remove("active");
                product.classList.remove("book");
                totalWidth(product);
                productImage(product);
                productLists.forEach((list) => {
                    list.classList.remove("active-product");
                    list.classList.remove("lock");
                });
            }
        });
    });
});

let totalClick = 0;
function totalWidth(product) {
    const total = product.querySelector(".total");
    const totalCurrency = total.querySelector(".currency").scrollWidth;
    let totalPrice = 70;
    //const totalPrice = total.querySelector(".price").scrollWidth; flexible price box
    const totalGoBook = total.querySelector(".goBook");
    if(product.classList.contains("active")) {
        const totalInterval = setInterval(() => {
            total.style.width = totalGoBook.scrollWidth + "px";
        }, 5);
        setTimeout(() => {
            clearInterval(totalInterval);
            setTimeout(() => {
                total.classList.add("activeBtn");
            }, 350);
        }, 185);
    }
    else {
        const totalInterval = setInterval(() => {
            total.style.width = totalCurrency+ totalPrice + "px";
        }, 5);
        setTimeout(() => {
            clearInterval(totalInterval);
            total.classList.remove("activeBtn");
        }, 185);
    }
    totalClick = 0;
    productImgBool = 0;
}

let productImgBool = 0;
function productImage(product) {
    const productImg = product.querySelector(".product-img img");
    if (productImg.getAttribute("aria-label")) {
        productImg.classList.add("loading");
        const productImgLabel = productImg.getAttribute("aria-label");
        const imgLoader = new Image();
        imgLoader.src = productImgLabel;
        imgLoader.onload = () => {
            const width = imgLoader.width;
            const height = imgLoader.height;
            productImg.setAttribute("width", width);
            productImg.setAttribute("height", height);
            productImg.setAttribute("aria-label", productImg.src);
            productImg.src = productImgLabel;
            productImg.classList.remove("loading");
        };
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const productImages = document.querySelectorAll(".product-img img");
    productImages.forEach(img => {
        img.setAttribute("width", "88");
        img.setAttribute("height", "88");
    });
});

let stripeBool = 0;
function bookSection() {
    const activeProduct = document.querySelector(".product.active");
    
    if (activeProduct) {
        activeProduct.classList.toggle("book");

        const productBook = activeProduct.querySelector(".product-book");
        const stripeId = productBook.getAttribute("data-stripe-id");
        const publishableKey = "pk_live_51PlFehJh7IjTb9cgSccC8441fhwoeAnsUegfR1dygD8PRz8FiT5647lOCJk5WQoOKql73zHjBcMe3B4Mj2S4q3cS00B7vRbj0l";

        if (activeProduct.classList.contains("book") && stripeId !== "") {
            productBook.innerHTML = `
                <div class="separate">
                    <div class="book-account">
                        <h3 title="Book with Stripe">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 48 48"><g fill="none" stroke-linejoin="round" stroke-width="4"><path fill="#0bfe54" stroke="white" d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"/><path stroke="#fff" stroke-linecap="round" d="M16 24L22 30L34 18"/></g></svg>
                            Stripe
                        </h3>
                        <div class="bookBox">
                            <stripe-buy-button 
                                buy-button-id="${stripeId}" 
                                publishable-key="${publishableKey}">
                            </stripe-buy-button>
                        </div>
                    </div>
                </div>`;
            if(stripeBool === 0) {
                const stripeScript = document.createElement("script");
                stripeScript.src = "https://js.stripe.com/v3/buy-button.js";
                stripeScript.async = true;
                document.body.appendChild(stripeScript);
                stripeBool++;
            }
        }
        else {
            const productError = productBook.getAttribute("aria-errormessage");
            productBook.innerHTML = `
                <div class="separate">
                    <div class="book-account">
                        <h3>Please contact us for pricing information on this product.</h3>
                        <div class="bookBox">
                            <a class="btn" href="https://wa.me/+905301267153?text=I'm interested in the ${productError}. Could you provide me with the pricing information?" target="_blank">Whatsapp</a>
                        </div>
                    </div>
                </div>`;
        }
    }
}