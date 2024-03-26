import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
 
let currnetUser = JSON.parse(localStorage.getItem('currentUser'));
if(currnetUser===null){
    currnetUser={name: "Guest"};
}
class BuyerNav extends LitElement {
    static properties = {
        name: {},
      };
    static styles = css`
 
   
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
        background: #F0F0F0;      
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
  <a href="/pages/buyer/landingPage/landingPage.html"><img src="../../../media/logo.svg" alt="Logo" width="150" height="50"></a>
  <div id="nav-buttons">
      <a href="/pages/buyer/landingPage/landingPage.html">Home Screen</a>
      <a href="/">Categories</a>
      <a href="/pages/buyer/cart/cart-checkout.html">Cart</a>
  </div>
  <div id="nav-end">

  
  <a href="/pages/profile/profile.html" >
  <div id="profile-icon">
  <h3>${currnetUser.name.charAt(0).toUpperCase()}</h3>
   <div></a>
   </div>
  </div>

    `;
  }
  
}

customElements.define('buyer-nav', BuyerNav);

const tag = document.createElement('buyer-nav');
// tag.name = 'dynamically created';
// document.body.appendChild(tag);
