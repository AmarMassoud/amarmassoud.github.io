
document.addEventListener("DOMContentLoaded", () => {
    var widnowWidth = window.innerWidth;
    const smallScreen=widnowWidth > 600;
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


const renderProductDetails = () => {
    

    const producDetailsDiv= document.querySelector("#product-details");
    producDetailsDiv.replaceChildren();
    producDetailsDiv.className = "w-full px-10 py-20 flex " + (smallScreen ? "flex-row justify-around" : "flex-col");


    const imagesColumn=document.createElement("div")
    imagesColumn.className="flex flex-col mr-20 bg-custom-gray px-20 py-[2.8rem] rounded-[1.5rem]";

    const displayedImg= document.createElement("img");
    displayedImg.src=currentImage;
    displayedImg.className="object-contain h-96 ";
    

    const imageBackground=document.createElement("div");
    imageBackground.className="border-5 border-red-600 bg-white shadow-md rounded-2xl h-96 w-96 bg-center"
    

    imageBackground.appendChild(displayedImg);


    imagesDiv=document.createElement("div");
    imagesDiv.className="flex flex-row place-content-center w-96 ";
    images.forEach((image) => {
        if(image != currentImage){
            const miniImage = document.createElement("img");
            miniImage.src = image;
            miniImage.className = "saturate-[0%] w-[4.5em] h-full object-scale-down transition-all duration-[ease]  cursor-pointer rounded-xl  hover:saturate-[100%] mr-2 hover:w-[25%] m-10";
            
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
    detailsDiv.className="flex flex-col  pt-10 space-y-12 ";

    const prouctTitle=document.createElement("h2")
    prouctTitle.textContent=currentProduct.title;
    prouctTitle.className="font-light text-5xl "

    const productDescription=document.createElement("p");
    productDescription.textContent=currentProduct.description;
    productDescription.className="font-light text-2xl min-h-20 "

    // categoriesDiv=document.createElement("div");
    // categoriesDiv.className="flex flex-row gap3 "

    const category=document.createElement("p");
    category.textContent=currentProduct.category;
    category.className="badge badge-lg badge-outline   text-lg px-5 py-4 "

    // categoriesDiv.appendChild(category)

    const sellerInfo=document.createElement("div");
    sellerInfo.className="flex flex-row gap3 align-center "

    const profileIcon = document.createElement("div"); // Assuming it's a div
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
    priceQuanitityDiv.className="flex flex-row justify-between pr-5   "

    const price=document.createElement("p");
    price.textContent="$"+currentProduct.price;
    price.className="font-bold text-3xl"


    const quantityDiv=document.createElement("div");


    const quantity=document.createElement("p");
    quantity.textContent=currentProduct.textContent=currentProduct.stock +" items left";
    quantity.className="font-bold text-lg underline"

    quantityDiv.appendChild(quantity);

    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown dropdown-hover my-1 ';
    
    const button = document.createElement('div');
    button.setAttribute('tabindex', '0');
    button.setAttribute('role', 'button');
    button.className = 'btn m-1';
    button.textContent = desiredQuanitiy;
    button.className="btn flex flex-row font-bold justify-between w-[6rem]"


    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    
    // Step 2: Set attributes for the SVG
    svg.setAttributeNS(null, "width", "24");
    svg.setAttributeNS(null, "height", "24");
    svg.setAttributeNS(null, "viewBox", "0 0 24 24");
    svg.setAttributeNS(null, "fill", "none");
    svg.setAttributeNS(null, "stroke", "currentColor");
    svg.setAttributeNS(null, "stroke-width", "2");
    svg.setAttributeNS(null, "stroke-linecap", "round");
    svg.setAttributeNS(null, "stroke-linejoin", "round");
    svg.setAttribute("class", "icon icon-tabler icons-tabler-outline icon-tabler-arrow-down");
    
    // Path 1
    const path1 = document.createElementNS(svgNS, "path");
    path1.setAttributeNS(null, "stroke", "none");
    path1.setAttributeNS(null, "d", "M0 0h24v24H0z");
    path1.setAttributeNS(null, "fill", "none");
    
    // Path 2
    const path2 = document.createElementNS(svgNS, "path");
    path2.setAttributeNS(null, "d", "M12 5l0 14");
    
    // Path 3
    const path3 = document.createElementNS(svgNS, "path");
    path3.setAttributeNS(null, "d", "M18 13l-6 6");
    
    // Path 4
    const path4 = document.createElementNS(svgNS, "path");
    path4.setAttributeNS(null, "d", "M6 13l6 6");
    
    // Step 3: Append child elements to the SVG
    svg.appendChild(path1);
    svg.appendChild(path2);
    svg.appendChild(path3);
    svg.appendChild(path4);
    
    button.appendChild(svg)
    
    dropdown.appendChild(button);
    
    const dropdownContent = document.createElement('ul');
    dropdownContent.setAttribute('tabindex', '0');
    dropdownContent.className = 'dropdown-content z-[1] menu bg-custom-gray rounded-box w-[6rem] ';
    dropdown.appendChild(dropdownContent);

    arrayRange=Array(currentProduct.stock).keys()
    arrayRange.forEach(itemText => {
        itemText+=1
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = itemText;
        li.appendChild(a);
        li.addEventListener("click",()=>{
            desiredQuanitiy = itemText;
            renderProductDetails();
            console.log(desiredQuanitiy)
        });
        li.className="font-bold w-fit"
        dropdownContent.appendChild(li);
      });

      quantityDiv.appendChild(dropdown);


    priceQuanitityDiv.appendChild(price);
    priceQuanitityDiv.appendChild(quantityDiv);




    const addToCartButton=document.createElement("button");
    addToCartButton.textContent="Add to Cart";
    addToCartButton.className="rounded-xl bg-custom-red max-w-fit py-2 px-6 text-white text-center font-bold"
    addToCartButton.addEventListener("click",addToCart(currentProduct))


    
    detailsDiv.appendChild(prouctTitle);
    detailsDiv.appendChild(productDescription);
    detailsDiv.appendChild(category);
    detailsDiv.appendChild(priceQuanitityDiv);
    detailsDiv.appendChild(sellerInfo);
    detailsDiv.appendChild(addToCartButton);

    producDetailsDiv.appendChild(imagesColumn);
    
    //   const borderLine=document.createElement("div");
    //   borderLine.className="border border-solid border-custom-red  py-15 "
    //   producDetailsDiv.appendChild(borderLine);

    producDetailsDiv.appendChild(detailsDiv);
};

const renderProductCard=(product)=>{
    const card = document.createElement('div');
    card.className = 'card w-[20rem] bg-base-100 shadow-xl';
    
    const figure = document.createElement('figure');
    const img = document.createElement('img');
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
    button.className = 'btn btn-primary';
    button.textContent = 'Add to Cart';
    button.addEventListener("click",addToCart(currentProduct))
    
    cardActions.appendChild(button);
    cardBody.appendChild(title);
    cardBody.appendChild(price);
    cardBody.appendChild(cardActions);
    card.appendChild(figure);
    card.appendChild(cardBody);

    card.addEventListener("click",()=>{
        updateProduct(product)
        renderProductDetails();
    renderMoreProductsByCategory();});

    return card;
}
;

const renderMoreProductsByCategory=() =>{
    const category=currentProduct.category;
    let allCategoryProducts= [...products];
    allCategoryProducts=allCategoryProducts.filter(product => product.category === category);
    let categoryProducts=[];
    
        for(let i=0; i<3 ;i++){
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
    productsDiv.className="flex flex-row justify-around w-full "

    categoryProducts.forEach((product)=>{
        productsDiv.appendChild(renderProductCard(product));
    });

    moreProductsDiv.appendChild(productsDiv);

};

    const addToCart=(product)=>{
        //todo
    };
    renderProductDetails();
    renderMoreProductsByCategory();

}
);

