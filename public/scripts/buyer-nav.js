import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

let currentUserId = JSON.parse(localStorage.getItem("currentUser"));

const getUser = await fetch(`/api/user/${currentUserId}`, {
    method: "GET",
    mode: 'no-cors',
});

const currentUser = await getUser.json();
let isLoggedin = currentUser===null || currentUser.id===-1?false:true;
if(!isLoggedin){
    currentUserId=-1;
}
class BuyerNav extends LitElement {
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
  <a href="/"><img src="../../../media/logo.svg" alt="Logo" id="logo"></a>
  <div id="nav-buttons">
      <a href="/">Home</a>
      <a id="products" href="../searched-products.html">Products</a>
      <a href="../cart-checkout.html">Cart</a>
  </div>
  <div id="nav-end">
  

  
  ${(currentUser.firstName.charAt(0) == "G")?html`
  <a href="../login.html">=
  <div id="profile-icon">
  <h3>${currentUser.firstName.charAt(0).toUpperCase()}</h3>
   <div></a>
   </div>
  </div>`:
  html` <a href="../profile.html" >
    <div id="profile-icon">
    <h3>${currentUser.firstName.charAt(0).toUpperCase()}</h3>
     <div></a>
     </div>
    </div>`}
    `;
  }
  
}

customElements.define('buyer-nav', BuyerNav);

const tag = document.createElement('buyer-nav');
// tag.name = 'dynamically created';
// document.body.appendChild(tag);
