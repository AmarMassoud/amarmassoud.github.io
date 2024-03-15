import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


class Footer1 extends LitElement {
    static styles = css`

    h1 {
        color: #000;
        font-family: Inter;
        font-size: 3rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        width: 23.08006rem;
        height: 9.86813rem;
        margin-right: 1rem;
      }
      h2 {
        flex-shrink: 0;
        color: #101010;
        font-family: Inter;
        font-size: 1.2rem;
        font-style: normal;
        font-weight: 700;
        min-width: fit-content;
        line-height: 1.8rem;
        text-wrap: nowrap;

      }            
  
      a {
        text-decoration: none;
        flex-shrink: 0;
        color: #7a7a7a;
        font-family: Poppins;
        font-size: 1.1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.8rem;
        min-width: fit-content;
                text-wrap: nowrap;

      }
  
      div {
        margin-top: 4rem;
        margin-bottom: 3rem;
        border-top: .05rem solid #888;
        margin-inline: 1rem;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-around;
        #links {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          width: 50%;
        
  
        .column {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100px;
          margin-right: 1rem;
        }
      }
      }
    
  `;


  render() {
    return html`
    <div>
    <h1>Discover MarketHub</h1>
    <section id="links">
      <section class="column">
        <h2>Connect with us</h2>
        <a href="#">Facebook</a>
        <a href="#">Twitter</a>
        <a href="#">Instagram</a>
      </section>

      <section class="column" >
        <h2>About</h2>
        <a href="#">Help</a>
        <a href="#">FAQ</a>
        <a href="#">Objectives</a>

      </section>

      <section class="column">
        <h2>Info</h2>
        <a href="#">Contact us</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </section>
    </section>
  </div>

    `;
  }
}

customElements.define('web-footer', Footer1);

const tag = document.createElement('web-footer');