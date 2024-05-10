import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

let currentUserId = localStorage.getItem("currentUser");
let isLoggedIn = currentUserId != null && currentUserId !== "-1";
let currentUser={firstName: "Guest"}
if (isLoggedIn) {
    const response = await fetch(`/api/users/${currentUserId}`).then(res => res.json()).then(data => currentUser = data);
}
class AdminNav extends LitElement {
    static properties = {
        name: {},
      };
    static styles = css`
 
   
    .admin-navbar {
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
        justify-content: center;
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
  <div  class="admin-navbar">
  <a href="/index.html"><img src="../../../media/logo.svg" alt="Logo" width="150" height="50"></a>
  <div id="nav-buttons">
      <a href="../admin.html">Home</a>
  </div>
  <div id="nav-end">
  

  
  <a href="../profile.html" >
  <div id="profile-icon">
  <h3>${currentUser.firstName.charAt(0).toUpperCase()}</h3>
   <div></a>
   </div>
  </div>

    `;
  }
  
}

customElements.define('admin-nav', AdminNav);

const tag = document.createElement('admin-nav');
// tag.name = 'dynamically created';
// document.body.appendChild(tag);
