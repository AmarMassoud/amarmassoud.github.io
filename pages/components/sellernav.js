import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class SellerNav extends LitElement {
    static styles = css`
    :host {

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 8px;
      margin: 8px;
    }
    #nav-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width:30%;

    }
    #nav-buttons>a {
        text-decoration: none;
        color: black;
        padding: 8px;

    }
  `;


  render() {
    return html`
   <img src="/media/logo.svg" alt="Logo" width="150" height="50">
   <div id="nav-buttons">
       <a href="/seller">Dashboard</a>
       <a href="/seller#products">Products</a>
       <a href="/seller/add-item">Add Item</a>
   </div>
   <div>
   <img src="/media/Mail.svg" alt="notificaiton logo" width="30" height="30">
   </div>

    `;
  }
}

customElements.define('seller-nav', SellerNav);

const tag = document.createElement('seller-nav');
// tag.name = 'dynamically created';
// document.body.appendChild(tag);
