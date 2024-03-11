import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class SellerNav extends LitElement {
    static properties = {
        name: {},
      };
    static styles = css`
 
   
    .seller-navbar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 8px;
        margin: 8px;
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
        background-color: #0094FF
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
  <a href="/"><img src="/media/logo.svg" alt="Logo" width="150" height="50"></a>
  <div id="nav-buttons">
      <a href="/seller">Dashboard</a>
      <a href="/seller#products">Products</a>
      <a href="/seller/add-item">Add Item</a>
  </div>
  <div id="nav-end">
  <a href="/"><img src="/media/Mail.svg" alt="notificaiton logo" width="25" height="25"></a>
  
  <a href="/" >
  <div id="profile-icon">
  <h3>${this.name.charAt(0)}</h3>
   <div></a>
   </div>
  </div>

    `;
  }
  
}

customElements.define('seller-nav', SellerNav);

const tag = document.createElement('seller-nav');
// tag.name = 'dynamically created';
// document.body.appendChild(tag);
