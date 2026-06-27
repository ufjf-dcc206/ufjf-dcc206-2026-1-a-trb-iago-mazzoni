const template = document.createElement('template');
template.innerHTML = `
  <style>
    button {
      width: var(--tamanho-celula, 36px);
      height: var(--tamanho-celula, 36px);
      border: 1px solid var(--cor-fundo, #1f2630);
      border-radius: 4px;
      background: var(--cor-celula, #3a4555);
      color: var(--cor-texto, #eef1f5);
      font-size: 1rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }
  </style>

  <button type="button" part="botao-celula">
    <!-- O conteúdo (número, mina, bandeira) vai aparecer aqui dentro -->
  </button>
`;

export class CampoMinadoCelula extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._button = this.shadowRoot.querySelector('button');
  }


  connectedCallback() {
    this._button.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('click-celula', {
        bubbles: true,   // o evento "sobe" pela árvore do DOM
        composed: true,  // o evento atravessa a fronteira do Shadow DOM
      }));
    });
  }
}

customElements.define('campominado-celula', CampoMinadoCelula);