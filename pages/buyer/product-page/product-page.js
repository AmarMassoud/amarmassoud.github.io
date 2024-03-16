
document.addEventListener("DOMContentLoaded", () => {
    var widnowWidth = window.innerWidth;
    const smallScreen=widnowWidth > 600;


let product=[]
    product =JSON.parse( localStorage.getItem('products'));
    localStorage.setItem('currentProduct', JSON.stringify(product[0]));

    
    let currentProduct=localStorage.getItem('currentProduct');

    currentProduct=JSON.parse(currentProduct);
    document.title = currentProduct.title;

    const images=[...currentProduct.images];
    let currentImage=images[0];
    console.log(currentProduct.description);


const renderProductDetails = () => {
    const producDetailsDiv= document.querySelector("#product-details");
    producDetailsDiv.replaceChildren();
    producDetailsDiv.className = "w-full px-10 py-20 flex " + (smallScreen ? "flex-row" : "flex-col");


    const imagesColumn=document.createElement("div")
    imagesColumn.className="flex flex-col mr-20 ";

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
            miniImage.className = "saturate-[0%] w-[4.5em] h-full object-scale-down transition-all duration-[ease]  cursor-pointer rounded-xl  hover:saturate-[100%] mr-2 hover:w-[25%] shadow";
            
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
    detailsDiv.className="flex flex-col content-space-around pt-10 ";

    const prouctTitle=document.createElement("h2")
    prouctTitle.textContent=currentProduct.title;
    prouctTitle.className="font-light text-5xl mb-3"

    const productDescription=document.createElement("p");
    productDescription.textContent=currentProduct.description;
    productDescription.className="font-light text-2xl min-h-28 "

    // categoriesDiv=document.createElement("div");
    // categoriesDiv.className="flex flex-row gap3 "

    const category=document.createElement("p");
    category.textContent=currentProduct.category;
    category.className="badge badge-lg badge-outline  my-5"

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
    poducedBy.className="font-bald ml-2  font-bold"

    profileIcon.appendChild(sellerIntial);

    sellerInfo.appendChild(profileIcon);
    sellerInfo.appendChild(poducedBy);

    const addToCartButton=document.createElement("button");
    addToCartButton.textContent="Add to Cart";
    addToCartButton.className="rounded-3xl bg-red-500 flex-shrink-0 max-w-fit px-7 text-white my-20"
    addToCartButton.style.height="2rem";
    addToCartButton.addEventListener("click",addToCart(currentProduct))


    
    detailsDiv.appendChild(prouctTitle);
    detailsDiv.appendChild(productDescription);
    detailsDiv.appendChild(category);
    detailsDiv.appendChild(sellerInfo);
    detailsDiv.appendChild(addToCartButton);

    producDetailsDiv.appendChild(imagesColumn);
    producDetailsDiv.appendChild(detailsDiv);
};

    const addToCart=(product)=>{
        //todo
    };
    renderProductDetails(currentProduct);

}
);

