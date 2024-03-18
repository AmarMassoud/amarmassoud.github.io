
document.addEventListener("DOMContentLoaded", () => {
    var widnowWidth = window.innerWidth;
    const smallScreen=widnowWidth < 600;
    const body=document.querySelector("body")
    body.className="px-7"


let products=[]
    products =JSON.parse( localStorage.getItem('products'));
    localStorage.setItem('currentProduct', JSON.stringify(products[0]));

    
    let currentProduct=localStorage.getItem('currentProduct');

    currentProduct=JSON.parse(currentProduct);
    document.title = currentProduct.title;
    let images=[...currentProduct.images];
    let currentImage=images[0];


    const updateProduct=(product)=>{
        currentProduct=product;
        images=[...currentProduct.images];
        currentImage=images[0];
    };

    let desiredQuanitiy=1;
    const decrementQuanitiy=()=>{
        if(desiredQuanitiy>1)
        desiredQuanitiy-=1;
        renderProductDetails();
    };
    const incrementQuanitiy=()=>{
        if(desiredQuanitiy<currentProduct.stock)
        desiredQuanitiy+=1;
        renderProductDetails();
    };


const renderProductDetails = () => {
    const productInStock=currentProduct.stock>1;

    const producDetailsDiv= document.querySelector("#product-details");
    producDetailsDiv.replaceChildren();
    producDetailsDiv.className = "w-full px-10 py-20 flex  " + (smallScreen ?"flex-col space-y-16": "flex-row justify-start space-x-32" );


    const imagesColumn=document.createElement("div")
    imagesColumn.className="flex flex-col bg-custom-gray px-[5rem] py-[2.8rem] rounded-[1.5rem] content-center min-w-[32rem]";

    const displayedImg= document.createElement("img");
    displayedImg.src=currentImage;
    displayedImg.className="object-contain h-fit ";
    

    const imageBackground=document.createElement("div");
    imageBackground.className="border-5 border-red-600 bg-white shadow-md rounded-2xl h-fit w-fit bg-center"
    

    imageBackground.appendChild(displayedImg);


    imagesDiv=document.createElement("div");
    imagesDiv.className="flex flex-row justify-center w-[32rem] mt-10";
    images.forEach((image) => {
        if(image != currentImage){
            const miniImage = document.createElement("img");
            miniImage.src = image;
            miniImage.className = "saturate-[0%] w-[4rem] h-full object-scale-down transition-all duration-[ease]  cursor-pointer hover:saturate-[100%]  hover:w-[25%] ";
            
            miniImage.addEventListener("click",()=>{
                currentImage=image;
                renderProductDetails();
            });

            imagesDiv.appendChild(miniImage);
        }
    });

    imagesColumn.appendChild(imageBackground);
    imagesColumn.appendChild(imagesDiv);


    const detailsDiv=document.createElement("div");
    detailsDiv.className="flex flex-col  space-y-[4.5rem] w-[37rem]";

    const prouctTitle=document.createElement("h2")
    prouctTitle.textContent=currentProduct.title;
    prouctTitle.className="font-light text-5xl "

    const productDescription=document.createElement("p");
    productDescription.textContent=currentProduct.description;
    productDescription.className="font-light text-2xl min-h-16 "

    // categoriesDiv=document.createElement("div");
    // categoriesDiv.className="flex flex-row gap3 "

    const category=document.createElement("a");
    category.textContent=` More from ${currentProduct.category.charAt(0).toUpperCase() +currentProduct.category.slice(1)} category`;
    category.className="badge badge-lg badge-outline text-lg px-5 py-4 rounded-xl border-0 hover:cursor-pointer bg-custom-red text-white font-bold underline self-end"
    category.addEventListener("click",()=>{
        goToCategoryPage(currentProduct);
    })

    // categoriesDiv.appendChild(category)

    const sellerInfo=document.createElement("div");
    sellerInfo.className="flex flex-row gap3 align-center "

    const profileIcon = document.createElement("div"); 
    profileIcon.id = "profile-icon";
    profileIcon.className = "flex justify-center items-center rounded-full bg-custom-red ";
    profileIcon.style.width = '1rem';
    profileIcon.style.height = '1rem';
    profileIcon.style.padding = '.9rem';
    
    const sellerIntial=document.createElement("h3");
    sellerIntial.textContent=currentProduct.seller.firstName.charAt(0);
    sellerIntial.className="text-center text-base text-white "

    const poducedBy=document.createElement("p");
    poducedBy.textContent="Produced By "+currentProduct.seller.firstName;
    poducedBy.className="font-bald ml-2  font-bold text-lg"

    profileIcon.appendChild(sellerIntial);

    sellerInfo.appendChild(profileIcon);
    sellerInfo.appendChild(poducedBy);

    const priceQuanitityDiv=document.createElement("div")
    priceQuanitityDiv.className="flex flex-col justify-between pr-5 space-y-5"

    const price=document.createElement("p");
    price.textContent="$"+currentProduct.price;
    price.className="font-bold text-3xl"


    const quantityDiv=document.createElement("div");
    quantityDiv.className="flex flex-col space-y-0"


    const quantity=document.createElement("p");
    // quantity.textContent=currentProduct.textContent=currentProduct.stock +" items left";
    quantity.textContent="Availability:";
    quantity.className=" text-xl pl-1"

    quantityDiv.appendChild(quantity);

    const containerDiv = document.createElement('div');
    containerDiv.className = 'custom-number-input h-10 w-32 ';
    
    
    const inStock=document.createElement("label");
    inStock.textContent= (productInStock?"In Stock":"Not In Stock")
    inStock.className="ml-1  font-bold text-sm " + (productInStock?"text-green-500":"text-red-500")
    
    const flexDiv = document.createElement('div');
    flexDiv.className = 'flex flex-row mt-5  h-10 w-fit rounded-lg relative bg-custom-gray mt-1 border '+ (productInStock?"":"opacity-50");
    
    const decrementButton = document.createElement('button');
    decrementButton.className =  `${(productInStock?`hover:bg-zinc-300`:`hover:cursor-default`)} h-full w-10 rounded-l `;
    decrementButton.innerHTML = `<span class="m-auto text-2xl  font-thin text-gray-600  ${(productInStock?`hover:text-black `:``)}">-</span>`;
    
    const input = document.createElement('input');
    input.type = 'counter';
    input.readOnly = true;
    input.className = ' outline-none text-center w-10 bg-white font-semibold text-md  focus:text-black md:text-base cursor-default flex items-center text-gray-700';
    input.value = (productInStock?desiredQuanitiy:"X");
    
    const incrementButton = document.createElement('button');
    incrementButton.className =  `${(productInStock?`hover:bg-zinc-300`:`hover:cursor-default`)} h-full w-10 rounded-l `;
    incrementButton.innerHTML = `<span class="m-auto text-2xl  font-thin text-gray-600  ${(productInStock?`hover:text-black`:``)}">+</span>`;
    
    decrementButton.addEventListener("click",()=>{
    decrementQuanitiy()
    }
    );
    incrementButton.addEventListener("click",()=>{
      incrementQuanitiy()  
    })

    flexDiv.appendChild(decrementButton);
    flexDiv.appendChild(input);
    flexDiv.appendChild(incrementButton);
    
    containerDiv.appendChild(inStock);
    containerDiv.appendChild(flexDiv);
    
    quantityDiv.appendChild(containerDiv);




    priceQuanitityDiv.appendChild(price);
    priceQuanitityDiv.appendChild(quantityDiv);




    const addToCartButton=document.createElement("button");
    addToCartButton.textContent=(productInStock?'Add to Cart':"Out of Stock");
    addToCartButton.className="rounded-xl  max-w-fit py-2 px-6  text-center font-bold border   " +(productInStock?'text-white bg-custom-red border-white hover:bg-red-600 hover:animate-spin  transition-all duration-[ease]  ':" border-black bg-custom-gray text-black hover:cursor-default");
    addToCartButton.addEventListener("click",()=>{if(productInStock)addToCart(currentProduct)})


    
    if(!smallScreen)detailsDiv.appendChild(category);
    detailsDiv.appendChild(prouctTitle);
    detailsDiv.appendChild(productDescription);
    detailsDiv.appendChild(priceQuanitityDiv);
    detailsDiv.appendChild(sellerInfo);
    detailsDiv.appendChild(addToCartButton);

    if(smallScreen)
    producDetailsDiv.appendChild(category);
    
    producDetailsDiv.appendChild(imagesColumn);
    
    //   const borderLine=document.createElement("div");
    //   borderLine.className="border border-solid border-custom-red  py-15 "
    //   producDetailsDiv.appendChild(borderLine);

    producDetailsDiv.appendChild(detailsDiv);
};

const renderProductCard=(product)=>{
    const inStock=product.stock>1;
    const card = document.createElement('div');
    card.className = 'card w-[20rem] bg-base-100 shadow-xl hover:bg-custom-gray hover:cursor-pointer';
    
    const figure = document.createElement('figure');
    figure.className="h-[18rem] "
    const img = document.createElement('img');
    img.className='  h-[18rem] object-contain  self-start'
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
    price.className="font-bold";
    
    const cardActions = document.createElement('div');
    cardActions.className = 'card-actions justify-end';
    
    const button = document.createElement('button');
    button.className = 'btn btn-primary mb-6 mr-4   ' +(inStock?'hover:bg-custom-red hover:text-white':"hover:cursor-default");
    button.textContent = (inStock?'Add to Cart':"Out of Stock");
    button.addEventListener("click",()=>{
        if(inStock)
        addToCart(currentProduct)})
    
    cardActions.appendChild(button);
    cardBody.appendChild(title);
    cardBody.appendChild(price);
    card.appendChild(figure);
    card.appendChild(cardBody);
    card.appendChild(cardActions);

    figure.addEventListener("click",()=>{
        updateProduct(product)
        rerenderPage();});

    return card;
}
;

const renderMoreProductsByCategory=() =>{
    const category=currentProduct.category;
    let allCategoryProducts= [...products];
    allCategoryProducts=allCategoryProducts.filter(product => product.category === category);
    let categoryProducts=[];
    
        for(let i=0; i<(smallScreen? 3 :5) ;i++){
            categoryProducts.push(allCategoryProducts[i]);
        }
  

    const moreProductsDiv=document.querySelector("#more-products");
    moreProductsDiv.replaceChildren();

    moreProductsDiv.className="flex flex-col justify-around space-y-10"

    const title= document.createElement("h1");
    title.textContent="More from this category"
    title.className="font-bold text-4xl ml-5 "

    moreProductsDiv.appendChild(title)

    const productsDiv=document.createElement("div");
    productsDiv.className="flex flex-row justify-start w-full space-x-10 "

    categoryProducts.forEach((product)=>{
        productsDiv.appendChild(renderProductCard(product));
    });

    moreProductsDiv.appendChild(productsDiv);

};

    const addToCart=(product)=>{
        //todo
    };
    const goToCategoryPage=(product)=>{
        
    };
    const rerenderPage=()=>{
        renderProductDetails();
    renderMoreProductsByCategory();
    };


    renderProductDetails();
    renderMoreProductsByCategory();

}
);

