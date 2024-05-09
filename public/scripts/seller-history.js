
document.addEventListener("DOMContentLoaded", async () => {

    const smallScreen=window.innerWidth < 600;
    
    const purchasedItems = JSON.parse(localStorage.getItem("purchasedItems")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

    const body=document.querySelector("body")
    body.className="px-7"

    const renderDealCard = (deal) => {
        const cartItems=document.createElement("div");
        cartItems.className="px-8";

        deal.items.forEach((cartItem) => {
            const proudct=cartItem.product;
            const card = document.createElement("div");
            card.className = "grid items-center w-full  -sm:grid-row-4 -sm:grid-cols-2 grid-cols-4 ";

            const image = document.createElement("img");
            image.src = proudct.images[0];
            image.className = "w-48 object-cover ";

            const details = document.createElement("div");
            details.className = "flex flex-col  col-span-2 py-4 -sm:space-y-2 -sm:order-last space-y-5";

            const title = document.createElement("h1");
            title.className = "text-2xl font-bold";
            title.textContent = proudct.title;

            const description = document.createElement("p");
            description.className = "text-m max-w-96";
            description.textContent = proudct.description;



            details.appendChild(title);
            details.appendChild(description);

            const quantityPriceDiv = document.createElement("div");
            quantityPriceDiv.className = "flex flex-col justify-between items-end h-40 -sm:justify-around -sm:order-2";

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

                card.appendChild(details);
                card.appendChild(quantityPriceDiv);
            

            cartItems.appendChild(card);
        });


        return cartItems;
    };

    const renderCard = (purchase) => {
        const customer=purchase.deals[0].customer
        const card = document.createElement("div");
        card.className = "flex flex-col bg-custom-gray  rounded-lg shadow-md pb-4";

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
        const totalPrice=
        purchase.deals.reduce((total, deal) => {
          if (deal.seller.id === currentUser.id) { 
            return total + deal.items.reduce((dealTotal, cartItem) => 
            
              dealTotal + (cartItem.quantity * cartItem.product.price), 0);
          }
          return total;
        }, 0);
        priceValue.textContent = `$${totalPrice}`;

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

        
        const soldByDiv = document.createElement("div");
        soldByDiv.className = "flex flex-row space-x-1 items-baseline";

        const soldByText = document.createElement("p");
        soldByText.className = "text-sm";
        soldByText.textContent = "Bought by";

        const soldByValue = document.createElement("p");
        soldByValue.className = "text-m font-bold text-custom-red";
        soldByValue.textContent = `${customer.firstName} ${customer.lastName}`;

        soldByDiv.appendChild(soldByText);
        soldByDiv.appendChild(soldByValue);


        orderNumRefundDiv.appendChild(orderNum);
        orderNumRefundDiv.appendChild(soldByDiv);
        

        const grayLineShort=document.createElement("div");
        grayLineShort.className="px-8 my-4";
        grayLineShort.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" class="w-full"  height="2" >
        <path d="M2 1H9000" stroke="#7A7A7A" stroke-width="1" stroke-linecap="round" />
        </svg>`;



        card.appendChild(datePriceDiv);
        card.appendChild(grayLineLong);
        card.appendChild(orderNumRefundDiv);
        card.appendChild(grayLineShort);

        let purchaseSeller=purchase.deals
        purchaseSeller=purchaseSeller.find((deal)=>deal.seller.id===currentUser.id) 
            if(purchaseSeller){
            card.appendChild(renderDealCard(purchaseSeller));}


        return card;

    };
  const renderSaleHistory = async () => {

    const title = document.querySelector("#sale-history-title");
    title.className="text-5xl my-7  flex flex-col space-y-4" ;

    const titleText=document.createElement("h1");
    titleText.className="font-semibold";
    titleText.textContent="Sale History";

    const grayLine=document.createElement("div");
    grayLine.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg"  height="2" viewBox="0 0 232 2" fill="none">
    <path d="M1 1H571" stroke="#7A7A7A" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
    grayLine.className="text-custom-gray";

    title.appendChild(titleText);
    title.appendChild(grayLine);

    const cardsDiv = document.querySelector("#card-div");
    cardsDiv.className="flex flex-col space-y-4 my-5 ";
    
    const sellerPurchasedItems=purchasedItems.filter((purchase)=>purchase.deals[0].seller.id===currentUser.id)
    if(sellerPurchasedItems.length===0){
        const noItems=document.createElement("h1");
        noItems.className="text-5xl font-semibold text-center opacity-25";
        noItems.textContent="No Sale History";
        cardsDiv.appendChild(noItems);
    }

    sellerPurchasedItems.forEach((purchase) => {
        cardsDiv.appendChild(renderCard(purchase));
    
    });


  };





  renderSaleHistory();
});