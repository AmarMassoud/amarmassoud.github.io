import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class NameTag extends LitElement {
  static properties = {
    name: {},
  };

  render() {
    return html`Hello I'm ${this.name}.`;
  }
}

customElements.define('name-tag', NameTag);

const tag = document.createElement('name-tag');
tag.name = 'dynamically created';
document.body.appendChild(tag);
