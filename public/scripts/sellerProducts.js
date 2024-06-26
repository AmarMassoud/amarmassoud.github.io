document.addEventListener("DOMContentLoaded", async () => {
  localStorage.removeItem("currentProduct");
  const currentUserId = JSON.parse(localStorage.getItem("currentUser"));
  const currentUserResponse = await fetch(`/api/user/${currentUserId}`);
  const currentUser = await currentUserResponse.json();
  const productsResponse = await fetch("/api/products");
  const allProducts = await productsResponse.json();
  let products = allProducts.filter(
    (product) => product.seller.id === currentUser.id
  );
  const select = document.getElementById("sellerNav");
  console.log(currentUser.firstName);
  // select.setAttribute("name",currentUser.firstName)

  const renderProduct = (product) => {
    const productDiv = document.createElement("div");
    productDiv.className =
      "grid grid-cols-10 border-b-2 border-custom-gray-500 pb-2 pt-2 gap-8 text-slate-600 -sm:grid-cols-8 -sm:me-1  ";

    const productImg = document.createElement("img");
    productImg.src = product.thumbnail || product.images[0];
    productImg.className = "max-h-16 max-w-20";
    const productName = document.createElement("p");
    productName.textContent = product.title;
    const productInfo = document.createElement("div");
    productInfo.className =
      "col-span-2 grid grid-cols-2 gap-4  -md:flex -md:flex-col -sm:col-span-1 ";
    const productPrice = document.createElement("p");
    productPrice.className = "text-center";
    productPrice.textContent = product.price + "$";

    const productStock = document.createElement("p");
    productStock.className = "text-center";

    productStock.textContent = product.stock;

    const productEarnings = document.createElement("p");
    productEarnings.textContent = product.price * product.stock + "$";
    productEarnings.className = "text-center";

    // needs update
    const productSales = document.createElement("p");
    productSales.textContent = product.stock + "$";
    productSales.className = "text-center";

    // needs update

    const productCategory = document.createElement("p");
    productCategory.textContent = product.category;
    productCategory.className = "text-center";

    const productRating = document.createElement("p");
    productRating.textContent = product.rating;
    productRating.className = "text-center";

    const productActions = document.createElement("div");
    productActions.className =
      "col-span-2 flex justify-center items-center -sm:col-span-1 -sm:flex-col -sm:gap-2 -sm:justify-start";

    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const editIcon = document.createElement("i");
    editButton.className = "mx-3 hover:scale-110";
    const deleteIcon = document.createElement("i");
    deleteButton.className = "hover:scale-110";
    editIcon.className = "fa-solid fa-pen";
    deleteIcon.className = "fa-solid fa-trash  text-red-500";
    editButton.appendChild(editIcon);
    deleteButton.appendChild(deleteIcon);
    productActions.appendChild(editButton);
    productActions.appendChild(deleteButton);

    productInfo.appendChild(productImg);
    productInfo.appendChild(productName);
    productDiv.appendChild(productInfo);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(productStock);
    productDiv.appendChild(productEarnings);
    productDiv.appendChild(productSales);
    productDiv.appendChild(productCategory);
    productDiv.appendChild(productRating);
    productDiv.appendChild(productActions);

    deleteButton.addEventListener("click", () => {
      deleteProduct(product.id);
      renderProducts();
    });
    editButton.addEventListener("click", () => {
      localStorage.setItem("currentProduct", JSON.stringify(product.id));
      window.location.href = "./addProduct.html";
    });

    return productDiv;
  };

  const deleteProduct = (id) => {
    const deleteProductResponse = fetch(`/api/products/${id}`, {
        method: "DELETE",
        });
    window.location.reload();


    renderProducts();
  };

  const renderProducts = () => {
    const productsDiv = document.querySelector("#products-table");
    productsDiv.replaceChildren();
    products.forEach((product) =>
      productsDiv.appendChild(renderProduct(product))
    );
  };
  const originalProducts = products.slice();

  const handleSearch = (event) => {
    const inputValue = event.target.value.toLowerCase();
    if (inputValue === "") {
      products = originalProducts.slice();
    } else {
      products = originalProducts.filter((product) =>
        product.title.toLowerCase().includes(inputValue)
      );
    }
    renderProducts();
  };

  const searchField = document.getElementById("search");
  searchField.addEventListener("input", handleSearch);
  searchField.addEventListener("change", handleSearch);

  let sortDirection = {};

  const parentElement = document.getElementById("products-header");

  parentElement.addEventListener("click", function (event) {
    console.log("Paragraph clicked:", event.target.textContent);

    document
      .querySelector("#earnings-header")
      .classList.remove("bg-custom-red", "text-white");
    document
      .querySelector("#stock-header")
      .classList.remove("bg-custom-red", "text-white");
    document
      .querySelector("#price-header")
      .classList.remove("bg-custom-red", "text-white");
    document
      .querySelector("#sales-header")
      .classList.remove("bg-custom-red", "text-white");
    document
      .querySelector("#category-header")
      .classList.remove("bg-custom-red", "text-white");
    document
      .querySelector("#rating-header")
      .classList.remove("bg-custom-red", "text-white");
    document
      .querySelector("#product-header")
      .classList.remove("bg-custom-red", "text-white");

    const headerText = event.target.textContent.trim().toLowerCase();
    let direction = 1;

    if (sortDirection[headerText] === 1) {
      direction = -1;
    }
    sortDirection[headerText] = direction;

    if (headerText === "price") {
      products.sort((a, b) => direction * (a.price - b.price));
      document
        .querySelector("#price-header")
        .classList.add("bg-custom-red", "text-white");
    } else if (headerText === "stock") {
      products.sort((a, b) => direction * (a.stock - b.stock));
      document
        .querySelector("#stock-header")
        .classList.add("bg-custom-red", "text-white");
    } else if (headerText === "earnings") {
      products.sort(
        (a, b) => direction * (a.price * a.stock - b.price * b.stock)
      );
      document
        .querySelector("#earnings-header")
        .classList.add("bg-custom-red", "text-white");
    } else if (headerText === "sales") {
      products.sort((a, b) => direction * (a.stock - b.stock));
      document
        .querySelector("#sales-header")
        .classList.add("bg-custom-red", "text-white");
    } else if (headerText === "category") {
      products.sort((a, b) => direction * a.category.localeCompare(b.category));
      document
        .querySelector("#category-header")
        .classList.add("bg-custom-red", "text-white");
    } else if (headerText === "rating") {
      document
        .querySelector("#rating-header")
        .classList.add("bg-custom-red", "text-white");

      products.sort((a, b) => direction * (a.rating - b.rating));
    } else if (headerText === "product") {
      products.sort((a, b) => direction * a.title.localeCompare(b.title));
      document
        .querySelector("#product-header")
        .classList.add("bg-custom-red", "text-white");
    }

    renderProducts();
  });
  renderProducts();
});
