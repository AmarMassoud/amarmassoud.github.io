export default function SalesSummary() {
  const getTotalSales = () => {
    if (typeof window !== "undefined") {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      console.log(
        "purchases",
        JSON.parse(localStorage.getItem("purchasedItems"))
      );
      const purchases =
        JSON.parse(localStorage.getItem("purchasedItems")) || [];
      const userPurchase = purchases.filter((purchase) =>
        purchase.deals.some((deal) => deal.seller.id === currentUser.id)
      );
      const userDeals = [];

      userPurchase.forEach((purchase) => {
        purchase.deals.forEach((deal) => {
          if (deal.seller.id === currentUser.id) userDeals.push(deal);
        });
      });

      console.log("ID", currentUser.id);
      // console.log('deals',deals)
      console.log("deal", userDeals);

      const totalPrice = userDeals.reduce((acc, deal) => {
        return (
          acc +
          deal.items.reduce((itemAcc, item) => {
            return itemAcc + item.product.price * item.quantity;
          }, 0)
        );
      }, 0);

      return totalPrice;
    }
    return 0;
  };
  const getTotalCustomers = () => {
    if (typeof window !== "undefined") {
      const purchases =
        JSON.parse(localStorage.getItem("purchasedItems")) || [];
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
    return 0;
  };

  return (
    <section
      id="sales-summary"
      class="bg-custom-gray rounded-3xl flex items-center justify-around flex-col p-4 px-8"
    >
      <h2 class="text-2xl font-bold text-left w-full ps-4" id="sales-summaryid">
        <a href="/seller-dashboard"> Sales Summary</a>
      </h2>
      <div class="bg-white w-full rounded-3xl h-44 p-2 grid grid-cols-2 gap-4">
        <div class="flex p-4 h-full gap-4">
          <div>
            <img src="../../media/sales.svg" alt="" class="me-4" />
          </div>
          <div
            class="flex flex-col text-left justify-around"
            id="total-sales-div"
          >
            <p class="font-bold text-bs">Total Sales</p>
            <h3 class="text-5xl font-bold ms-3">{getTotalSales()}</h3>
          </div>
        </div>
        <div class="flex p-4 h-full bg-custom-gray rounded-3xl">
          <div>
            <img
              src="../../media/grey-cart.svg"
              alt=""
              class="me-4 -sm:scale-75"
            />
          </div>
          <div
            class="flex flex-col text-left justify-around"
            id="total-customers-div"
          >
            <p class="font-bold text-bs">Total Customers</p>
            <h3 class="text-5xl font-bold ms-3">{getTotalCustomers()}</h3>
          </div>
        </div>
      </div>
    </section>
  );

  // const renderComments = () => {
  //     if (comments.length !== 0) {
  //       const commentsDiv = document.querySelector("#latest-comments");
  //       commentsDiv.replaceChildren();

  //       let displayComments = [];
  //       for (let i = 0; i < 3; i++) {
  //         displayComments.push(comments[i]);
  //       }

  //       displayComments.forEach((comment) =>
  //         commentsDiv.appendChild(renderComment(comment))
  //       );
  //     } else {
  //       const commentsDiv = document.querySelector("#latest-comments");
  //       commentsDiv.replaceChildren();
  //       commentsDiv.className =
  //         "h-[46.375rem]  flex flex-col justify-center items-center";
  //       const noComments = document.createElement("p");
  //       noComments.className = "text-2xl font-bold text-center  text-gray-500  ";
  //       noComments.innerHTML = "No requests at the Moment";

  //       const noCommentsIcon = document.createElement("i");
  //       noCommentsIcon.className = "fa-solid fa-check text-5xl text-gray-500";

  //       commentsDiv.appendChild(noComments);
  //       commentsDiv.appendChild(noCommentsIcon);
  //     }
  //   };
}
