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
      transition: background 0.1s;
    }
    
    :host([aberta]) button {
      background: var(--cor-celula-aberta, #1a2029);
      cursor: default;
    }

    :host([bandeira]) button {
      background: var(--cor-bandeira, #f5a623);
      color: #000;
    }

    :host([mina]) button {
      background: var(--cor-mina, #e5484d);
      color: #fff;
    }

    :host([valor="1"]) button { color: #4fc3f7; }
    :host([valor="2"]) button { color: #81c784; }
    :host([valor="3"]) button { color: #e57373; }
    :host([valor="4"]) button { color: #7986cb; }
    :host([valor="5"]) button { color: #ff8a65; }
    :host([valor="6"]) button { color: #4dd0e1; }
    :host([valor="7"]) button { color: #f06292; }
    :host([valor="8"]) button { color: #90a4ae; }


    
  </style>

  <button type="button" part="botao-celula"></button>
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
      
      if (this.hasAttribute('aberta')) return;

      this.dispatchEvent(new CustomEvent('click-celula', {
        bubbles: true,   // o evento "sobe" pela árvore do DOM
        composed: true,  // o evento atravessa a fronteira do Shadow DOM
      }));
    });
  }
  static get observedAttributes() {
    return ['aberta', 'valor', 'bandeira', 'mina'];
  }

  attributeChangedCallback(nome, antigo, novo) {
    if (nome === 'aberta') {
      this._button.textContent = '';
    }

    if (nome === 'valor' && novo) {
      this._button.textContent = novo;
    }

    if(nome === 'mina') {
      this._button.textContent = ' O '
    }

    if(nome === 'bandeira') {
      this._button.textContent = novo !== null ? ' X ' : '';
    }
  }

}

customElements.define('campominado-celula', CampoMinadoCelula);