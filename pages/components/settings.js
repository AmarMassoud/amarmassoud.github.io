import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
class Setting extends LitElement {
   static properties = {
    type: {},
   };



    static styles = css`
    




    `;






    render() {
        return html
        
        `
        <div> ${this.type}</div>
        
        
        
        
        
        
        
        
        
        `;
    }
}


customElements.define('settings-page', Setting);

const tag = document.createElement('settings-page');