document.addEventListener("DOMContentLoaded", async() => {

let products = [];
const getProducts = async () => {
const productsData = localStorage.getItem('products');
        if (!productsData) {
            const response = await fetch('/data/products.json');
  
            if (response.ok) {
                const responseData = await response.json();
                if (Array.isArray(responseData)) {
                    localStorage.setItem('products', JSON.stringify(responseData));
                    products = responseData;
                    // console.log('products data:', users);
                } else {
                    console.error('Invalid products data format:', responseData);
                }
            } else {
                console.error('Failed to fetch products data');
            }
        } else {
            products = JSON.parse(productsData);
            console.log('products data:', products);
        }}


        
products=JSON.parse(localStorage.getItem('products'));

if(products.length===0){
    await getProducts();
    products=JSON.parse(localStorage.getItem('products'));

}


let currentProduct=JSON.parse(localStorage.getItem('currentProduct'));
let currentUser=JSON.parse(localStorage.getItem('currentUser'));

if(currentUser===null){
    currentUser={firstName: "Guest" , id:-1};
    localStorage.setItem('currentUser',JSON.stringify(currentUser));
}
const navbar = document.querySelector('#nav');
navbar.textContent=currentUser? currentUser.firstName.charAt(0):"U";
navbar.setAttribute('name',currentUser? currentUser.firstName:"User");

let cart = JSON.parse(localStorage.getItem('cart')) || [];



// const renderSearchedProducts=()=>{
// const searchText= document.querySelector('#search');
// const searchedProducts=products.filter(product=>product.title.toLowerCase().includes(searchText.value.toLowerCase()));
// const searchDropDown= document.querySelector('#search-dropdown');
// const select= document.createElement('select');
// select.className='absolute top-full left-0 w-full border border-gray-300 bg-white rounded-b-md px-4 py-2'
// searchDropDown.replaceChildren();
// console.log(searchedProducts)
// searchedProducts.forEach(product=>{
//     const option=document.createElement('option');
//     option.textContent=product.title;
//     select.appendChild(option);

// })
// searchDropDown.appendChild(select);

// searchText.addEventListener('change',()=>{
// renderSearchedProducts();
// })


// }
// renderSearchedProducts();



{/* <div class="toast">
        <div class="alert alert-info bg-green-200">
          <span>New message arrived.</span>
        </div>
      </div> */}

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



    const renderProductCard=(product)=>{
        const inStock=product.stock>1;
        const card = document.createElement('div');
        card.className = 'card w-[20rem] bg-base-100 shadow-xl hover:bg-white hover:cursor-pointer';
        
        const figure = document.createElement('figure');
        figure.className="h-[14rem] "
        const img = document.createElement('img');
        img.className='  h-[14rem] object-contain  self-start'
        img.src = product.images[0]; 
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

        
        });
    
        return card;
    }
    ;

const renderProducts=(divId, filter)=>{

    const productsDiv = document.querySelector(`#${divId}`);
    productsDiv.replaceChildren();
    console.log(products)
    let filteredProduct=[]
    const displayProducts= []

    if(filter==='best-selling-products'){
         filteredProduct=products.filter(product=>product.stock>0 && product.rating>4.5);   
    }else if('smartphones-products'){
        filteredProduct=products.filter(product=>product.stock>0 && product.category==='smartphones');
    }
    // const displayBestSelling= []
    const displaySize= filteredProduct.length>8?8:filteredProduct.length;
        // console.log(displaySize);

    for (let i = 0; i < displaySize; i++) {
        displayProducts.push(filteredProduct[i]);
    
    }
    displayProducts.forEach((product) => {
        productsDiv.appendChild(renderProductCard(product));
    });
}


const addToCart=(product)=>{

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

renderProducts('best-selling-products','best-selling-products');
renderProducts('smartphones-products','smartphones-products');


});
