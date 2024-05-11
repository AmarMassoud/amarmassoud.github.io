import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

let currentUserId = JSON.parse(localStorage.getItem("currentUser"));
let isLoggedIn = currentUserId != null && currentUserId !== "-1";
let currentUser={firstName: "Guest"}
if (isLoggedIn) {
    const response = await fetch(`/api/user/${currentUserId}`).then(res => res.json()).then(data => currentUser = data);
}
class SellerNav extends LitElement {
    static properties = {
        name: {},
      };
      static styles = css`
      @media screen and (max-width: 1280px) {
          :root{
            font-size: 12px;
          }
        }
        @media screen and (max-width: 768px) {
          :root{
            font-size: 10px;
          }
      }
          #logo {
              max-width: 150px;
              max-height: 50px;
          }
     
      .seller-navbar {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 8px;
          margin: 8px, 8px, 0px, 8px;
          align-items: center;
          border-bottom: 1px solid #888; /* Add a border at the bottom */
          font-size: 1.1rem;
          font-family: "Inter", Times, serif;
          font-weight: 500;
  
  
      }
      #nav-buttons a:hover {
          // font-size: 1.2rem;
          font-weight: 600;
          background: #F20E0F;     
          color: white; 
      border-radius: 0.5rem;
      }
      #nav-buttons {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 50%;
          max-width: 30em;
  
  
      }
      #nav-buttons>a {
          text-decoration: none;
          color: black;
          padding: 8px;
      }
      #profile-icon{
          margin-left: 1em;
  
          display: flex;
          justify-content: center;
          align-items: center;
          width: .4em;
          height: .4em;
          padding: .9em;
          border-radius: 50%;
          background-color: #F20E0F
      }
      h3{       
          text-align: center;
          font-size: 1em;
          color: white;
      }
      a{
          text-decoration: none;
          color: white;
          text-wrap: nowrap;
      }
      #nav-end{
          display: flex;
          flex-direction: row;
          align-items: center;
      }
      #nav-end>a{
          display: flex;
          flex-direction: Column;
          align-items: center;
          justify-content: center;
      }
      
     
    `;


  render() {
    return html`
  <div  class="seller-navbar">
  <a href="/seller-dashboard"><img src="../../media/logo.svg" alt="Logo" id="logo"></a>
  <div id="nav-buttons">

      <a href="/seller-dashboard" class="hover:bg-custom-red">Dashboard</a>
      <a href="../sellerProducts.html">Products</a>
      <a href="../addProduct.html" id="add" >Add Item</a>
  </div>
  <div id="nav-end">
  
  <a id="add" href="../profile.html" >
  <div id="profile-icon">
  <h3>${currentUser.firstName.charAt(0).toUpperCase()}</h3>
   <div></a>
   </div>
  </div>

    `;
  }
  
}

// const addBtn= document.querySelector('#add')
// addBtn.addEventListener('click',()=>{

//     if (localStorage.getItem('currentUser')) {
//     localStorage.removeItem('currentUser');
// }
//     console.log('clicked')
// })
customElements.define('seller-nav', SellerNav);

const tag = document.createElement('seller-nav');
// tag.name = 'dynamically created';
// document.body.appendChild(tag);
