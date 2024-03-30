document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { firstName: "Guest", id: -1 };
    document.querySelector("#nav").textContent = currentUser.firstName.charAt(0);

    var searchedProducts = JSON.parse(localStorage.getItem('searchedProducts')) || JSON.parse(localStorage.getItem('products'));
    document.querySelector("#sort-products").textContent = "Products ("+searchedProducts.length+")";








    var productsContainer = document.querySelector('#products');


    renderProducts(searchedProducts);



document.querySelector("#search").addEventListener("input",()=>{
    const products = JSON.parse(localStorage.getItem("products"))
    const selectedProducts = products.filter(product=>product.title.toLowerCase().includes(document.querySelector("#search").value.toLowerCase()));
    document.querySelector("#sort-products").textContent = "Products ("+selectedProducts.length+")";
    localStorage.setItem('searchedProducts',JSON.stringify(selectedProducts));
    renderProducts(selectedProducts);


 });



 const priceSliderContainer = document.createElement('div');
 priceSliderContainer.className = "price-slider flex justify-between items-center flex-col bg-gray-300 p-4 shadow-xl rounded-lg mb-4 w-full";
 


 const priceLabel = document.createElement('label');
    priceLabel.textContent = 'Price Range';
    priceLabel.className = "text-gray-600 mb-2 text-2xl";
    priceSliderContainer.appendChild(priceLabel);


const minPriceLabel = document.createElement('label');
    minPriceLabel.textContent = 'Min Price:';
    minPriceLabel.classList.add('text-gray-600');
    priceSliderContainer.appendChild(minPriceLabel);
 const minPriceInput = document.createElement('input');
 minPriceInput.setAttribute('type', 'range');
 minPriceInput.setAttribute('id', 'minPrice');
 minPriceInput.setAttribute('min', '0');
 minPriceInput.setAttribute('max', '5000');
 minPriceInput.setAttribute('value', '0');
 minPriceInput.classList.add('w-full', 'mr-2');
 minPriceInput.addEventListener('input', () => updateValue('min'));
 
 const minValueSpan = document.createElement('span');
 minValueSpan.setAttribute('id', 'minValue');
 minValueSpan.classList.add('text-gray-600');
 minValueSpan.textContent = '0';
 

 const maxPriceLabel = document.createElement('label');
    maxPriceLabel.textContent = 'Max Price:';
    maxPriceLabel.classList.add('text-gray-600');
    

 const maxPriceInput = document.createElement('input');
 maxPriceInput.setAttribute('type', 'range');
 maxPriceInput.setAttribute('id', 'maxPrice');
 maxPriceInput.setAttribute('min', '0');
 maxPriceInput.setAttribute('max', '5000');
 maxPriceInput.setAttribute('value', '5000');
 maxPriceInput.classList.add('w-full', 'ml-2');
 maxPriceInput.addEventListener('input', () => updateValue('max'));
 
 const maxValueSpan = document.createElement('span');
 maxValueSpan.setAttribute('id', 'maxValue');
 maxValueSpan.classList.add('text-gray-600');
 maxValueSpan.textContent = '5000';
 
 priceSliderContainer.appendChild(minPriceInput);
 priceSliderContainer.appendChild(minValueSpan);
 priceSliderContainer.appendChild(maxPriceLabel);

 priceSliderContainer.appendChild(maxPriceInput);
 priceSliderContainer.appendChild(maxValueSpan);
 

 document.querySelector("#filters").appendChild(priceSliderContainer);
 
function updateValue(type) {
    const minPriceInput = document.querySelector('#minPrice');
    const maxPriceInput = document.querySelector('#maxPrice');
    const minValueSpan = document.querySelector('#minValue');
    const maxValueSpan = document.querySelector('#maxValue');

    let min = parseInt(minPriceInput.value);
    let max = parseInt(maxPriceInput.value);

    if (min > max) {
        if (type === 'min') {
            min = max;
            minPriceInput.value = max;
        } else {
            max = min;
            maxPriceInput.value = min;
        }
    }

    minValueSpan.textContent = min;
    maxValueSpan.textContent = max;
}

document.querySelector('#minPrice').addEventListener('input', (event) => {
    console.log(event.target)
    const value = parseInt(document.querySelector('#minPrice').value);
    const max = parseInt(document.querySelector('#maxPrice').value);
    const products = JSON.parse(localStorage.getItem('products'));
    console.log(products)
    products.forEach(product => console.log(product.price));
    console.log("max:", max)
    console.log("min", value)

    const selectedProducts = products.filter((product) => parseInt(product.price) <= max && parseInt(product.price) >= value);
    console.log(selectedProducts)
        localStorage.setItem('searchedProducts', JSON.stringify(selectedProducts));
        document.querySelector("#sort-products").textContent = "Products ("+selectedProducts.length+")";
        renderProducts(selectedProducts);

    if (!isNaN(value) && value <= max) {

        document.querySelector('#minPrice').value = value;
        
        updateValue('min');
    }
});

document.querySelector('#maxPrice').addEventListener('input', () => {
    const value = document.querySelector('#maxPrice').value;
    const min = parseInt(document.querySelector('#minPrice').value);
    const selectedProducts = JSON.parse(localStorage.getItem('products')).filter(product => product.price >= min && product.price <= value);
    localStorage.setItem('searchedProducts', JSON.stringify(selectedProducts));
    document.querySelector("#sort-products").textContent = "Products ("+selectedProducts.length+")";
    renderProducts(selectedProducts);
    if (!isNaN(value) && value >= min) {
        document.querySelector('#maxPrice').value = value;

      
        updateValue('max');
    }
});

const renderCategory = (category) => { 
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'flex items-center justify-between w-full mb-2';

    const categoryLabel = document.createElement('label');
    categoryLabel.textContent = category;
    categoryLabel.className = 'text-gray-600';

    const categoryCheckbox = document.createElement('input');
    categoryCheckbox.setAttribute('type', 'checkbox');
    categoryCheckbox.setAttribute('id', category);

    categoryCheckbox.addEventListener('change', () => {
        const products = JSON.parse(localStorage.getItem('products'));
        const selectedCategories = categories.filter(category => document.querySelector(`#${category}`).checked);
        const selectedProducts = products.filter(product => selectedCategories.includes(product.category));
        localStorage.setItem('searchedProducts', JSON.stringify(selectedProducts));
        document.querySelector("#sort-products").textContent = "Products ("+selectedProducts.length+")";

        renderProducts(selectedProducts);

        console.log(JSON.parse(localStorage.getItem('searchedProducts')).length);
        if(JSON.parse(localStorage.getItem('searchedProducts')).length===0){
            const products = JSON.parse(localStorage.getItem('products'));
            localStorage.setItem('searchedProducts', JSON.stringify(products));
            document.querySelector("#sort-products").textContent = "Products ("+products.length+")";
            renderProducts(products);

        
        }




        

    });

    categoryDiv.appendChild(categoryLabel);
    categoryDiv.appendChild(categoryCheckbox);

    return categoryDiv;



}

const categoryContainer = document.createElement('div');
categoryContainer.className = "price-slider flex justify-between items-center flex-col bg-gray-300 p-4 shadow-xl rounded-lg mb-4 w-full";
categoryContainer.id = "categories"


const categoryLabel = document.createElement('label');
categoryLabel.textContent = 'Category';
categoryLabel.className = "text-gray-600 mb-2 text-2xl";
categoryContainer.appendChild(categoryLabel);
document.querySelector("#filters").appendChild(categoryContainer);


const products = JSON.parse(localStorage.getItem('searchedProducts'))|| JSON.parse(localStorage.getItem('products'));
let categories = products.map(product => product.category);
categories = [...new Set(categories)];
categories.forEach(category => {
    document.querySelector("#categories").appendChild(renderCategory(category));

});




document.querySelector("#title").addEventListener("click",()=>{
    const products = JSON.parse(localStorage.getItem("searchedProducts"))
    const selectedProducts = products.sort((a,b)=>a.title.localeCompare(b.title));
    localStorage.setItem('searchedProducts',JSON.stringify(selectedProducts));
    document.querySelector("#sort-products").textContent = "Products ("+selectedProducts.length+")";
    renderProducts(selectedProducts);
    document.querySelector("#sort-by").textContent = "Title: A-Z";


});

document.querySelector("#title-reverse").addEventListener("click",()=>{
    const products = JSON.parse(localStorage.getItem("searchedProducts"))
    const selectedProducts = products.sort((a,b)=>b.title.localeCompare(a.title));
    localStorage.setItem('searchedProducts',JSON.stringify(selectedProducts));
    document.querySelector("#sort-products").textContent = "Products ("+selectedProducts.length+")";
    renderProducts(selectedProducts);
    document.querySelector("#sort-by").textContent = "Title: Z-A";

});

document.querySelector("#price").addEventListener("click",()=>{
    const products = JSON.parse(localStorage.getItem("searchedProducts"))
    const selectedProducts = products.sort((a,b)=>b.price-a.price);
    localStorage.setItem('searchedProducts',JSON.stringify(selectedProducts));
    document.querySelector("#sort-products").textContent = "Products ("+selectedProducts.length+")";
    renderProducts(selectedProducts);
    document.querySelector("#sort-by").textContent = "Price: High to low";

});

document.querySelector("#price-reverse").addEventListener("click",()=>{
    const products = JSON.parse(localStorage.getItem("searchedProducts"))
    const selectedProducts = products.sort((a,b)=>a.price-b.price);
    localStorage.setItem('searchedProducts',JSON.stringify(selectedProducts));
    document.querySelector("#sort-products").textContent = "Products ("+selectedProducts.length+")";
    renderProducts(selectedProducts);

    document.querySelector("#sort-by").textContent = "Price: Low to high";

});

document.querySelector("#rating").addEventListener("click",()=>{
    const products = JSON.parse(localStorage.getItem("searchedProducts"))
    const selectedProducts = products.sort((a,b)=>b.rating-a.rating);
    localStorage.setItem('searchedProducts',JSON.stringify(selectedProducts));
    document.querySelector("#sort-products").textContent = "Products ("+selectedProducts.length+")";
    renderProducts(selectedProducts);
    document.querySelector("#sort-by").textContent = "Rating: High to low";
});

document.querySelector("#rating-reverse").addEventListener("click",()=>{
    const products = JSON.parse(localStorage.getItem("searchedProducts"))
    const selectedProducts = products.sort((a,b)=>a.rating-b.rating);
    localStorage.setItem('searchedProducts',JSON.stringify(selectedProducts));
    document.querySelector("#sort-products").textContent = "Products ("+selectedProducts.length+")";
    renderProducts(selectedProducts);
    document.querySelector("#sort-by").textContent = "Rating: Low to high";
});







    
});


const addToCart=(product)=>{
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { firstName: "Guest", id: -1 };

    const cartItems=JSON.parse(localStorage.getItem('cart')) || [];
    let inCart= cartItems.find(item=>item.product.id===product.id);
    console.log(product.id)
    console.log(inCart)
    if(!inCart){
    const cartItem={
        product:product,
        quantity:1,
        customer:currentUser.id,
        dealId:null

    
    }
    cartItems.push(cartItem);
 showToast('Product added to cart','bg-green-200');
}else{
    inCart.quantity++;
    showToast('Product added to cart','bg-green-200');

}
    localStorage.setItem('cart',JSON.stringify(cartItems));

}
const showToast=(message, color)=>{
    const toastContainer = document.getElementById('toast-container');
    toastContainer.classList.remove('hidden');
    const toastAlert= document.querySelector('#toast-alert');
    toastAlert.textContent=message;
    toastAlert.classList.remove('bg-gray-100');
    toastAlert.classList.add(color);

    setTimeout(() => {
      toastContainer.classList.add('hidden');
    }, 3000);
}


const renderProducts = (products) => {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    if(products.length!==0)
    products.forEach(product => {
        productsContainer.appendChild(renderProductCard(product));
    });
    else {
        const noProducts = document.createElement('h2');
        noProducts.textContent = "No products found";
        noProducts.className = "text-2xl text-gray-600";
        productsContainer.appendChild(noProducts);
    
    }
}
const renderProductCard=(product)=>{
    const inStock=product.stock>1;
    const card = document.createElement('div');
    card.className = 'card w-[20rem] bg-base-100 shadow-xl hover:bg-white hover:cursor-pointer';
    
    const figure = document.createElement('figure');
    figure.className="h-[14rem] "
    const img = document.createElement('img');
    img.className='  h-[14rem] object-contain  self-start'
    img.src = product.thumbnail; 
    img.alt = product.title;
    figure.appendChild(img);
    
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    
    const title = document.createElement('h2');
    title.className = 'card-title';
    title.textContent = product.title;
    
    const price = document.createElement('p');
    price.textContent = '$'+product.price;
    price.className="font-bold text-custom-red";
    
    const cardActions = document.createElement('div');
    cardActions.className = 'card-actions justify-end';
    
    const button = document.createElement('button');
    button.className = 'btn btn-primary mb-6 mr-4   ' +(inStock?'hover:bg-custom-red hover:text-white':"hover:cursor-default");
    button.textContent = (inStock?'Add to Cart':"Out of Stock");
    button.addEventListener("click",()=>{
        if(inStock)
        
        addToCart(product)})
    
    cardActions.appendChild(button);
    cardBody.appendChild(title);
    cardBody.appendChild(price);
    card.appendChild(figure);
    card.appendChild(cardBody);
    card.appendChild(cardActions);

    cardBody.addEventListener("click",()=>{
        localStorage.setItem('currentProduct',JSON.stringify(product));
        window.location.href = '/pages/buyer/product-page/product-page.html';
        console.log("test")
    
    });
    img.addEventListener("click",()=>{
        localStorage.setItem('currentProduct',JSON.stringify(product));
        window.location.href = '/pages/buyer/product-page/product-page.html';
        console.log("test")
    
    });

    return card;
}
;