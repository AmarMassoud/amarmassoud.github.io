import { useState, useEffect, useRef } from "react";


export default function SalesSummary({currentUserID}) {


  const [totalSales, setTotalSales] = useState(0);
  const [stale, setStale] = useState(true);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [productsCount, setProductsCount] = useState(0);

  const [commentCount, setCommentCount] = useState(0);

  const [dealsCount, setDealsCount] = useState(0);

  const [possibleRevenue, setPossibleRevenue] = useState(0);



  useEffect(() => {
    if (stale) {
      fetch(`/api/stats/seller-possible-revenue/${currentUserID}`)
          .then((res) => res.json())
          .then((data) => {

            setPossibleRevenue(data);
            // console.log(data);
          })
          .catch(() => {})
          .finally(() => {});
      setStale(false);
    }
    return () => {};
  }, [stale]);
  useEffect(() => {
    if (stale) {
      fetch(`/api/stats/seller-comments/${currentUserID}`)
          .then((res) => res.json())
          .then((data) => {

            setCommentCount(data);
            // console.log(data);
          })
          .catch(() => {})
          .finally(() => {});
      setStale(false);
    }

    return () => {};
  }, [stale]);
  useEffect(() => {
    if (stale) {
      fetch(`/api/stats/seller-deals/${currentUserID}`)
          .then((res) => res.json())
          .then((data) => {

            setDealsCount(data);
            // console.log(data);
          })
          .catch(() => {})
          .finally(() => {});
      setStale(false);
    }

    return () => {};
  }, [stale]);

  useEffect(() => {
    if (stale) {
      fetch(`/api/stats/seller-products/${currentUserID}`)
          .then((res) => res.json())
          .then((data) => {

            setProductsCount(data);
            // console.log(data);
          })
          .catch(() => {})
          .finally(() => {});
      setStale(false);
    }

    return () => {};
  }, [stale]);

  useEffect(() => {
    if (stale) {
      fetch(`/api/stats/seller-sales/${currentUserID}`)
          .then((res) => res.json())
          .then((data) => {
            if (data != null) {
            setTotalSales(data);
            }else {
                setTotalSales(0);
            }

            // console.log(data);
          })
          .catch(() => {})
          .finally(() => {});
      setStale(false);
    }
    return () => {};
  }, [stale]);


  useEffect(() => {
    if (stale) {
      fetch(`/api/stats/seller-customers/${currentUserID}`)
          .then((res) => res.json())
          .then((data) => {
            setTotalCustomers(data);
            // console.log(data);
          })
          .catch(() => {})
          .finally(() => {});
      setStale(false);
    }

    return () => {};
  }, [stale]);



  return (
      <section
          id="sales-summary"
          class="bg-custom-gray rounded-3xl flex items-center justify-around flex-col p-4 px-8"
      >
        <h2 class="text-2xl font-bold text-left w-full ps-4" id="sales-summaryid">
          <a href="/seller-dashboard"> Sales Summary</a>
        </h2>
        <div className="bg-white w-full rounded-3xl h-44 p-2 grid grid-cols-2 gap-4">
          <div className="flex p-4 h-full gap-4">
            <div>
              <img src="../../media/sales.svg" alt="" className="me-4"/>
            </div>
            <div
                className="flex flex-col text-left justify-around"
                id="total-sales-div"
            >
              <p className="font-bold text-bs">Total Sales</p>
              <h3 className="text-5xl font-bold ms-3">{
                  "$" + totalSales? totalSales : 0
              }</h3>
            </div>
          </div>
          <div className="flex p-4 h-full bg-custom-gray rounded-3xl">
            <div>
              <img
                  src="../../media/grey-cart.svg"
                  alt=""
                  className="me-4 -sm:scale-75"
              />
            </div>
            <div
                className="flex flex-col text-left justify-around"
                id="total-customers-div"
            >
              <p className="font-bold text-bs">Total Customers</p>
              <h3 className="text-5xl font-bold ms-3">{
                totalCustomers
              }</h3>
            </div>

          </div>

        </div>
        <div className="bg-white w-full rounded-3xl h-44 p-2 grid grid-cols-2 gap-4 my-4">
          <div className="flex p-4 h-full gap-4">
            <div>
              <img src="../../media/sales.svg" alt="" className="me-4"/>
            </div>
            <div
                className="flex flex-col text-left justify-around"
                id="total-sales-div"
            >
              <p className="font-bold text-bs">Total Products</p>
              <h3 className="text-5xl font-bold ms-3">{
                   + productsCount
              }</h3>
            </div>
          </div>
          <div className="flex p-4 h-full bg-custom-gray rounded-3xl">
            <div>
              <img
                  src="../../media/grey-cart.svg"
                  alt=""
                  className="me-4 -sm:scale-75"
              />
            </div>
            <div
                className="flex flex-col text-left justify-around"
                id="total-customers-div"
            >
              <p className="font-bold text-bs">Total comments</p>
              <h3 className="text-5xl font-bold ms-3">{
                commentCount
              }</h3>
            </div>

          </div>

        </div>
        <div className="bg-white w-full rounded-3xl h-44 p-2 grid grid-cols-2 gap-4 my-4">
          <div className="flex p-4 h-full gap-4">
            <div>
              <img src="../../media/sales.svg" alt="" className="me-4"/>
            </div>
            <div
                className="flex flex-col text-left justify-around"
                id="total-sales-div"
            >
              <p className="font-bold text-bs">Total deals</p>
              <h3 className="text-5xl font-bold ms-3">{
                   dealsCount
              }</h3>
            </div>
          </div>
          <div className="flex p-4 h-full bg-custom-gray rounded-3xl">
            <div>
              <img
                  src="../../media/grey-cart.svg"
                  alt=""
                  className="me-4 -sm:scale-75"
              />
            </div>
            <div
                className="flex flex-col text-left justify-around"
                id="total-customers-div"
            >
              <p className="font-bold text-bs">Possible revenue</p>
              <h3 className="text-5xl font-bold ms-3">{
               "$"+ possibleRevenue
              }</h3>
            </div>

          </div>

        </div>


      </section>
  );

  // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //
  // console.log(
  //   "purchases",
  //   JSON.parse(localStorage.getItem("purchasedItems"))
  // );
  // const purchases =
  //   JSON.parse(localStorage.getItem("purchasedItems")) || [];
  // const userPurchase = purchases.filter((purchase) =>
  //   purchase.deals.some((deal) => deal.seller.id === currentUser.id)
  // );
  // const userDeals = [];
  //
  // userPurchase.forEach((purchase) => {
  //   purchase.deals.forEach((deal) => {
  //     if (deal.seller.id === currentUser.id) userDeals.push(deal);
  //   });
  // });
  //
  // console.log("ID", currentUser.id);
  // // console.log('deals',deals)
  // console.log("deal", userDeals);
  //
  // const totalPrice = userDeals.reduce((acc, deal) => {
  //   return (
  //     acc +
  //     deal.items.reduce((itemAcc, item) => {
  //       return itemAcc + item.product.price * item.quantity;
  //     }, 0)
  //   );
  // }, 0);
  //
  // return totalPrice;

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
