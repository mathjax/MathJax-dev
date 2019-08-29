class CustomElement extends HTMLElement {
  constructor() {
    super();

    this.template = document.createElement('template');
    this.template.innerHTML = `
      <style>
        :host {
          color: tomato;
	}
      </style>
      <p>MathML inside of a custom element: <math><mfrac><mn>10</mn><mrow><mn>12</mn></mrow></mfrac></math></p>
    `;

    this.attachShadow({mode: "open"}).appendChild(this.template.content.cloneNode(true));
  }

  connectedCallback() {
    MathJax.typesetShadow(this.shadowRoot);
  }
}

customElements.define('custom-element', CustomElement);
