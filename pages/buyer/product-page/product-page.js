
document.addEventListener("DOMContentLoaded", () => {
    var widnowWidth = window.innerWidth;
    const smallScreen=widnowWidth < 600;
    const body=document.querySelector("body")
    body.className="px-7"
    
// 
if (!currentProduct) {
    localStorage.setItem('currentProduct', JSON.stringify(products[0]));
    }

let products=[]
    products =JSON.parse( localStorage.getItem('products'));
    localStorage.setItem('currentProduct', JSON.stringify(products[4]));

    
    let currentProduct=localStorage.getItem('currentProduct');

    currentProduct=JSON.parse(currentProduct);
    let images=[...currentProduct.images];
    let currentImage=images[0];

    const comments=JSON.parse(localStorage.getItem('comments'));

    let submitReview=false;

    // comments.forEach(comment=>{comment.rating=Math.floor(Math.random() * 5) + 1;});
    // localStorage.setItem('comments', JSON.stringify(comments));

    const starsMaker=(rating)=>{
        const starsDiv = document.createElement("div");
        for (let i = 0; i < parseInt(rating); i++) {
            const star = document.createElement("p");
            star.textContent = "⭐";
            // star.className = "text-custom-red";
            starsDiv.appendChild(star);
        }
        for (let i = parseInt(rating); i < 5; i++) {
            const star = document.createElement("p");
            star.innerHTML = "⭐";
            star.className = "grayscale";
            starsDiv.appendChild(star);
        }
        return starsDiv;
    };

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
    document.title = currentProduct.title;
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
    imagesDiv.className="flex flex-row justify-center w-full mt-10 h-[5rem] space-x-5";
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
    category.className="badge badge-lg badge-outline text-lg px-5 py-4 rounded-xl border-0  bg-custom-red text-white font-bold underline self-end  hover:bg-red-600"
    // hover:cursor-pointer
    category.addEventListener("",()=>{
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
    addToCartButton.className="rounded-xl text-xl  max-w-fit py-2 px-6  text-center font-bold border   " +(productInStock?'text-white bg-custom-red border-white hover:bg-red-600   transition-all duration-[ease]  ':" border-black bg-custom-gray text-black hover:cursor-default");
    addToCartButton.addEventListener("click",()=>{if(productInStock)addToCart(currentProduct,quantity=desiredQuanitiy)})


    
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
    card.className = 'card w-[20rem] bg-base-100 shadow-xl hover:bg-custom-gray hover:cursor-pointer my-5  rounded-2xl  transition-all duration-300 ease-in-out';
    
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
    allCategoryProducts=allCategoryProducts.filter(product => (product.category === category && product.id !== currentProduct.id && product.stock>0));
    let categoryProducts=[];
    
    
        for(let i=0; i<(allCategoryProducts.length>=4? 4 :allCategoryProducts.length) ;i++){
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
    productsDiv.className="flex flex-row justify-start w-full space-x-10 flex-wrap "

    categoryProducts.forEach((product)=>{
        productsDiv.appendChild(renderProductCard(product));
    });

    moreProductsDiv.appendChild(productsDiv);

};

const renderCommentCard=(comment)=>{
    const cardDiv = document.createElement("div");
    cardDiv.className = "flex flex-col bg-white p-5 rounded-2xl";

    const reviewrDetailsDiv = document.createElement("div");
    reviewrDetailsDiv.className = `flex flex-row rounded-xl   items-center space-y-`;

    const userIcon = document.createElement("div"); 
    userIcon.className = "flex justify-center items-center rounded-full bg-custom-red  ";
    userIcon.style.paddingBlock = '.6rem';
    userIcon.style.paddingInline = '.9rem';

    const reviewerIntial=document.createElement("p");
    reviewerIntial.textContent=comment.user.firstName.charAt(0);
    reviewerIntial.className="text-center text-3xl text-white"

    userIcon.appendChild(reviewerIntial);


    const reviewDiv = document.createElement("div");
    reviewDiv.className = "flex flex-col rounded-xl p-5 w-full";

    starsDateDiv = document.createElement("div");
    starsDateDiv.className = "flex flex-row justify-between items-center";

    const starsDiv = starsMaker(comment.rating);
    starsDiv.className = "flex flex-row justify-start space-x-2";
    

    const date= document.createElement("p");
    date.textContent=comment.timestamp.slice(0,10);
    date.className="text-sm  text-gray-500 "

    starsDateDiv.appendChild(starsDiv);
    starsDateDiv.appendChild(date);


  
  
    const reviewerName = document.createElement("h2");
    reviewerName.textContent = comment.user.firstName + " " + comment.user.lastName;
    reviewerName.className = "font-bold text-[1.375rem]";
  

  
    reviewDiv.appendChild(starsDateDiv);
    reviewDiv.appendChild(reviewerName);
  
    reviewrDetailsDiv.appendChild(userIcon);
    reviewrDetailsDiv.appendChild(reviewDiv);


    const reviewContent = document.createElement("p");
    // reviewContent.textContent = comment.body;
    reviewContent.textContent = comment.body;
    reviewContent.className = "font-light text-lg  w-max-[4.5rem]";

    cardDiv.appendChild(reviewrDetailsDiv);
    cardDiv.appendChild(reviewContent);
    return cardDiv;
};

const renderReviewForm=()=>{
    const formDiv=document.createElement("div");
    formDiv.replaceChildren();
    formDiv.className="flex flex-col space-y-5";

    const form=document.createElement("form");
    form.className="flex flex-col space-y-5";

    const ratingDiv=document.createElement("div");
    ratingDiv.className="flex flex-row space-x-2 items-center";

    const ratingLabel=document.createElement("label");
    ratingLabel.textContent="Rating:";
    ratingLabel.className="text-lg font-bold"

    const ratingInput=document.createElement("input");
    ratingInput.type="number";
    ratingInput.min=1;
    ratingInput.max=5;
    ratingInput.className="rounded-lg border-2 border-gray-300 p-2 w-10";


    const ratingContainer = document.createElement('div');
ratingContainer.className = 'rating';

let ratingValue = 0;

function updateRating(value) {
  ratingValue = value;
}

for (let i = 1; i <= 5; i++) {
  const radioInput = document.createElement('input');
  radioInput.type = 'radio';
  radioInput.name = 'rating-2';
  radioInput.className = 'mask mask-star-2 bg-orange-400';
  
  if (i === 2) { 
    radioInput.checked = true;
    updateRating(i);
  }
  
  radioInput.addEventListener('change', (event) => {
    if (event.target.checked) {
      updateRating(i);
    }
  });

  ratingContainer.appendChild(radioInput);
}

    ratingDiv.appendChild(ratingLabel);
    ratingDiv.appendChild(ratingContainer);

    const reviewDiv=document.createElement("div");
    reviewDiv.className="flex flex-col space-y-2";

    const reviewLabel=document.createElement("label");
    reviewLabel.textContent="Review:";
    reviewLabel.className="text-lg font-bold"

    const reviewInput=document.createElement("textarea");
    reviewInput.className="rounded-lg border-2 border-gray-300 p-2 w-full h-32 max-w-[60rem]";

    reviewDiv.appendChild(reviewLabel);
    reviewDiv.appendChild(reviewInput);

    const submitButton=document.createElement("button");
    submitButton.className="btn btn-primary hover:bg-white max-w-[60rem]";
    submitButton.textContent="Submit Review";
    submitButton.addEventListener("click",()=>{
        comments.push({
            id:comments.length+1,
            productId:currentProduct.id,
            user:JSON.parse(localStorage.getItem('currentUser')),
            rating:ratingValue,
            body:reviewInput.value,
            timestamp:new Date().toISOString()
        });
        localStorage.setItem('comments', JSON.stringify(comments));
        rerenderPage();
    });

    form.appendChild(ratingDiv);
    form.appendChild(reviewDiv);
    form.appendChild(submitButton);

    formDiv.appendChild(form);

    return formDiv;
};

const renderComments=()=>{

    const commentsByProduct=comments.filter(comment=>comment.productId===currentProduct.id);
    const reviews = commentsByProduct.length
  ? commentsByProduct.reduce((acc, comment) => acc + comment.rating, 0) / commentsByProduct.length
  : 0;


    const commentsDiv=document.querySelector("#comments");
    commentsDiv.replaceChildren();

    const commentsFig=document.createElement("fieldset");
    commentsFig.className="flex flex-col space-y-1 mb-5 bg-custom-gray px-10 rounded-2xl";

    const legend=document.createElement("legend");

    const cutomerReviewsText = document.createElement("h1"); 
    cutomerReviewsText.className = " relative text-center mx-auto text-[3rem] font-bold ";
    cutomerReviewsText.textContent = "Customer Reviews";


    legend.appendChild(cutomerReviewsText);

    const detailsDiv=document.createElement("div");
    detailsDiv.className="pb-16 space-y-3";

    const basedOnText = document.createElement("p");
    basedOnText.textContent = `Based on ${commentsByProduct.length} review${commentsByProduct.length > 1 ? "s" : ""}`;
    basedOnText.className = "text-start text-lg text-gray-500 my-1 pl-2";

    const starsDiv = starsMaker(reviews);
    starsDiv.className = "flex flex-row justify-start space-x-2 text-3xl ";
    
    detailsDiv.appendChild(basedOnText);
    detailsDiv.appendChild(starsDiv);

        const reviewButton = document.createElement("button");
        reviewButton.className = "btn btn-primary mb-6 mr-4 hover:bg-white self-end ";
        reviewButton.textContent = (submitReview?"Close Review Form": "Add Review");
        reviewButton.addEventListener("click",()=>{
            submitReview=!submitReview;
            renderComments();
        });

    commentsFig.appendChild(legend);
    commentsFig.appendChild(detailsDiv);

    commentsFig.appendChild(reviewButton)
    if(submitReview){
        commentsFig.appendChild(renderReviewForm());
    }

    const commentsList=document.createElement("div");
    commentsList.className="flex flex-col space-y-4 py-4";

    commentsByProduct.forEach((comment)=>{
        commentsList.appendChild(
        renderCommentCard(comment)
        );
    });

    commentsFig.appendChild(commentsList);

    commentsDiv.appendChild(commentsFig);

};

    const addToCart=(product,quantity=1)=>{
        const cartItems=JSON.parse(localStorage.getItem('cart')) || [];
        let inCart= cartItems.find(item=>item.product.id===product.id);
        if(!inCart){
        const cartItem={
            product:product,
            quantity:quantity,
            customer:currentUser.id,
            dealId:null
        }
        cartItems.push(cartItem);
    }else{
        inCart.quantity+=quantity;
    }
        localStorage.setItem('cart',JSON.stringify(cartItems));
    };
    const goToCategoryPage=(product)=>{
        
    };
    const rerenderPage=()=>{
        submitReview=false;
        renderProductDetails();
        renderComments();
    renderMoreProductsByCategory();
    localStorage.setItem('currentProduct', JSON.stringify(currentProduct));
    };


    renderProductDetails();
    renderComments();
    renderMoreProductsByCategory();

}
);

