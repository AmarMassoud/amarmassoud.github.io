import React from "react";

export default function SellerNav({ name }) {
  return (
      // <div className="flex justify-between p-2 m-2 items-center border-b-2">
      //   <a href="../seller-dashboard.html">
      //     <img src="../../media/logo.svg" alt="Logo" id="logo" />
      //   </a>
      //   <div id="nav-buttons " className="flex w-1/2 justify-between">
      //     <a href="../seller-dashboard.html" className="hover:bg-custom-red">
      //       Dashboard
      //     </a>
      //     <a href="../sellerProducts.html">Products</a>
      //     <a href="../addProduct.html" id="add">
      //       Add Item
      //     </a>
      //   </div>
      //   <div id="nav-end">
      //     <a id="add" href="../profile.html">
      //       <div id="profile-icon">
      //         <h3>{name.charAt(0).toUpperCase()}</h3>
      //       </div>
      //     </a>
      //   </div>
      // </div>
      <div className="flex justify-between p-2 m-2 items-center border-b-2">
          <a href="/seller-dashboard">
              <img src="../../media/logo.svg" alt="Logo" id="logo" className="max-w-xs max-h-12"/>
          </a>
          <div id="nav-buttons" className="flex w-1/2 justify-between">
              <a href="../seller-dashboard.html"
                 className="text-black hover:bg-red-600 hover:text-white hover:py-2 px-2 rounded-md">
                  Dashboard
              </a>
              <a href="../sellerProducts.html" className="text-black hover:bg-red-600 hover:text-white px-2 rounded-md">Products</a>
              <a href="../addProduct.html" id="add" className="text-black hover:bg-red-600 hover:text-white px-2 rounded-md">
                  Add Item
              </a>
          </div>
          <div id="nav-end" className="flex items-center">
              <a id="add" href="../profile.html" className="flex items-center justify-center">
                  <div id="profile-icon"
                       className="flex justify-center items-center w-10 h-10 p-2 rounded-full bg-red-600">
                      <h3 className="text-center text-lg text-white">{name? name.charAt(0).toUpperCase() :"" }</h3>
                  </div>
              </a>
          </div>
      </div>
  );
}

// @media screen and (max-width: 1280px) {
//     :root{
//       font-size: 12px;
//     }
//   }
//   @media screen and (max-width: 768px) {
//     :root{
//       font-size: 10px;
//     }
// }
//     #logo {
//         max-width: 150px;
//         max-height: 50px;
//     }

// .seller-navbar {
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     padding: 8px;
//     margin: 8px, 8px, 0px, 8px;
//     align-items: center;
//     border-bottom: 1px solid #888; /* Add a border at the bottom */
//     font-size: 1.1rem;
//     font-family: "Inter", Times, serif;
//     font-weight: 500;

// }
// #nav-buttons a:hover {
//     // font-size: 1.2rem;
//     font-weight: 600;
//     background: #F20E0F;
//     color: white;
// border-radius: 0.5rem;
// }
// #nav-buttons {
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     width: 50%;
//     max-width: 30em;

// }
// #nav-buttons>a {
//     text-decoration: none;
//     color: black;
//     padding: 8px;
// }
// #profile-icon{
//     margin-left: 1em;

//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: .4em;
//     height: .4em;
//     padding: .9em;
//     border-radius: 50%;
//     background-color: #F20E0F
// }
// h3{
//     text-align: center;
//     font-size: 1em;
//     color: white;
// }
// a{
//     text-decoration: none;
//     color: white;
//     text-wrap: nowrap;
// }
// #nav-end{
//     display: flex;
//     flex-direction: row;
//     align-items: center;
// }
// #nav-end>a{
//     display: flex;
//     flex-direction: Column;
//     align-items: center;
//     justify-content: center;
// }
