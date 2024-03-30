document.addEventListener("DOMContentLoaded", async () => {

    const smallScreen=window.innerWidth < 600;
    
    const purchasedItems = JSON.parse(localStorage.getItem("purchasedItems")) || [];

    const currnetUser = JSON.parse(localStorage.getItem("currentUser")) || {};

    const body=document.querySelector("body")
    body.className="px-7"
  
    let selectedCartItem={}

    const renderRefundPopUp = (purchase) => {
        
        const refundPopUpDiv = document.querySelector('#refund-pop-up');
        refundPopUpDiv.replaceChildren();

        const refundPopUp = document.createElement('dialog');
        refundPopUpDiv.appendChild(refundPopUp);
    
        refundPopUp.className = 'self-center justify-self-center modal bg-white rounded-lg p-4 flex flex-col  p-6 max-w-[50rem] max-h-[800px] overflow-y-scroll';
        refundPopUp.replaceChildren();

        const closeButton = document.createElement('button');
        closeButton.className = 'text-custom-red float-right self-end hover:text-red-700';
        closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" 
        stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/>
        <path d="m6 6 12 12"/></svg>`;
        
        refundPopUp.showModal();

        const closePopUp = () => {
            refundPopUp.close();
            selectedCartItem={}
        };
        closeButton.addEventListener('click', closePopUp);

        const title = document.createElement('h1');
        title.className = 'text-2xl font-bold self-start';
        title.textContent = 'Select Item:';


        const redStar=document.createElement("span");
        redStar.textContent="*";
        redStar.className="text-custom-red";

        title.appendChild(redStar);


        const cartItemsDiv=document.createElement("div");
        // Adding a max height and vertical overflow auto for vertical scrolling
    cartItemsDiv.className="flex flex-row  overflow-x-scroll   px-5 max-w-[42rem] min-h-52";

        const cartItems=purchase.deals.flatMap((deal)=>deal.items);
        cartItems.forEach((cartItem) => {
            const proudct=cartItem.product;

            const card = document.createElement("div");
            card.className = `
  border-2
  border-custom-gray
  mx-2
  min-w-52 h-52 bg-white 
  flex flex-col space-y-2
  cursor-pointer 
  opacity-70 
  hover:opacity-100
  hover:bg-custom-gray 
  rounded-lg shadow-md 
  justify-center items-center `+(selectedCartItem===cartItem ? " border-custom-red " : "");

            
            const image = document.createElement("img");
            image.src = proudct.images[0];
            image.className = "object-scale-down w-[7rem] h-[7rem]";


            const details = document.createElement("p");
            details.className = "text-sm font-bold text-center";
            details.textContent = `${proudct.title} x ${cartItem.quantity}`;



            card.appendChild(image);
            card.appendChild(details);

            card.addEventListener("click",()=>{
                selectedCartItem=cartItem;
                renderRefundPopUp(purchase);
                
            });

            cartItemsDiv.appendChild(card);
        });





        const detailsDiv=document.createElement("div");
        detailsDiv.className="flex flex-col space-y-2 w-full items-start my-6 ";

        const orderDate=document.createElement("p");
        orderDate.className="text-sm";
        orderDate.textContent="Order Date:"

        const dateValue = document.createElement("span");
        dateValue.className = "text-sm font-bold";
        dateValue.textContent = purchase.timeStamp.split("T")[0];

        orderDate.appendChild(dateValue);
    
        const quantityPriceDiv = document.createElement("div");
        quantityPriceDiv.className="flex flex-row space-x-2 ";

        const quantity = document.createElement("p");
        quantity.className = "text-sm";
        quantity.textContent = "Quantity: ";

        const quantityValue = document.createElement("span");
        quantityValue.className = "text-sm font-bold";
        quantityValue.textContent = selectedCartItem.quantity||"N/A";

        quantity.appendChild(quantityValue);

        const price = document.createElement("p");
        price.className = "text-sm";
        price.textContent = "Price: ";

        const priceValue = document.createElement("span");
        priceValue.className = "text-sm font-bold";
        console
        const selectedItemPrice=selectedCartItem.quantity * selectedCartItem.product?.price;
        priceValue.textContent = (selectedItemPrice)?`$${selectedItemPrice}`:"N/A";

        price.appendChild(priceValue);

        quantityPriceDiv.appendChild(quantity);
        quantityPriceDiv.appendChild(price);

        detailsDiv.appendChild(orderDate);
        detailsDiv.appendChild(quantityPriceDiv);

        const selectReasonDiv=document.createElement("div");
        selectReasonDiv.className="flex flex-col space-y-2 w-full items-start my-3 ";

        const selectReason=document.createElement("p");
        selectReason.className="text-l font-bold";
        selectReason.textContent="Select Reason for Refund:"
        selectReason.appendChild(redStar.cloneNode(true));

        const selectReasonOptions=document.createElement("select");
        selectReasonOptions.id="refund-reason";
        selectReasonOptions.className="select select-bordered w-full bg-custom-gray text-black";


        const option1=document.createElement("option");
        option1.value="Damaged";
        option1.textContent="Damaged";
        option1.selected=true;

        selectReasonOptions.appendChild(option1);

        const refundReasons = [
            "The item does not match the description.",
            "The item is defective or damaged upon arrival.",
            "The size or color of the item is incorrect.",
            "I received the wrong item.",
            "I found the same item at a lower price elsewhere.",
            "The item requires additional parts or accessories that were not included.",
            "I was charged incorrectly for the item.",
            "The software or digital product did not work as advertised.",
            "There are missing parts or components.",
            "The product does not work with my existing system as claimed.",
            "The item was purchased by mistake.",
            "The service was unsatisfactory.",
            "I experienced allergic reactions to the product.",
            "Other reasons."
          ];
          
            refundReasons.forEach((reason) => {
                const option=document.createElement("option");
                option.value=reason;
                option.textContent=reason;

                selectReasonOptions.appendChild(option);
            });



        selectReasonDiv.appendChild(selectReason);
        selectReasonDiv.appendChild(selectReasonOptions);


        const messageDiv=document.createElement("div");
        messageDiv.className="flex flex-col space-y-2 w-full items-start my-3 ";

        const messageHeader=document.createElement("h1");
        messageHeader.className="text-l font-bold";
        messageHeader.textContent="Your message:"
        messageHeader.appendChild(redStar.cloneNode(true));

        const inform=document.createElement("p");
        inform.className="text-xs text-gray-400";
        inform.textContent="Please do not include any sensitive information. Information provided in this field will be shared with the asset provider."
        
        const messageInput=document.createElement("textarea");
        messageInput.required=true;
        messageInput.id="refund-message";
        messageInput.className="textarea bg-custom-gray textarea-bordered w-full h-32";
        messageInput.placeholder="Write your message here..."


        messageDiv.appendChild(messageHeader);
        messageDiv.appendChild(inform);
        messageDiv.appendChild(messageInput);
        

        const submitButton=document.createElement("button");
        submitButton.className='btn btn-primary mt-12 mr-4 hover:bg-custom-red hover:text-white self-end';
        submitButton.textContent="Submit Refund Request";
        submitButton.addEventListener("click",()=>{
            const reason=selectReasonOptions.value;
            const message=messageInput.value;
            const refundRequest={
                purchaseId:purchase.id,
                productId:selectedCartItem.product.id,
                body:message,
                reason:reason,
                cartItem: selectedCartItem,
                user:currnetUser,
                timeStamp:new Date().toISOString()
            }
            const refundRequests=JSON.parse(localStorage.getItem("refundRequests")) || [];
            refundRequests.push(refundRequest);
            localStorage.setItem("refundRequests",JSON.stringify(refundRequests));
            
            closePopUp();

        });


        refundPopUp.appendChild(closeButton);
        refundPopUp.appendChild(title);
        refundPopUp.appendChild(cartItemsDiv);
        refundPopUp.appendChild(detailsDiv);
        refundPopUp.appendChild(selectReasonDiv);
        refundPopUp.appendChild(messageDiv);
        refundPopUp.appendChild(submitButton);
        

    };

    const renderDealCard = (deal) => {
        const cartItems=document.createElement("div");
        cartItems.className="px-8";

        deal.items.forEach((cartItem) => {
            const proudct=cartItem.product;
            const card = document.createElement("div");
            card.className = "grid items-center w-full  " + (smallScreen ? "grid-row-4 grid-cols-2" : "grid-cols-4 h-52");

            const image = document.createElement("img");
            image.src = proudct.images[0];
            image.className = "w-48 object-cover ";

            const details = document.createElement("div");
            details.className = "flex flex-col  col-span-2 py-4 " + (smallScreen ? "space-y-2" : "space-y-5");

            const title = document.createElement("h1");
            title.className = "text-2xl font-bold";
            title.textContent = proudct.title;

            const description = document.createElement("p");
            description.className = "text-m max-w-96";
            description.textContent = proudct.description;


            const soldByDiv = document.createElement("div");
            soldByDiv.className = "flex flex-row space-x-1 items-baseline";

            const soldByText = document.createElement("p");
            soldByText.className = "text-sm";
            soldByText.textContent = "Sold by";

            const soldByValue = document.createElement("p");
            soldByValue.className = "text-m font-bold text-custom-red";
            soldByValue.textContent = `${proudct.seller.firstName} ${proudct.seller.lastName}`;

            soldByDiv.appendChild(soldByText);
            soldByDiv.appendChild(soldByValue);

            details.appendChild(title);
            details.appendChild(description);
            details.appendChild(soldByDiv);

            const quantityPriceDiv = document.createElement("div");
            quantityPriceDiv.className = "flex flex-col   items-end h-40 " + (smallScreen ? "justify-around" : "justify-between");

            const quantity = document.createElement("p");
            quantity.className = "text-xl font-bold";
            quantity.textContent = cartItem.quantity;

            const priceDiv = document.createElement("div");
            priceDiv.className = "flex flex-row space-x-1 items-center";
            
            const priceText = document.createElement("p");
            priceText.className = "text-m";
            priceText.textContent = "Total Price: ";

            const priceValue = document.createElement("p");
            priceValue.className = "text-m font-bold";
            priceValue.textContent = `$${cartItem.quantity * proudct.price}`;


            priceDiv.appendChild(priceText);
            priceDiv.appendChild(priceValue);

            quantityPriceDiv.appendChild(quantity);
            quantityPriceDiv.appendChild(priceDiv);




            card.appendChild(image);
            if(smallScreen){
                card.appendChild(quantityPriceDiv);
                card.appendChild(details);
            }
            else{
                card.appendChild(details);
                card.appendChild(quantityPriceDiv);
            }

            cartItems.appendChild(card);
        });


        return cartItems;
    };

    const renderCard = (purchase) => {
        const card = document.createElement("div");
        card.className = "flex flex-col bg-custom-gray  rounded-lg shadow-md ";

        const datePriceDiv = document.createElement("div");
        datePriceDiv.className = "flex justify-between p-4";

        const date = document.createElement("div");
        const dateText = document.createElement("p");
        dateText.className = "text-sm";
        dateText.textContent = "Order Date:";

        const dateValue = document.createElement("p");
        dateValue.className = "text-m font-bold";
        dateValue.textContent = purchase.timeStamp.split("T")[0];

        date.appendChild(dateText);
        date.appendChild(dateValue);

        const price = document.createElement("div");
        price.className = "flex flex-co space-x-2 items-center";

        const priceText = document.createElement("p");
        priceText.className = "text-sm pt-2";
        priceText.textContent = "Order Total: ";

        const priceValue = document.createElement("p");
        priceValue.className = "text-3xl font-bold";
        priceValue.textContent = `$${purchase.totalPrice}`;

        price.appendChild(priceText);
        price.appendChild(priceValue);
    

        datePriceDiv.appendChild(date);
        datePriceDiv.appendChild(price);

        const grayLineLong=document.createElement("div");
        grayLineLong.className="my-4";
        grayLineLong.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" class="w-full"  height="2" >
        <path d="M2 1H9000" stroke="#7A7A7A" stroke-width="1" stroke-linecap="round" />
        </svg>` ;

        const orderNumRefundDiv = document.createElement("div");
        orderNumRefundDiv.className = "flex justify-between  px-8";

        const orderNum = document.createElement("div");
        orderNum.className = "flex flex-row space-x-1 items-center";

        const orderNumText = document.createElement("p");
        orderNumText.className = "text-m";
        orderNumText.textContent = "ORDER # ";

        const orderNumValue = document.createElement("p");
        orderNumValue.className = "text-m font-bold";
        orderNumValue.textContent = purchase.id || "N/A";

        orderNum.appendChild(orderNumText);
        orderNum.appendChild(orderNumValue);

        const refund = document.createElement("a");
        refund.className = "text-custom-red font-bold underline text-m cursor-pointer hover:text-red-700";
        refund.textContent = "Request Refund";


        refund.addEventListener("click", ()=>{
        renderRefundPopUp(purchase)});

        orderNumRefundDiv.appendChild(orderNum);
        orderNumRefundDiv.appendChild(refund);


        const grayLineShort=document.createElement("div");
        grayLineShort.className="px-8 my-4";
        grayLineShort.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" class="w-full"  height="2" >
        <path d="M2 1H9000" stroke="#7A7A7A" stroke-width="1" stroke-linecap="round" />
        </svg>`;



        card.appendChild(datePriceDiv);
        card.appendChild(grayLineLong);
        card.appendChild(orderNumRefundDiv);
        card.appendChild(grayLineShort);

        purchase.deals.forEach((deal) => {
            card.appendChild(renderDealCard(deal));

            if(purchase.deals.indexOf(deal)!== (purchase.deals.length-1)){
                card.appendChild(grayLineShort.cloneNode(true));
            }

        });

        return card;

    };
  const renderPage = async () => {

    const title = document.querySelector("#order-history-title");
    title.className="text-5xl my-7  flex flex-col space-y-4" ;

    const titleText=document.createElement("h1");
    titleText.className="font-semibold";
    titleText.textContent="Order History";

    const grayLine=document.createElement("div");
    grayLine.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg"  height="2" viewBox="0 0 232 2" fill="none">
    <path d="M1 1H571" stroke="#7A7A7A" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
    grayLine.className="text-custom-gray";

    title.appendChild(titleText);
    title.appendChild(grayLine);

    const cardsDiv = document.querySelector("#card-div");
    cardsDiv.className="flex flex-col space-y-4 my-5";
    let purchaseByUser=purchasedItems.filter((purchase)=>purchase.deals[0].customer.id===currnetUser.id) //todo change to ===
    purchaseByUser= purchaseByUser.sort((a, purchase) =>  a.timeStamp  -purchase.timeStamp );


    purchaseByUser.forEach((purchase) => {
        cardsDiv.appendChild(renderCard(purchase));
    });

  };



  renderPage();
});