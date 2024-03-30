document.addEventListener("DOMContentLoaded", async() => {

  comments = [];
  const getComments = async () => {
      const commentsData = localStorage.getItem('comments');
      if (!commentsData) {
          const response = await fetch('../../data/comments.json');

          if (response.ok) {
              const responseData = await response.json();
              if (Array.isArray(responseData)) {
                  localStorage.setItem('comments', JSON.stringify(responseData));
                  comments = responseData;
                  console.log('comments data:', comments);
              } else {
                  console.error('Invalid products data format:', responseData);
              }
          } else {
              console.error('Failed to fetch products data');
          }
      } else {
        comments = JSON.parse(commentsData);
          console.log('comments data:', comments);
      }
  };
  await getComments(); //


  let products = [];
  const getProducts = async () => {
      const productsData = localStorage.getItem('products');
      if (!productsData) {
          const response = await fetch('../../data/products.json');

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
      }
  };
  await getProducts(); //
  
  let users = [];
  const getUsers = async () => {
    const usersData = localStorage.getItem('user');
    if (!usersData) {
        const response = await fetch('../../data/users.json');
        if (response.ok) {
            const responseData = await response.json();
            if (Array.isArray(responseData)) {
                localStorage.setItem('user', JSON.stringify(responseData));
                users = responseData;
                console.log('Users data:', users);
            } else {
                console.error('Invalid users data format:', responseData);
            }
        } else {
            console.error('Failed to fetch users data');
        }
    } else {
        users = JSON.parse(usersData);
        console.log('Users data:', users);
    }
};
await getUsers(); //

localStorage.removeItem('currentProduct')
    comments.forEach(comment=>{comment.rating=Math.floor(Math.random() * 5) + 1;});
 
comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
const currentUser=JSON.parse(localStorage.getItem("currentUser"));

const getTotalSales = () => {
  console.log('purchases',JSON.parse(localStorage.getItem('purchasedItems')))
  const purchases= JSON.parse(localStorage.getItem('purchasedItems'))||[]
  const userPurchase= purchases.filter(purchase=> purchase.deals.some(deal=>deal.seller.id===currentUser.id));
  const userDeals = [];

  userPurchase.forEach((purchase) => {
  purchase.deals.forEach((deal) => {
  
    if (deal.seller.id === currentUser.id)
    userDeals.push(deal);
  });
})

  console.log('ID',currentUser.id)
  // console.log('deals',deals)
  console.log('deal',userDeals)

  const totalPrice = userDeals.reduce((acc, deal) => {
    return acc + deal.items.reduce((itemAcc, item) => {
      return itemAcc + (item.product.price * item.quantity);
    }, 0);
  }, 0);
  
  return totalPrice;
}


const getTotalCustomers = () => {
  const purchases = JSON.parse(localStorage.getItem('purchasedItems'))||[];
  const customerIds = new Set();

  purchases.forEach((purchase) => {
    purchase.deals.forEach((deal) => {
      if (deal.seller.id === currentUser.id) {
        customerIds.add(deal.customer.id);
      }
    });
  });

  return customerIds.size;
}

console.log(getTotalCustomers())

const deleteDeal = (purchaseId) => {
  console.log('purchases', JSON.parse(localStorage.getItem('purchasedItems')))
  const purchases = JSON.parse(localStorage.getItem('purchasedItems')) || [];
  const purchaseIndex = purchases.findIndex(purchase => purchase.id === purchaseId);
  
  if (purchaseIndex !== -1) {
    console.log('purchaseIndex', purchaseIndex);

    const purchaseToDelete = purchases[purchaseIndex];
    const dealToDeleteIndex = purchaseToDelete.deals.findIndex(deal => deal.seller.id === currentUser.id);
    console.log('dealToDelete', dealToDeleteIndex);


    if (dealToDeleteIndex !== -1) {
      const dealToDelete = purchaseToDelete.deals[dealToDeleteIndex];
      console.log('dealToDelete', dealToDelete);
      const refundRequests=JSON.parse(localStorage.getItem("refundRequests")) || [];
      const refundRequest=refundRequests.find(request=>request.purchaseId===purchaseId);
      console.log('purchaseId', refundRequest.purchaseId);



      const itemIndex = dealToDelete.items.findIndex(item => item.product.id === refundRequest.productId);

      console.log('itemIndex', itemIndex);

      if (itemIndex !== -1) {
        dealToDelete.items.splice(itemIndex, 1);
        if (dealToDelete.items.length === 0) {
          purchaseToDelete.deals.splice(dealToDeleteIndex, 1);
        }
        if (purchaseToDelete.deals.length === 0) {
          purchases.splice(purchaseIndex, 1);
        }

        localStorage.setItem('purchasedItems', JSON.stringify(purchases));
      }
    }
  }
}




  const select = document.getElementById("sellerNav");
  console.log(currentUser.firstName)
    select.setAttribute("name",currentUser.firstName)

    const renderRefundPopup = (refundReuqest) => {
        
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
      };
      closeButton.addEventListener('click', closePopUp);

      const title = document.createElement('h1');
      title.className = 'text-2xl font-bold self-start';
      title.textContent = 'Selected Item:';


      const redStar=document.createElement("span");
      redStar.textContent="*";
      redStar.className="text-custom-red";

      title.appendChild(redStar);


      const cartItemsDiv=document.createElement("div");
      // Adding a max height and vertical overflow auto for vertical scrolling
    cartItemsDiv.className="flex flex-row    px-5 max-w-[42rem] min-h-52";



          const card = document.createElement("div");
          card.className = `
          border-2
          border-custom-gray
          mx-2
          min-w-52 h-52 bg-white 
          flex flex-col space-y-2
          cursor-pointer 
          bg-custom-gray 
          rounded-lg shadow-md 
          justify-center items-center  border-custom-red `;

          
          const image = document.createElement("img");
          image.src = refundReuqest.cartItem.product.images[0];
          image.className = "object-scale-down w-[7rem] h-[7rem]";


          const details = document.createElement("p");
          details.className = "text-sm font-bold text-center";
          details.textContent = `${refundReuqest.cartItem.product.title} x ${refundReuqest.cartItem.quantity}`;



          card.appendChild(image);
          card.appendChild(details);

          cartItemsDiv.appendChild(card);






      const detailsDiv=document.createElement("div");
      detailsDiv.className="flex flex-col space-y-2 w-full items-start my-6 ";

      const orderDate=document.createElement("p");
      orderDate.className="text-sm";
      orderDate.textContent="Order Date:"

      const dateValue = document.createElement("span");
      dateValue.className = "text-sm font-bold";
      dateValue.textContent = refundReuqest.timeStamp.split("T")[0];

      orderDate.appendChild(dateValue);
  
      const quantityPriceDiv = document.createElement("div");
      quantityPriceDiv.className="flex flex-row space-x-2 ";

      const quantity = document.createElement("p");
      quantity.className = "text-sm";
      quantity.textContent = "Quantity: ";

      const quantityValue = document.createElement("span");
      quantityValue.className = "text-sm font-bold";
      quantityValue.textContent = refundReuqest.cartItem.quantity||"N/A";

      quantity.appendChild(quantityValue);

      const price = document.createElement("p");
      price.className = "text-sm";
      price.textContent = "Price: ";

      const priceValue = document.createElement("span");
      priceValue.className = "text-sm font-bold";
      console
      const selectedItemPrice=refundReuqest.cartItem.quantity * refundReuqest.cartItem.product?.price;
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
      selectReason.textContent="Reason for Refund:"
      selectReason.appendChild(redStar.cloneNode(true));

      const selectReasonOptions=document.createElement("select");
      //make selectedReasonOptions static
      selectReasonOptions.disabled=true;
      selectReasonOptions.className="select select-bordered w-full bg-custom-gray text-black";


      const option1=document.createElement("option");
      option1.value=refundReuqest.reason;
      option1.textContent=refundReuqest.reason;
      option1.selected=true;
      

      selectReasonOptions.appendChild(option1);




      selectReasonDiv.appendChild(selectReason);
      selectReasonDiv.appendChild(selectReasonOptions);


      const messageDiv=document.createElement("div");
      messageDiv.className="flex flex-col space-y-2 w-full items-start my-3 ";

      const messageHeader=document.createElement("h1");
      messageHeader.className="text-l font-bold";
      messageHeader.textContent="Refund message:"
      messageHeader.appendChild(redStar.cloneNode(true));

      const inform=document.createElement("p");
      inform.className="text-xs text-gray-400";
      inform.textContent="Please do not include any sensitive information. Information provided in this field will be shared with the asset provider."
      
      const messageInput=document.createElement("textarea");
      messageInput.disabled=true;
      messageInput.className="textarea bg-custom-gray textarea-bordered w-full h-32";
      messageInput.textContent=refundReuqest.body;


      messageDiv.appendChild(messageHeader);
      messageDiv.appendChild(inform);
      messageDiv.appendChild(messageInput);
      
      acceptRejectButtonsDiv=document.createElement("div");
      acceptRejectButtonsDiv.className="flex flex-row space-x-2 w-full justify-end my-3 ";

      const acceptButton=document.createElement("button");
      acceptButton.className='btn btn-primary mt-12 mr-4 hover:bg-green-600 hover:text-white self-end';
      acceptButton.textContent="Accept";
      acceptButton.addEventListener("click",()=>{

        const users=JSON.parse(localStorage.getItem("user"));
        const user=users.find(user=>user.id===refundReuqest.user.id);
        user.balance+=refundReuqest.cartItem.quantity * refundReuqest.cartItem.product.price;
        localStorage.setItem("user",JSON.stringify(users));

        let refundRequests=JSON.parse(localStorage.getItem("refundRequests"));
        // const index=refundRequests.findIndex(request=>request.id===refundReuqest.id);
        // refundRequests=refundRequests.splice(index,1);
        deleteDeal(refundReuqest.purchaseId)

        refundRequests=refundRequests.filter(request=>request.id!==refundReuqest.id);
        localStorage.setItem("refundRequests",JSON.stringify(refundRequests));
        console.log(refundReuqest.purchaseId)

          closePopUp();
          renderRequests();
          rednderTotalSales();
          totalCustomers();
      });

      const rejectButton=document.createElement("button");
      rejectButton.className='btn btn-primary mt-12 hover:bg-red-600 hover:text-white self-end';
      rejectButton.textContent="Reject";
      rejectButton.addEventListener("click",()=>{
        const refundRequests=JSON.parse(localStorage.getItem("refundRequests"));
        const index=refundRequests.findIndex(request=>request.id===refundReuqest.id);
        // refundRequests.splice(index,1);
        localStorage.setItem("refundRequests",JSON.stringify(refundRequests));
        closePopUp();
        renderRequests();
      });

      acceptRejectButtonsDiv.appendChild(rejectButton);
      acceptRejectButtonsDiv.appendChild(acceptButton);


      refundPopUp.appendChild(closeButton);
      refundPopUp.appendChild(title);
      refundPopUp.appendChild(cartItemsDiv);
      refundPopUp.appendChild(detailsDiv);
      refundPopUp.appendChild(selectReasonDiv);
      refundPopUp.appendChild(messageDiv);
      refundPopUp.appendChild(acceptRejectButtonsDiv);
      

  };

  const renderComment = (comment) => {

    const commentDiv = document.createElement("div");
    commentDiv.classList.add(
      "flex",
      "pb-8",
      "border-b-2",
      "border-gray-300",
      "mt-4",
      "h-52",
      
    );

    const imgDiv = document.createElement("div");
    const commentImg = document.createElement("img");
    commentImg.src = "../../media/grey-cart.svg";

    imgDiv.appendChild(commentImg);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("mt-4", "ms-3");

    const name = document.createElement("h3");
    name.classList.add("text-xl", "font-bold","no-wrap");
    name.textContent = comment.user.firstName + " " + comment.user.lastName;

    const product = document.createElement("p");
    product.classList.add("text-sm");
    product.textContent = products.find((product) => product.id===comment.productId).title;

    const commentP = document.createElement("p");
    commentP.classList.add("mt-3");
    commentP.textContent = comment.body;

    infoDiv.appendChild(name);
    infoDiv.appendChild(product);
    infoDiv.appendChild(commentP);
    
    commentDiv.appendChild(imgDiv);
    commentDiv.appendChild(infoDiv);

    return commentDiv;
  };

  const renderComments = () => {
if(comments.length!==0){
    const commentsDiv = document.querySelector("#latest-comments");
    commentsDiv.replaceChildren();

    let displayComments=[]
    for (let i = 0; i < 3; i++) {
      displayComments.push(comments[i]);
    }

    displayComments.forEach((comment) =>
      commentsDiv.appendChild(renderComment(comment))
    );}else {

      const commentsDiv = document.querySelector("#latest-comments");
      commentsDiv.replaceChildren();
      commentsDiv.className='h-[46.375rem]  flex flex-col justify-center items-center'
      const noComments= document.createElement("p");
      noComments.className="text-2xl font-bold text-center  text-gray-500  ";
      noComments.innerHTML="No requests at the Moment"

      const noCommentsIcon= document.createElement("i");
      noCommentsIcon.className="fa-solid fa-check text-5xl text-gray-500"
     
      commentsDiv.appendChild(noComments);
      commentsDiv.appendChild(noCommentsIcon);
    }
      
    
  };

  const rednderTotalSales = () => {
    const totalSalesDiv = document.querySelector("#total-sales-div");
    // totalSalesDiv.replaceChildren();

    const totalSales = document.createElement("h3");
    totalSales.replaceChildren
    totalSales.classList.add("text-5xl", "font-bold", "ms-3");
    totalSales.textContent =  '$'+ getTotalSales() ;

    totalSalesDiv.appendChild(totalSales);

    
  };

  const totalCustomers=() =>{
  

    // const purchases= JSON.parse(localStorage.getItem('purchases')).find(purchase=>purchase.sellerId===currentUser.id);
    const totalCustomersDiv = document.querySelector("#total-customers-div");
    // totalCustomersDiv.replaceChildren();
    const totalCustomers=document.createElement("h3");
    totalCustomers.replaceChildren

    totalCustomers.classList.add("text-5xl", "font-bold", "ms-3");
    totalCustomers.textContent=getTotalCustomers();

    totalCustomersDiv.appendChild(totalCustomers);

  }
  
  const renderRequest = (refundRequest) => {
    console.log(refundRequest)

    const requestDiv = document.createElement("div");
    requestDiv.classList.add(
      "grid",
      "grid-cols-4",
      "gap-2",
      "pb-4",
      "border-b-2",
      "border-gray-300",
      "mt-4",
      "h-52"
    );

    const imgDiv = document.createElement("div");
    imgDiv.className='col-span-1'
    const commentImg = document.createElement("img");
    commentImg.src = "../../media/grey-cart.svg";
    // commentImg.className="w-96"
 

    imgDiv.appendChild(commentImg);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("mt-4", "ms-3");

    const name = document.createElement("h3");
    name.classList.add("text-xl", "font-semibold");
    name.textContent = refundRequest.user.firstName + " " + refundRequest.user.lastName;

    const product = document.createElement("p");
    product.classList.add("text-sm");
    product.textContent = products.find((product) => product.id===refundRequest.productId).title;

    const commentP = document.createElement("p");
    commentP.classList.add("mt-3");
    commentP.textContent = refundRequest.body;

    const moreDetails = document.createElement("button");
    moreDetails.className = "text-bs font-semibold text-black-500 bg-white py-2 px-10 rounded-xl hover:text-white  hover:bg-custom-red mt-5 text-nowrap ";
    moreDetails.textContent = 'More Details';
    moreDetails.addEventListener('click', ()=>{renderRefundPopup(refundRequest)});



    infoDiv.appendChild(name);
    infoDiv.appendChild(product);
    infoDiv.appendChild(commentP);
    infoDiv.appendChild(moreDetails);
    infoDiv.className='col-span-3'
    requestDiv.appendChild(imgDiv);
    requestDiv.appendChild(infoDiv);

    return requestDiv;
  };

  const renderRequests = () => {
    const refundRequests=JSON.parse(localStorage.getItem("refundRequests")) || [];

if(refundRequests.length!==0){
    const commentsDiv = document.querySelector("#refund-requests");
    commentsDiv.replaceChildren();


    let displayRequests=[]
    for (let i = 0; i < 3; i++) {
      if(refundRequests[i]){
        displayRequests.push(refundRequests[i]);
      }
    }

    displayRequests.forEach((refundRequest) =>
      commentsDiv.appendChild(renderRequest(refundRequest))
    );}else {

      const commentsDiv = document.querySelector("#refund-requests");
      commentsDiv.replaceChildren();
      commentsDiv.className='h-[46.375rem]  flex flex-col justify-center items-center'
      const noRequests= document.createElement("p");
      noRequests.className="text-2xl font-bold text-center  text-gray-500  ";
      noRequests.innerHTML="No requests at the Moment"

      const noRequestsIcon= document.createElement("i");
      noRequestsIcon.className="fa-solid fa-check text-5xl text-gray-500"
     
      commentsDiv.appendChild(noRequests);
      commentsDiv.appendChild(noRequestsIcon);
    }
  };




  const ctx = document.getElementById('barchart').getContext('2d');  
  const barchart= new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of sales',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      backgroundColor: '#F20E0F',
      borderRadius: 10
    },
    
  });



  




  renderComments();
  rednderTotalSales();
  renderRequests();
  totalCustomers();
});
