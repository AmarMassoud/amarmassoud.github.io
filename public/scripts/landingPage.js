
document.addEventListener("DOMContentLoaded", async () => {
    let products = [];
    const getProducts = async () => {
        const response = await fetch(`/api/products`, {
            method: "GET",
        });
        console.log(response)
        if (response.ok) {
            products = await response.json();
            console.log(products)
        }
    }

    // products = JSON.parse(localStorage.getItem("products")) || [];

    if (products.length === 0) {
        await getProducts();

    }

    let currentProductId = localStorage.getItem("currentProduct") ?? -1;
    let currentProduct = {};
    if (currentProductId !== -1) {
        const responseProduct = await fetch(`/api/products/${currentProductId}`, {
            method: "GET",
        }).then((res) => res.json()).then((data) => currentProduct = data);

    }

let currentUserId = JSON.parse(localStorage.getItem("currentUser"));
    console.log(currentUserId)
    let currentUser = {};


    const navbar = document.querySelector("#nav");
if (currentUserId === null || currentUserId === "-1"){
    currentUserId = "-1";
    const profileButton = document.querySelector("#profile-link");
    profileButton.href = "../login.html";

    localStorage.setItem("currentUser", currentUserId);
    navbar.textContent = "G";
    navbar.setAttribute("name", "Guest");
} else {
    const getUser = await fetch(`/api/user/${currentUserId}`, {
        method: "GET",
    });
    currentUser = await getUser.json();
    navbar.textContent = currentUser ? currentUser.firstName.charAt(0) : "G";
    navbar.setAttribute("name", currentUser ? currentUser.firstName : "Gust");
}


const searchInput = document.querySelector("#search");

const overlay = document.createElement("div");
overlay.setAttribute("id", "overlay");
overlay.classList.add(
    "fixed",
    "top-0",
    "left-0",
    "w-full",
    "h-full",
    "hidden",
    "z-50"
);

const overlayContent = document.createElement("div");
overlayContent.setAttribute("id", "overlayContent");
overlayContent.classList.add(
    "bg-white",
    "p-4",
    "m-auto",
    "mt-20",
    "w-4/4",
    "max-w-4xl",
    "rounded-md",
    "overflow-auto",
    "shadow-2xl"
);

overlay.appendChild(overlayContent);
const parentDiv = document.querySelector("#search-dropdown");
parentDiv.classList.add("grid", "grid-cols-1");
parentDiv.appendChild(overlay);

function showOverlay(products) {
    console.log(products);
    overlayContent.innerHTML = "";
    const productsAmount = products.length;
    if (products.length > 0 && products.length <= 4) {
        products.forEach((product) => {
            overlayContent.appendChild(renderSearchedProductCard(product));
        });
    } else if (products.length > 4) {
        const firstFourProducts = products.slice(0, 4);
        firstFourProducts.forEach((product) => {
            overlayContent.appendChild(renderSearchedProductCard(product));
        });

        const viewAll = document.createElement("h1");
        viewAll.textContent = `View all ${productsAmount} results`;
        viewAll.className = "text-center text-sm text-custom-red cursor-pointer";
        viewAll.addEventListener("click", () => {
            console.log(products);
            localStorage.setItem("searchedProducts", JSON.stringify(products.map((product) => product.id)));
            window.location.href = "../searched-products.html";
        });
        overlayContent.appendChild(viewAll);
    } else {
        const noResults = document.createElement("div");
        noResults.textContent = "No results found.";
        overlayContent.appendChild(noResults);
    }

    overlay.classList.remove("hidden");
}

function hideOverlay() {
    overlay.classList.add("hidden");
}

function searchProducts(query) {
    let filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );

    return filteredProducts;
}

searchInput.addEventListener("input", function () {
    const query = this.value.trim();

    if (query.length > 0) {
        const searchResults = searchProducts(query);
        showOverlay(searchResults);
    } else {
        hideOverlay();
    }
});

const renderSearchedProductCard = (product) => {
    const searchedProductDiv = document.createElement("div");
    searchedProductDiv.id = "searched-product-card";
    searchedProductDiv.className =
        "flex p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer";

    const img = document.createElement("img");
    img.src = product.thumbnail;
    img.alt = product.title;
    img.className = "w-16 h-16 object-cover rounded-md";

    const productInfo = document.createElement("div");
    productInfo.className = "flex flex-col ml-4";

    const title = document.createElement("h3");
    title.textContent = product.title;
    title.className = "text-lg font-semibold";

    const description = document.createElement("p");
    description.textContent = product.description;
    description.className = "text-sm text-gray-600";

    productInfo.appendChild(title);
    productInfo.appendChild(description);

    searchedProductDiv.appendChild(img);
    searchedProductDiv.appendChild(productInfo);

    searchedProductDiv.addEventListener("click", () => {
        localStorage.setItem("currentProduct", product.id);
        window.location.href = "../product-page.html";
    });

    return searchedProductDiv;
};

document.addEventListener("scroll", (e) => {
    hideOverlay();
});

const showToast = (message, color) => {
    const toastContainer = document.getElementById("toast-container");
    toastContainer.classList.remove("hidden");
    const toastAlert = document.querySelector("#toast-alert");
    toastAlert.textContent = message;
    toastAlert.classList.remove("bg-gray-100");
    toastAlert.classList.add(color);

    setTimeout(() => {
        toastAlert.classList.remove(color);
        toastContainer.classList.add("hidden");
    }, 3000);
};

const renderProductCard = (product) => {
    const inStock = product.stock >= 1;
    const card = document.createElement("div");
    card.className =
        "card w-[20rem] bg-base-100 shadow-xl hover:bg-white hover:cursor-pointer";

    const figure = document.createElement("figure");
    figure.className = "h-[14rem] ";
    const img = document.createElement("img");
    img.className = "  h-[14rem] object-contain  self-start";
    img.src = product.thumbnail;
    img.alt = product.title;
    figure.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h2");
    title.className = "card-title";
    title.textContent = product.title;

    const price = document.createElement("p");
    price.textContent = "$" + product.price;
    price.className = "font-bold text-custom-red";

    const cardActions = document.createElement("div");
    cardActions.className = "card-actions justify-end";

    const button = document.createElement("button");
    button.className =
        "btn btn-primary mb-6 mr-4   " +
        (inStock
            ? "hover:bg-custom-red hover:text-white"
            : "hover:cursor-default");
    button.textContent = inStock ? "Add to Cart" : "Out of Stock";
    button.addEventListener("click", () => {
        if (inStock) addToCart(product);
    });

    cardActions.appendChild(button);
    cardBody.appendChild(title);
    cardBody.appendChild(price);
    card.appendChild(figure);
    card.appendChild(cardBody);
    card.appendChild(cardActions);

    cardBody.addEventListener("click", () => {
        localStorage.setItem("currentProduct", product.id);
        window.location.href = "../product-page.html";
    });

    return card;
};
const renderProducts = (divId, filter) => {
    const productsDiv = document.querySelector(`#${divId}`);
    productsDiv.replaceChildren();
    console.log(products);
    let filteredProduct = [];
    const displayProducts = [];

    if (filter === "best-selling-products") {
        filteredProduct = products.filter(
            (product) => product.stock > 0 && product.rating > 4.5
        );
    } else if ("smartphones-products") {
        filteredProduct = products.filter(
            (product) => product.stock > 0 && product.category === "smartphones"
        );
    }
    // const displayBestSelling= []
    const displaySize = filteredProduct.length > 8 ? 8 : filteredProduct.length;
    // console.log(displaySize);

    for (let i = 0; i < displaySize; i++) {
        displayProducts.push(filteredProduct[i]);
    }
    displayProducts.forEach((product) => {
        productsDiv.appendChild(renderProductCard(product));
    });
};


    async function addToCart  (product, quantity = 1) {

        const isLoggedIn = localStorage.getItem('currentUser') !== "-1";
        if (isLoggedIn) {
            let carItems = []
            const response =await  fetch(`/api/cartitems`).then(res => res.json()).then(data => carItems = data);
            carItems = carItems.filter(item => item.customer === currentUser.id);
            let inCart = carItems.find(item => item.product.id === product.id);
            if (!inCart) {
                const cartItem = {
                    productId: product.id,
                    quantity: quantity,
                    customer: currentUser.id
                }
                const addCartItemResponse = await fetch(`/api/cartitems`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cartItem)
                })
            }
            else {
                console.log(inCart.quantity, inCart.product.stock)
                if (inCart.quantity < inCart.product.stock) {
                    inCart.quantity += quantity; //todo change in api
                    const updateCartItemResponse = await fetch(`/api/cartitems/${inCart.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(inCart)
                    })
                } else {
                    showToast('Your reached max stock', 'bg-red-200');
                }
            }

        }
        else {
            let cartItemsLs = JSON.parse(localStorage.getItem('cart')) || [];
            const allProductsResponse = await fetch(`/api/products`).then(res => res.json()).then(data => {
                cartItemsLs = cartItemsLs.map(item => {
                    item.product = data.find(product => product.id === item.product.id);
                    return item;
                })
            });
            const mainProduct = products.find(prod => prod.id === product.id);
            let inCart = cartItemsLs.find(item => item.product === product.id);
            if (!inCart) {
                const cartItem = {
                    product: product.id,
                    quantity: 1
                }
                cartItemsLs.push(cartItem);
                localStorage.setItem('cart', JSON.stringify(cartItemsLs));
                showToast('Product added to cart', 'bg-green-200');
            }


            else if (inCart.quantity < mainProduct.stock) {

                inCart.quantity += quantity;

                showToast('Product added to cart', 'bg-green-200');

            } else {
                showToast('Your reached max stock', 'bg-red-200');

            }
            localStorage.setItem('cart', JSON.stringify(cartItemsLs));

        }

    }



    renderProducts("best-selling-products", "best-selling-products");
renderProducts("smartphones-products", "smartphones-products");
});
